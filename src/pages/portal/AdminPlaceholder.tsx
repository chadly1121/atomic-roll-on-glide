import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPlaceholder({ title }: { title: string }) {
  return (
    <div className="max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This section is coming next. Pricing, quote management, and client
            administration tools will land here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}