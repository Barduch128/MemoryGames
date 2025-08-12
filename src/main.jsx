import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';
import App from './MemoryGames/Application.jsx';


createRoot(document.getElementById('root')).render(
  <>
    <App/>
  </>
);