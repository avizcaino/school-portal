import {NextUIProvider} from '@nextui-org/react';
import {ModalContainer, ModalProvider} from '@school-shared/components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toolbar} from './components/Toolbar';
import {Groups} from './components/lists/Groups';
import {Students} from './components/lists/Students';
import {TeachersUI} from './components/lists/TeachersUI';

function App() {
  const routes = [
    {
      name: 'Groups',
      path: '/groups',
      element: <Groups />,
    },
    {
      name: 'Teachers',
      path: '/teachers',
      element: <TeachersUI />,
    },
    {
      name: 'Students',
      path: '/students',
      element: <Students />,
    },
  ];

  return (
    <BrowserRouter>
      <NextUIProvider className="h-full w-full">
        {/* <ThemeProvider theme={theme}> */}
        <ModalProvider>
          <div className="h-full w-full flex flex-col">
            <Toolbar routes={routes} />
            {/* <Sidebar /> */}
            <Routes>
              {routes.map((r, i) => (
                <Route key={i} path={r.path} element={r.element} />
              ))}
            </Routes>
          </div>
          <ModalContainer />
          <ToastContainer />
        </ModalProvider>
        {/* </ThemeProvider> */}
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
