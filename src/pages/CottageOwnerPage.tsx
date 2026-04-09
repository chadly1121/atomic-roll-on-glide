import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getCottageOwnerPageBySlug } from '@/data/cottageOwnerPages';
import CottageOwnerPageTemplate from '@/components/location-pages/CottageOwnerPageTemplate';

const CottageOwnerPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!slug) return <Navigate to="/404" replace />;

  const page = getCottageOwnerPageBySlug(slug);
  if (!page) return <Navigate to="/404" replace />;

  return <CottageOwnerPageTemplate page={page} />;
};

export default CottageOwnerPage;
