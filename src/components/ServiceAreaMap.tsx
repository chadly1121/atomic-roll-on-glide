
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const circleRadius = 100; // 100km radius
  const isMobile = useIsMobile();
  
  // Bracebridge, Ontario coordinates
  const bracebridgeCoordinates: [number, number] = [-79.3090, 45.0370];
  
  const initializeMap = () => {
    if (!mapContainer.current || map.current) return;
    
    // Use the provided Mapbox token
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhZGx5MTEyMTExMjEiLCJhIjoiY21hMW5ncGpoMTRydTJyb2s1ZGEzZjNvOSJ9.3dOdlxYDu7hjPshi-JACmw';
    
    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: bracebridgeCoordinates,
      zoom: 8,
      attributionControl: true
    });
    
    map.current = newMap;
    
    newMap.on('load', () => {
      // Create a source for the service area circle
      newMap.addSource('service-area', {
        type: 'geojson',
        data: createGeoJSONCircle(bracebridgeCoordinates, circleRadius)
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
      
      // Add Bracebridge marker (center point)
      new mapboxgl.Marker({ color: '#f97316' })
        .setLngLat(bracebridgeCoordinates)
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Roll On Painting</h3><p>Bracebridge, Ontario</p>'))
        .addTo(newMap);
      
      // Add Huntsville marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.2972, 45.3226])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Huntsville</p>'))
        .addTo(newMap);
        
      // Add Orillia marker
      new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat([-79.4227, 44.6062])
        .setPopup(new mapboxgl.Popup().setHTML('<p>Orillia</p>'))
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
      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-md shadow-md z-10">
        <h3 className="font-bold text-sm">100km Service Radius</h3>
      </div>
      <div className="absolute bottom-2 right-2 bg-white/80 px-3 py-1 rounded-md text-xs">
        Centered on Bracebridge, Ontario
      </div>
    </div>
  );
};

export default ServiceAreaMap;
