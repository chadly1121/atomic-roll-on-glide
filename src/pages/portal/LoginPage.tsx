import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function LoginPage() {
  const { signIn, user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSending, setResetSending] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // Redirect if already signed in
  useEffect(() => {
    if (!loading && user && role) {
      navigate(role === "admin" ? "/admin/dashboard" : "/client/dashboard", { replace: true });
    }
  }, [loading, user, role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success("Signed in");
    // Redirect handled by useEffect once role loads
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetSending(true);
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail.trim(), {
      redirectTo: "https://portal.roll-onpainting.com/reset-password",
    });
    setResetSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setResetSent(true);
  };

  return (
    <>
      <Helmet>
        <title>Portal Login | Roll-On Painting</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted to-background p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="font-serif text-3xl font-semibold tracking-tight">
              Roll-On Painting
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Prefinishing Lumber Portal
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Access your prefinishing quotes and orders.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  className="text-sm text-muted-foreground underline hover:text-foreground"
                  onClick={() => { setShowReset((v) => !v); setResetSent(false); }}
                >
                  Forgot your password?
                </button>
              </div>
              {showReset && (
                <div className="mt-4 border-t pt-4">
                  {resetSent ? (
                    <p className="text-sm text-center text-muted-foreground">
                      Password reset email sent. Check your inbox.
                    </p>
                  ) : (
                    <form onSubmit={handleReset} className="space-y-3">
                      <div className="space-y-2">
                        <Label htmlFor="reset-email">Email</Label>
                        <Input
                          id="reset-email"
                          type="email"
                          required
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                        />
                      </div>
                      <Button type="submit" variant="outline" className="w-full" disabled={resetSending}>
                        {resetSending ? "Sending..." : "Send reset email"}
                      </Button>
                    </form>
                  )}
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-6 text-center">
                Need access? Contact{" "}
                <a className="underline" href="mailto:chad@roll-onpainting.com">
                  chad@roll-onpainting.com
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}