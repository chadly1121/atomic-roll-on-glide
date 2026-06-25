import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.hash;
    const params = new URLSearchParams(hash);
    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");
    const errorDescription = params.get("error_description");

    if (errorDescription) {
      setError(decodeURIComponent(errorDescription.replace(/\+/g, " ")));
      return;
    }

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            setError(error.message);
          } else {
            setReady(true);
            // Clean URL
            window.history.replaceState(null, "", "/reset-password");
          }
        });
    } else {
      // Maybe session already set (e.g. from a prior setSession call)
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setReady(true);
        else setError("Invalid or expired password reset link. Please request a new one.");
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    await supabase.auth.signOut();
    toast.success("Password updated. Please sign in with your new password.");
    navigate("/login", { replace: true });
  };

  return (
    <>
      <Helmet>
        <title>Reset Password | Roll-On Painting</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="font-serif text-3xl font-semibold tracking-tight">
              Roll-On Painting
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Set a new password
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Reset password</CardTitle>
              <CardDescription>
                Choose a new password for your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="space-y-4">
                  <p className="text-sm text-destructive">{error}</p>
                  <Button className="w-full" onClick={() => navigate("/login")}>
                    Back to sign in
                  </Button>
                </div>
              ) : !ready ? (
                <p className="text-sm text-muted-foreground">Verifying reset link…</p>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New password</Label>
                    <Input
                      id="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm new password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      autoComplete="new-password"
                      required
                      minLength={8}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting ? "Updating…" : "Update password"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}