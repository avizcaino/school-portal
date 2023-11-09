import {ThemeProvider} from '@mui/material';
import {ModalContainer, ModalProvider} from '@school-shared/components';
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
          <ModalProvider>
            <div className="h-full w-full flex flex-row">
              <Sidebar />
              <Routes>
                {routes.map((r, i) => (
                  <Route key={i} path={r.path} element={r.element} />
                ))}
              </Routes>
            </div>
            <ModalContainer />
          </ModalProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
