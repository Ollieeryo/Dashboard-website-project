import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store, persistor } from './store/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import SignIn from './components/SignIn.tsx';
import Home from './pages/Home.tsx';
import Site from './pages/Site.tsx';
import RawData from './pages/RawData.tsx';
import DataEtl from './pages/DataEtl.tsx';
import DataPlatform from './pages/DataPlatform.tsx';
import MgmtEtl from './pages/MgmtEtl.tsx';
import NotFound from './pages/NotFound.tsx';
import UserProfile from './pages/UserProfile.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'sites',
        element: <Site />,
      },
      {
        path: 'rawdata',
        element: <RawData />,
      },
      {
        path: 'dataetl',
        element: <DataEtl />,
      },
      {
        path: 'dataplatform',
        element: <DataPlatform />,
      },
      {
        path: 'mgmtetl',
        element: <MgmtEtl />,
      },
      {
        path: 'userprofile',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);
