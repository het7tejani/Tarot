import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
// Prerendered pages already contain the real HTML; pages served as an empty shell (admin, 404) mount fresh.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
