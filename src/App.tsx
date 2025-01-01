import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Funnels from "@/pages/Funnels";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Contacts from "@/pages/Contacts";
import Broadcasts from "@/pages/Broadcasts";
import Reminders from "@/pages/Reminders";
import Schedules from "@/pages/Schedules";
import Connection from "@/pages/Connection";
import Settings from "@/pages/Settings";
import ErrorBoundary from "@/components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/connection",
    element: <Connection />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/funnels",
    element: <Funnels />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/broadcasts",
    element: <Broadcasts />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/schedules",
    element: <Schedules />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    element: <Settings />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundary />,
  },
]);

function App() {
  return (
    <div className="min-h-screen flex w-full">
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;