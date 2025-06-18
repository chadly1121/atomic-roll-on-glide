
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react"; // Importing useEffect from React
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CalendarPage from "./pages/CalendarPage";
import PageBreadcrumbs from "./components/nav/PageBreadcrumbs";

// Import lucide icons to make them available globally
import "@/lib/lucide-icons";

// Create QueryClient with improved error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      // Use meta for onError handler instead of directly passing onError
      meta: {
        onError: (error: Error) => {
          console.error("Query error:", error);
        }
      }
    },
  },
});

// WWW Redirect component with improved functionality
const WwwRedirect = () => {
  useEffect(() => {
    // Only run this on the client side
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      // Check if the hostname starts with www.
      if (hostname.startsWith('www.')) {
        // Create the new URL with the same protocol but without www
        const protocol = window.location.protocol;
        const path = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;
        const nonWwwHostname = hostname.replace('www.', '');
        
        // Construct the full URL
        const nonWwwUrl = `${protocol}//${nonWwwHostname}${path}${search}${hash}`;
        
        // Log the redirect for debugging
        console.log(`Redirecting from ${window.location.href} to ${nonWwwUrl}`);
        
        // Perform the redirect
        window.location.replace(nonWwwUrl);
      }
    }
  }, []);
  
  return null;
};

const App = () => {
  // Add error boundary for the entire app
  try {
    return (
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <WwwRedirect />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                {/* Removed all blog routes */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={
                  <>
                    <PageBreadcrumbs />
                    <NotFound />
                  </>
                } />
              </Routes>
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
