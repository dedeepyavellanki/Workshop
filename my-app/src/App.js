import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import Profile from './components/Profile/Profile';
import Admin from './components/admin/Admin';
import Summary from './components/Summary/Summary';
import Workshops from './components/workshops/Workshops';
import Upload from './components/Upload/Upload';
import ErrorPage from './components/ErrorPage/ErrorPage';
import DashboardId from './components/Dashboard/DashboardId';
import RedirectToDashboard from './components/Dashboard/RedirectToDashboard';
import ManagePassword from './components/ManagePassword/ManagePassword';

function App() {
  let router = createBrowserRouter([
    {
      path: '',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '',
          element: <Dashboard /> // Redirect to Dashboard by default after login
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'admin',
          element: <Admin />,
          children: [
            {
              path: '',
              element: <RedirectToDashboard />
            },
            {
              path: 'Dashboard',
              element: <Dashboard />,
            },
            {
              path: 'Dashboard/:id',
              element: <DashboardId />
            },
            {
              path: 'profile',
              element: <Profile />
            },
            {
              path: 'profile/manage-password',
              element: <ManagePassword />
            },
            {
              path: 'view-all-workshops',
              element: <Workshops />
            },
            {
              path: 'view-all-summary',
              element: <Summary />
            },
            {
              path: 'upload-new-workshop',
              element: <Upload />
            },
          ]
        }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
