import React, { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PageBreadcrumbs from "./components/nav/PageBreadcrumbs";
import FloatingCallButton from "./components/conversion/FloatingCallButton";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/portal/ProtectedRoute";
import PortalLayout from "@/components/portal/PortalLayout";

// Import lucide icons to make them available globally
import "@/lib/lucide-icons";

// Lazy-load secondary pages for faster initial load
const ServiceAreasPage = lazy(() => import("./pages/ServiceAreasPage"));
const ServicePage = lazy(() => import("./pages/ServicePage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));
const GoNanoPage = lazy(() => import("./pages/GoNanoPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const FreeTouchUpsPage = lazy(() => import("./pages/FreeTouchUpsPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const CareersPage = lazy(() => import("./pages/CareersPage"));
const MediaPage = lazy(() => import("./pages/MediaPage"));
const PrivateClientPage = lazy(() => import("./pages/PrivateClientPage"));
const CottageOwnerPage = lazy(() => import("./pages/CottageOwnerPage"));
const HowWeQuotePage = lazy(() => import("./pages/HowWeQuotePage"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));

// Portal pages
const LoginPage = lazy(() => import("./pages/portal/LoginPage"));
const ResetPasswordPage = lazy(() => import("./pages/portal/ResetPasswordPage"));
const ClientDashboard = lazy(() => import("./pages/portal/ClientDashboard"));
const QuoteRequestPage = lazy(() => import("./pages/portal/QuoteRequestPage"));
const PortalIndex = lazy(() => import("./pages/portal/PortalIndex"));
const AdminPlaceholder = lazy(() => import("./pages/portal/AdminPlaceholder"));
const AdminDashboard = lazy(() => import("./pages/portal/admin/DashboardPage"));
const AdminProducts = lazy(() => import("./pages/portal/admin/ProductsPage"));
const AdminProfiles = lazy(() => import("./pages/portal/admin/ProfilesPage"));
const AdminSpecies = lazy(() => import("./pages/portal/admin/SpeciesPage"));
const AdminLabour = lazy(() => import("./pages/portal/admin/LabourPage"));
const AdminShakePricing = lazy(() => import("./pages/portal/admin/ShakePricingPage"));
const AdminQuotes = lazy(() => import("./pages/portal/admin/QuotesPage"));
const AdminQuoteDetail = lazy(() => import("./pages/portal/admin/QuoteDetailPage"));
const AdminOrders = lazy(() => import("./pages/portal/admin/OrdersPage"));
const AdminOrderDetail = lazy(() => import("./pages/portal/admin/OrderDetailPage"));
const AdminClients = lazy(() => import("./pages/portal/admin/ClientsPage"));

// Create QueryClient with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      meta: {
        onError: (error: Error) => {
          console.error("Query error:", error);
        }
      }
    },
  },
});

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            
            <BrowserRouter>
              <AuthProvider>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />

                  {/* Portal */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />
                  <Route path="/portal" element={<PortalIndex />} />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute requireRole="admin">
                        <PortalLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<PortalIndex />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="quotes" element={<AdminQuotes />} />
                    <Route path="quotes/:id" element={<AdminQuoteDetail />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="orders/:id" element={<AdminOrderDetail />} />
                    <Route path="clients" element={<AdminClients />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="profiles" element={<AdminProfiles />} />
                    <Route path="species" element={<AdminSpecies />} />
                    <Route path="labour" element={<AdminLabour />} />
                    <Route path="shake-pricing" element={<AdminShakePricing />} />
                  </Route>
                  <Route
                    path="/client"
                    element={
                      <ProtectedRoute requireRole="client">
                        <PortalLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<PortalIndex />} />
                    <Route path="dashboard" element={<ClientDashboard />} />
                    <Route path="quote/new" element={<QuoteRequestPage />} />
                    <Route path="orders" element={<AdminPlaceholder title="My Orders" />} />
                  </Route>

                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/service-areas" element={<ServiceAreasPage />} />
                  <Route path="/gonano" element={<GoNanoPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/catalog" element={<Navigate to="/portfolio" replace />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/faq" element={<FAQPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/payment-success" element={<PaymentSuccess />} />
                  <Route path="/free-touch-ups" element={<FreeTouchUpsPage />} />
                  <Route path="/media" element={<MediaPage />} />
                  <Route path="/how-we-quote" element={<HowWeQuotePage />} />
                 <Route path="/services" element={<ServicesPage />} />
                  <Route path="/private-client-muskoka-property-care" element={<PrivateClientPage />} />
                  <Route path="/rosedale-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  <Route path="/oakville-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  <Route path="/post-road-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  <Route path="/forest-hill-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  <Route path="/lawrence-park-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  <Route path="/vaughan-muskoka-cottage-painting" element={<CottageOwnerPage />} />
                  
                  <Route path="/:slug" element={<ServicePage />} />
                  <Route path="*" element={
                    <>
                      <PageBreadcrumbs />
                      <NotFound />
                    </>
                  } />
                </Routes>
              </Suspense>
              </AuthProvider>
              <FloatingCallButton />
            </BrowserRouter>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    );
  } catch (error) {
    console.error("App rendering error:", error);
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Something went wrong</h1>
        <p className="text-gray-700 mb-4">We're sorry, but there was a problem loading the application</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    );
  }
};

export default App;
