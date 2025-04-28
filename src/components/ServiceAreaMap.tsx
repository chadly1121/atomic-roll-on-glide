
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  
  // This defines the expanded area polygon for the Muskoka service area
  const serviceAreaCoordinates = [
    [-79.0362, 45.2647], // Dorset
    [-78.8975, 45.5800], // Highway 35 North end
    [-79.0320, 45.3370], // Dwight
    [-80.0358, 45.3479], // Parry Sound
    [-80.2176, 44.5075], // Collingwood
    [-79.6903, 44.3894], // Barrie
    [-79.4227, 44.6062], // Orillia
    [-79.1682, 44.7511], // Highway 35 at Highway 118
    [-79.0362, 45.2647]  // Back to Dorset to close the polygon
  ];
  
  useEffect(() => {
    if (!mapContainer.current || map.current) return;
    
    // Use the provided Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZGx5MTEyMTExMjEiLCJhIjoiY21hMW5ncGpoMTRydTJyb2s1ZGEzZjNvOSJ9.3dOdlxYDu7hjPshi-JACmw';
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.3, 44.9], // Adjusted center for the expanded service area
      zoom: 7.3,             // Slightly zoomed out to show the expanded area
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
      
      // Add key locations as markers
      // Huntsville (Company HQ)
      new mapboxgl.Marker({ color: '#f97316' })
        .setLngLat([-79.2972, 45.3226])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Roll On Painting</h3><p>836 Greer Road, Huntsville</p>'))
        .addTo(newMap);
      
      // Orillia marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.4227, 44.6062])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Orillia</p>'))
        .addTo(newMap);
        
      // Dorset marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.0362, 45.2647])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Dorset</p>'))
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
