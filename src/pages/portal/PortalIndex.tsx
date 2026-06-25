import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function PortalIndex() {
  const { user, role, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={role === "admin" ? "/admin/dashboard" : "/client/dashboard"} replace />;
}