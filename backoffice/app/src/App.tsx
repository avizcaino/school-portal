import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import {Groups} from './components/Groups';
import {Students} from './components/Students';
import {Dashboard} from './Dashboard';
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
