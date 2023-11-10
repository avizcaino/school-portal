import {NextUIProvider} from '@nextui-org/react';
import {ModalContainer, ModalProvider} from '@school-shared/components';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Sidebar} from './components/Sidebar';
import {Groups} from './components/lists/Groups';
import {Students} from './components/lists/Students';
import {TeachersUI} from './components/lists/TeachersUI';

function App() {
  const routes = [
    {
      path: '/groups',
      element: <Groups />,
    },
    {
      path: '/teachers',
      element: <TeachersUI />,
    },
    {
      path: '/students',
      element: <Students />,
    },
  ];

  return (
    <BrowserRouter>
      <NextUIProvider className="h-full w-full">
        {/* <ThemeProvider theme={theme}> */}
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
          <ToastContainer />
        </ModalProvider>
        {/* </ThemeProvider> */}
      </NextUIProvider>
    </BrowserRouter>
  );
}

export default App;
