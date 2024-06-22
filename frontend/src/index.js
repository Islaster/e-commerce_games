import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Find the root element in the HTML file
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
