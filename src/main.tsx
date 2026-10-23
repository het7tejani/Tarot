import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './App.tsx';
import {ErrorBoundary} from './components/ErrorBoundary';
import './index.css';
import {DailyCardDateProvider, localDayKey} from './contexts/DailyCardDate';

const root = document.getElementById('root')!;
const savedDayKey = Number(root.dataset.dailyCardDay);
const initialDayKey = Number.isInteger(savedDayKey) && savedDayKey >= 20000101 && savedDayKey <= 99991231
  ? savedDayKey : localDayKey();
const app = (
  <StrictMode>
    <DailyCardDateProvider initialDayKey={initialDayKey}>
      <BrowserRouter>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </DailyCardDateProvider>
  </StrictMode>
);
// Prerendered pages already contain the real HTML; pages served as an empty shell (admin, 404) mount fresh.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
