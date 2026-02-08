import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '@/data/servicePages';
import ServicePageTemplate from '@/components/service-pages/ServicePageTemplate';

/**
 * Dynamic Service Page
 * 
 * Renders the appropriate service page based on URL slug.
 * Redirects to 404 if service not found.
 */
const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/404" replace />;
  }
  
  const service = getServiceBySlug(slug);
  
  if (!service) {
    return <Navigate to="/404" replace />;
  }
  
  return <ServicePageTemplate service={service} />;
};

export default ServicePage;
