import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const schema = z.object({
  project_name: z.string().trim().min(1).max(200),
  contact_name: z.string().trim().min(1).max(120),
  contact_phone: z.string().trim().max(40).optional().or(z.literal("")),
  details: z.string().trim().min(1).max(5000),
});

export default function QuoteRequestPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    project_name: "",
    contact_name: "",
    contact_phone: "",
    details: "",
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.functions.invoke("send-lumber-quote", {
      body: {
        ...parsed.data,
        client_email: user?.email,
      },
    });
    setSubmitting(false);
    if (error) {
      toast.error("Could not submit quote. Please try again.");
      return;
    }
    toast.success("Quote submitted. Check your email for confirmation.");
    navigate("/client/dashboard");
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>New Prefinishing Quote</CardTitle>
          <CardDescription>
            Tell us about the lumber you need prefinished. Pricing logic is being
            built — for now we email your request to Roll-On Painting and they'll
            be in touch shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project_name">Project name *</Label>
              <Input id="project_name" required value={form.project_name} onChange={update("project_name")} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact_name">Contact name *</Label>
                <Input id="contact_name" required value={form.contact_name} onChange={update("contact_name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_phone">Phone</Label>
                <Input id="contact_phone" type="tel" value={form.contact_phone} onChange={update("contact_phone")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="details">Lumber list & details *</Label>
              <Textarea
                id="details"
                required
                rows={10}
                placeholder="Species, board feet, profile, finish, timeline..."
                value={form.details}
                onChange={update("details")}
              />
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Quote"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}