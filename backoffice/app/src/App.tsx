import {NextUIProvider} from '@nextui-org/react';
import {store} from '@school-backoffice/core';
import {ModalContainer, ModalProvider} from '@school-shared/components';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Toolbar} from './components/Toolbar';
import {Groups} from './components/lists/Groups';
import {Students} from './components/lists/Students';
import {Teachers} from './components/lists/Teachers';

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
      element: <Teachers />,
    },
    {
      name: 'Students',
      path: '/students',
      element: <Students />,
    },
  ];

  return (
    <BrowserRouter>
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  );
}

export default App;
