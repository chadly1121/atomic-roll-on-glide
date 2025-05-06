import { createRoot } from 'react-dom/client';
import { lazy, Suspense } from 'react';
import './styles/index.css';

// Add React.StrictMode for better development experience
import React from 'react';

// App loading component
const AppLoading = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-atomic-cream">
    <div className="w-16 h-16 border-4 border-atomic-turquoise border-t-atomic-orange rounded-full animate-spin"></div>
    <p className="mt-4 text-atomic-navy font-medium">Loading Roll On Painting...</p>
  </div>
);

// Lazy load the main App component
const App = lazy(() => import('./App.tsx'));

// Get the root element
const rootElement = document.getElementById('root');

// Measure performance
if (process.env.NODE_ENV === 'development') {
  console.time('App Render Time');
}

// Mark the start of performance measurement
performance.mark('app-start');

// Create root and render app
if (rootElement) {
  const root = createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </React.StrictMode>
  );
  
  // Performance logging
  window.addEventListener('load', () => {
    performance.mark('app-end');
    performance.measure('app-total', 'app-start', 'app-end');
    
    if (process.env.NODE_ENV === 'development') {
      console.timeEnd('App Render Time');
      const perfEntries = performance.getEntriesByType('measure');
      console.log('App loading performance:', perfEntries);
    }
  });
}
