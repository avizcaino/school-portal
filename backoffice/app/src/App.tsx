import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './App.css';
import {Groups} from './components/Groups';
import {Students} from './components/Students';
import {Teachers} from './components/Teachers';

function App() {
  const router = createBrowserRouter([
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

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
