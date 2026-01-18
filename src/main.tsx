
import { createRoot } from 'react-dom/client';
import React from 'react';
import './styles/index.css';
import App from './App';

// App loading component
const AppLoading = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center bg-cream">
    <div className="w-12 h-12 border-2 border-gold border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-charcoal font-sans text-sm tracking-wide">Loading...</p>
  </div>
);

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
        <div className="min-h-screen flex flex-col items-center justify-center bg-cream p-4">
          <h1 className="text-2xl font-serif font-semibold text-charcoal mb-2">Failed to load application</h1>
          <p className="text-muted-foreground mb-4 font-sans">Please try refreshing the page</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn-gold"
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