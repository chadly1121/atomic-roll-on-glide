import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type AppRole } from "@/contexts/AuthContext";

interface Props {
  children: React.ReactNode;
  requireRole?: AppRole;
}

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function ProtectedRoute({ children, requireRole }: Props) {
  const { user, role, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireRole && role !== requireRole) {
    // Send to the dashboard they have access to, or login if no role
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (role === "client") return <Navigate to="/client/dashboard" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}