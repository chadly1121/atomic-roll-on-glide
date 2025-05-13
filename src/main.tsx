
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

// Use normal import instead of lazy load for main App
import App from './App';

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
  
  // Add error handler
  const renderApp = () => {
    try {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } catch (error) {
      console.error("Root render error:", error);
      root.render(
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Failed to load application</h1>
          <p className="text-gray-700 mb-4">Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      );
    }
  };

  renderApp();
  
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
