import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { locationPagesBySlug } from '@/data/locationPages';
import LocationPageTemplate from '@/components/location-pages/LocationPageTemplate';

const LocationPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) return <Navigate to="/service-areas" replace />;
  
  const location = locationPagesBySlug.get(slug);
  
  if (!location) return null; // Let it fall through to ServicePage or NotFound
  
  return <LocationPageTemplate location={location} />;
};

export default LocationPage;
