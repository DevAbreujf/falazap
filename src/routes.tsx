
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Chatboard from './pages/Chatboard';
import Contacts from './pages/Contacts';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/chat',
    element: <Chatboard />,
  },
  {
    path: '/contacts',
    element: <Contacts />,
  },
  {
    path: '/departments',
    element: <Departments />,
  },
  {
    path: '/settings',
    element: <Settings />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
]);
