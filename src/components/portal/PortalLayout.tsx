import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, FileText, Users, Package, LogOut, ClipboardList, Layers, Trees, DollarSign, Hammer, Sparkles, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";

const adminNav = [
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Quotes", url: "/admin/quotes", icon: FileText },
  { title: "Orders", url: "/admin/orders", icon: Package },
  { title: "Clients", url: "/admin/clients", icon: Users },
  { title: "Products", url: "/admin/products", icon: Sparkles },
  { title: "Profiles", url: "/admin/profiles", icon: Layers },
  { title: "Species", url: "/admin/species", icon: Trees },
  { title: "Labour", url: "/admin/labour", icon: Hammer },
  { title: "Shake pricing", url: "/admin/shake-pricing", icon: DollarSign },
];

const clientNav = [
  { title: "Dashboard", url: "/client/dashboard", icon: LayoutDashboard },
  { title: "New Quote", url: "/client/quote/new", icon: ClipboardList },
  { title: "My Quotes", url: "/client/quotes", icon: FileText },
  { title: "My Orders", url: "/client/orders", icon: Package },
  { title: "Profile", url: "/client/profile", icon: User },
];

export default function PortalLayout() {
  const { role, user, signOut } = useAuth();
  const navigate = useNavigate();
  const items = role === "admin" ? adminNav : clientNav;

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-muted/30">
        <Sidebar collapsible="icon">
          <SidebarHeader className="border-b">
            <div className="px-3 py-4">
              <div className="font-serif text-lg font-semibold leading-tight">
                Roll-On Painting
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {role === "admin" ? "Staff Portal" : "Client Portal"}
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Prefinishing Portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) => (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `flex items-center gap-2 ${
                              isActive ? "bg-primary/10 text-primary font-medium" : ""
                            }`
                          }
                        >
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </NavLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t">
            <div className="px-3 py-2 text-xs text-muted-foreground truncate">
              {user?.email}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="justify-start gap-2 mx-2 mb-2"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center gap-3 border-b bg-background px-4">
            <SidebarTrigger />
            <div className="text-sm font-medium">
              {role === "admin" ? "Admin" : "Client"} · Prefinishing Lumber
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}