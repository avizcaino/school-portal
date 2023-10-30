import {initializeCore} from '@school-shared/core';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

initializeCore().then(async () => {
  await import('./application/handlers');
  await createRoot(document.getElementById('root')!).render(<App />);
});
