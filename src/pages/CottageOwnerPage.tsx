import React, { useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { getCottageOwnerPageBySlug } from '@/data/cottageOwnerPages';
import CottageOwnerPageTemplate from '@/components/location-pages/CottageOwnerPageTemplate';

const CottageOwnerPage: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\//, '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const page = getCottageOwnerPageBySlug(slug);
  if (!page) return <Navigate to="/404" replace />;

  return <CottageOwnerPageTemplate page={page} />;
};

export default CottageOwnerPage;
