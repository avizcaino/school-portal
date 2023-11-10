import {initializeCore} from '@school-shared/core';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {initializeApplication} from './application/handlers.ts';

initializeCore().then(async () => {
  initializeApplication();
  await createRoot(document.getElementById('root')!).render(
    <main className="dark text-foreground bg-background">
      <App />
    </main>
  );
});
