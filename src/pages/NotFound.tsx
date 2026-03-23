import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Roll On Painting</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content="The page you're looking for doesn't exist. Return to Roll On Painting's homepage for professional painting services in Muskoka." />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
          <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
          <a href="/" className="text-primary hover:text-primary/80 underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
