import {ThemeProvider} from '@mui/material';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Sidebar} from './components/Sidebar';
import {Groups} from './components/lists/Groups';
import {Students} from './components/lists/Students';
import {Teachers} from './components/lists/Teachers';
import {theme} from './styles/mui/theme';

function App() {
  const routes = [
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
  ];

  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <div className="w-full flex flex-row">
            <Sidebar />
            <Routes>
              {routes.map(r => (
                <Route path={r.path} element={r.element} />
              ))}
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
