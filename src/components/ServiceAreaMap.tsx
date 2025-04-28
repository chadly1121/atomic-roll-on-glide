
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
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
    if (!mapContainer.current || map.current) return;
    
    // Use the provided Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZGx5MTEyMTExMjEiLCJhIjoiY21hMW5ncGpoMTRydTJyb2s1ZGEzZjNvOSJ9.3dOdlxYDu7hjPshi-JACmw';
    
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
  }, []);
  
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
