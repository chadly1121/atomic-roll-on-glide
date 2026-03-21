import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '@/data/servicePages';
import ServicePageTemplate from '@/components/service-pages/ServicePageTemplate';
import { locationPagesBySlug } from '@/data/locationPages';
import LocationPageTemplate from '@/components/location-pages/LocationPageTemplate';

/**
 * Dynamic Service/Location Page
 * 
 * Renders the appropriate service or location page based on URL slug.
 * Checks location pages first, then service pages.
 */
const ServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/404" replace />;
  }

  // Check location pages first
  const location = locationPagesBySlug.get(slug);
  if (location) {
    return <LocationPageTemplate location={location} />;
  }
  
  const service = getServiceBySlug(slug);
  if (!service) {
    return <Navigate to="/404" replace />;
  }
  
  return <ServicePageTemplate service={service} />;
};

export default ServicePage;
