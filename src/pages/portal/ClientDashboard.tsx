import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

export default function ClientDashboard() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your prefinishing lumber quotes and orders.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Request a Quote</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground max-w-md">
            Submit your lumber list and our team will price it and respond shortly.
          </p>
          <Button asChild>
            <Link to="/client/quote/new" className="gap-2">
              <ClipboardList className="h-4 w-4" /> New Quote
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Your active prefinishing orders will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}