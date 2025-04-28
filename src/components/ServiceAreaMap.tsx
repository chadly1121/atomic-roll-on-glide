import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const circleRadius = 70; // 70km radius
  
  // Port Sydney, Ontario coordinates (836 Greer Road)
  const officeLoc: [number, number] = [-79.2784, 45.1932]; // 836 Greer Road, Port Sydney
  
  // Adjusted center for the service area circle to include Barrie and Collingwood
  const serviceAreaCenter: [number, number] = [-79.7000, 44.5000]; // Adjusted center point to include Barrie and Collingwood
  
  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;
    
    // Use the provided Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZGx5MTEyMTExMjEiLCJhIjoiY21hMW5ncGpoMTRydTJyb2s1ZGEzZjNvOSJ9.3dOdlxYDu7hjPshi-JACmw';
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-79.5000, 44.8000], // Set view center between Port Sydney and Barrie
      zoom: 7.5, // Zoom out a bit to show the entire service area
      attributionControl: true
    });
    
    map.current = newMap;
    
    newMap.on('load', () => {
      // Create a source for the service area circle
      newMap.addSource('service-area', {
        type: 'geojson',
        data: createGeoJSONCircle(serviceAreaCenter, circleRadius)
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
      
      // Create a custom marker element for the office location
      const markerEl = document.createElement('div');
      markerEl.className = 'office-marker';
      markerEl.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="bg-atomic-orange text-white p-2 rounded-full shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></circle>
            </svg>
          </div>
          <div class="bg-white px-2 py-1 rounded-md shadow-md mt-1 text-xs font-bold">
            Roll On Painting
          </div>
        </div>
      `;
      
      // Add the custom marker to the map
      new mapboxgl.Marker({
        element: markerEl,
        anchor: 'bottom',
      })
        .setLngLat(officeLoc)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Roll On Painting</h3><p>836 Greer Road, Port Sydney, Ontario</p>'))
        .addTo(newMap);
        
      // Add Huntsville marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.2972, 45.3226])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Huntsville</p>'))
        .addTo(newMap);
        
      // Add Barrie marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.6903, 44.3894])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Barrie</p>'))
        .addTo(newMap);
      
      // Add Collingwood marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-80.2167, 44.5008])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Collingwood</p>'))
        .addTo(newMap);
    });
    
    // Add navigation controls
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');
  };
  
  // Function to create a GeoJSON circle
  const createGeoJSONCircle = (center: [number, number], radiusInKm: number, points: number = 64): GeoJSON.Feature => {
    const coords = {
      latitude: center[1],
      longitude: center[0]
    };
    
    const km = radiusInKm;
    const ret = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);
      
      ret.push([
        coords.longitude + x,
        coords.latitude + y
      ]);
    }
    ret.push(ret[0]); // Close the circle by repeating the first point

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [ret]
      },
      properties: {}
    };
  };
  
  useEffect(() => {
    initializeMap();
    
    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative">
      <div ref={mapContainer} className="h-[400px] w-full" />
      <div className="absolute top-2 left-2 bg-white px-3 py-2 rounded-md shadow-md z-10 max-w-md">
        <h3 className="font-bold text-sm mb-1">Our Service Area</h3>
        <p className="text-sm">Located in Muskoka we service: Huntsville, Dwight, Lake of Bays, Bracebridge, Port Carling, Parry Sound, Port Severn, Midland, Orillia and Barrie.</p>
      </div>
    </div>
  );
};

export default ServiceAreaMap;
