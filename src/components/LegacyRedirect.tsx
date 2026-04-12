import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getLegacyRedirect } from "@/data/legacyRedirects";
import NotFound from "@/pages/NotFound";
import PageBreadcrumbs from "@/components/nav/PageBreadcrumbs";

const LegacyRedirect = () => {
  const location = useLocation();
  const newPath = getLegacyRedirect(location.pathname);

  useEffect(() => {
    if (newPath) {
      window.location.replace(newPath);
    }
  }, [newPath]);

  if (!newPath) {
    return (
      <>
        <PageBreadcrumbs />
        <NotFound />
      </>
    );
  }

  const fullUrl = `https://www.roll-onpainting.com${newPath}`;

  return (
    <>
      <Helmet>
        <meta httpEquiv="refresh" content={`0;url=${newPath}`} />
        <link rel="canonical" href={fullUrl} />
        <meta name="robots" content="noindex, follow" />
        <title>Redirecting… | Roll On Painting</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Redirecting…</p>
      </div>
    </>
  );
};

export default LegacyRedirect;
