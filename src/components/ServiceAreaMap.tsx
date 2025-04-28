
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  
  // This defines the area polygon for the Muskoka service area
  const serviceAreaCoordinates = [
    [-79.3128, 45.3369], // Dwight
    [-80.0358, 45.3479], // Parry Sound
    [-80.2176, 44.5075], // Collingwood
    [-79.6903, 44.3894], // Barrie
    [-79.3713, 45.0623], // Highway 11 intersection with 118
    [-79.3128, 45.3369]  // Back to Dwight to close the polygon
  ];
  
  useEffect(() => {
    if (!mapContainer.current) return;
    
    // Check if we already have a token in localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);
  
  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || map.current) return;
    
    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.5, 44.9], // Center of the service area
      zoom: 7.5,
      attributionControl: true
    });
    
    map.current = newMap;
    
    newMap.on('load', () => {
      // Add service area polygon
      newMap.addSource('service-area', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [serviceAreaCoordinates]
          },
          properties: {}
        }
      });
      
      // Add the fill area
      newMap.addLayer({
        id: 'service-area-fill',
        type: 'fill',
        source: 'service-area',
        layout: {},
        paint: {
          'fill-color': '#33c3f0',
          'fill-opacity': 0.3
        }
      });
      
      // Add the outline
      newMap.addLayer({
        id: 'service-area-outline',
        type: 'line',
        source: 'service-area',
        layout: {},
        paint: {
          'line-color': '#33c3f0',
          'line-width': 3
        }
      });
      
      // Add a marker for the company location in Huntsville
      new mapboxgl.Marker({ color: '#f97316' })
        .setLngLat([-79.2972, 45.3226]) // Huntsville coordinates
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Roll On Painting</h3><p>836 Greer Road, Huntsville</p>'))
        .addTo(newMap);
    });
    
    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Cleanup function
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);
  
  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('token') as string;
    
    if (token) {
      localStorage.setItem('mapbox_token', token);
      setMapboxToken(token);
    }
  };
  
  if (!mapboxToken) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4">Service Area Map Setup</h3>
        <p className="mb-4">To display the service area map, please enter your Mapbox public token:</p>
        <form onSubmit={handleTokenSubmit} className="space-y-4">
          <div>
            <input 
              type="text"
              name="token"
              placeholder="Enter your Mapbox public token"
              className="w-full p-2 border rounded"
              required
            />
            <p className="text-xs mt-1 text-gray-500">
              Get your free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-atomic-turquoise hover:underline">mapbox.com</a>
            </p>
          </div>
          <button type="submit" className="atomic-button-secondary w-full">
            <span className="relative z-10">Set Token</span>
          </button>
        </form>
      </div>
    );
  }
  
  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative">
      <div ref={mapContainer} className="h-[400px] w-full" />
      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-md shadow-md z-10">
        <h3 className="font-bold text-sm">Roll On Painting Service Area</h3>
      </div>
    </div>
  );
};

export default ServiceAreaMap;
