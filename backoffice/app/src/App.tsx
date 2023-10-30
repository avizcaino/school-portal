import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import {Groups} from './components/Groups';
import {Dashboard} from './Dashboard';
import {Students} from './Students';
import {Teachers} from './Teachers';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/groups',
      element: <Groups />,
    },
    {
      path: '/teachers',
      element: <Teachers />,
    },
    {
      path: '/students',
      element: <Students />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
