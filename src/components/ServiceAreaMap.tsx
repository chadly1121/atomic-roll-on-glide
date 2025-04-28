
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from './ui/drawer';
import { useMediaQuery } from '@/hooks/use-mobile';

const ServiceAreaMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<any>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnArea, setDrawnArea] = useState<any>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  
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
  
  const initializeMap = () => {
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
    
    // Initialize the drawing controls
    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'simple_select'
    });
    
    // Add the draw controls but don't activate them yet
    newMap.addControl(draw.current, 'top-left');
    
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
    
    // Setup drawing-related event listeners
    newMap.on('draw.create', (e) => {
      setDrawnArea(e.features[0]);
      setIsDrawing(false);
      
      // Update the service area on the map
      if (newMap.getSource('service-area')) {
        newMap.getSource('service-area').setData({
          type: 'Feature',
          geometry: e.features[0].geometry,
          properties: {}
        });
      }
      
      console.log('Drawn coordinates:', JSON.stringify(e.features[0].geometry.coordinates));
    });
    
    newMap.on('draw.delete', () => {
      setDrawnArea(null);
      
      // Restore the original service area
      if (newMap.getSource('service-area')) {
        newMap.getSource('service-area').setData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [serviceAreaCoordinates]
          },
          properties: {}
        });
      }
    });
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

  const startDrawing = () => {
    if (!map.current || !draw.current) return;
    
    setIsDrawing(true);
    
    // Clear existing drawings
    draw.current.deleteAll();
    
    // Switch to draw polygon mode
    draw.current.changeMode('draw_polygon');
  };
  
  const cancelDrawing = () => {
    if (!map.current || !draw.current) return;
    
    setIsDrawing(false);
    draw.current.deleteAll();
    draw.current.changeMode('simple_select');
  };

  const getCoordinatesFormatted = () => {
    if (!drawnArea) return 'No custom area drawn';
    
    try {
      return JSON.stringify(drawnArea.geometry.coordinates, null, 2);
    } catch (error) {
      return 'Error formatting coordinates';
    }
  };

  const DrawingInstructions = () => (
    <div className="p-4 space-y-4">
      <h3 className="font-semibold text-lg">Drawing Instructions</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Click on the map to place points of your service area boundary</li>
        <li>Continue clicking to create a complete polygon shape</li>
        <li>To finish the area, click on the first point you placed</li>
        <li>To delete the area and start over, use the trash icon</li>
      </ol>
      <div className="border-t pt-4 mt-4">
        <h4 className="font-medium">Your Drawn Coordinates:</h4>
        <pre className="bg-muted p-2 rounded-md text-xs mt-2 max-h-[200px] overflow-auto">
          {getCoordinatesFormatted()}
        </pre>
      </div>
    </div>
  );

  const DrawingUI = () => {
    const DrawingControls = (
      <div className="space-y-4">
        <DrawingInstructions />
        <div className="flex justify-between">
          <Button variant="outline" onClick={cancelDrawing}>
            Cancel
          </Button>
          <Button onClick={() => setIsDrawing(false)} disabled={!drawnArea}>
            Apply Changes
          </Button>
        </div>
      </div>
    );

    if (isMobile) {
      return (
        <Drawer open={isDrawing} onOpenChange={setIsDrawing}>
          <DrawerTrigger asChild>
            <Button 
              className="absolute top-2 right-2 z-20 bg-white text-black hover:bg-gray-100"
              onClick={startDrawing}
            >
              Draw Service Area
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Draw Service Area</DrawerTitle>
            </DrawerHeader>
            {DrawingControls}
          </DrawerContent>
        </Drawer>
      );
    }

    return (
      <Dialog open={isDrawing} onOpenChange={setIsDrawing}>
        <DialogTrigger asChild>
          <Button 
            className="absolute top-2 right-2 z-20 bg-white text-black hover:bg-gray-100"
            onClick={startDrawing}
          >
            Draw Service Area
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Draw Service Area</DialogTitle>
          </DialogHeader>
          {DrawingControls}
        </DialogContent>
      </Dialog>
    );
  };
  
  return (
    <div className="rounded-xl overflow-hidden shadow-lg relative">
      <div ref={mapContainer} className="h-[400px] w-full" />
      <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-md shadow-md z-10">
        <h3 className="font-bold text-sm">Roll On Painting Service Area</h3>
      </div>
      <DrawingUI />
    </div>
  );
};

export default ServiceAreaMap;
