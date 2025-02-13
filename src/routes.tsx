
import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Chatboard from './pages/Chatboard';
import Contacts from './pages/Contacts';
import Departments from './pages/Departments';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import Broadcasts from './pages/Broadcasts';
import Reminders from './pages/Reminders';
import Schedules from './pages/Schedules';
import Connection from './pages/Connection';
import FunnelEditor from './pages/FunnelEditor';
import Funnels from './pages/Funnels';
import ConfigurarAgente from './pages/ConfigurarAgente';
import NovoAgente from './pages/NovoAgente';
import Agentes from './pages/Agentes';
import Users from './pages/Users';
import Tags from './pages/Tags';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

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
  {
    path: '/broadcasts',
    element: <Broadcasts />,
  },
  {
    path: '/reminders',
    element: <Reminders />,
  },
  {
    path: '/schedules',
    element: <Schedules />,
  },
  {
    path: '/connection',
    element: <Connection />,
  },
  {
    path: '/funnels',
    element: <Funnels />,
  },
  {
    path: '/funnel-editor',
    element: <FunnelEditor />,
  },
  {
    path: '/agentes',
    element: <Agentes />,
  },
  {
    path: '/agentes/novo',
    element: <NovoAgente />,
  },
  {
    path: '/agentes/novo/configurar',
    element: <ConfigurarAgente />,
  },
  {
    path: '/users',
    element: <Users />,
  },
  {
    path: '/etiquetas',
    element: <Tags />,
  },
  {
    path: '/terms',
    element: <Terms />,
  },
  {
    path: '/privacy',
    element: <Privacy />,
  },
]);
