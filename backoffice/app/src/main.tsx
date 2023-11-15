import {initializeCore} from '@school-shared/infrastructure';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {initializeApplication, initializeStore} from './application/handlers.ts';

initializeCore().then(async () => {
  initializeApplication();
  initializeStore();
  await createRoot(document.getElementById('root')!).render(
    <main className="dark h-full w-full text-foreground bg-background">
      <App />
    </main>
  );
});
