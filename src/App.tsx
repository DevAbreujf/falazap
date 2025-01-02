import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Funnels from "@/pages/Funnels";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Contacts from "@/pages/Contacts";
import Broadcasts from "@/pages/Broadcasts";
import Reminders from "@/pages/Reminders";
import Schedules from "@/pages/Schedules";
import Connection from "@/pages/Connection";
import Settings from "@/pages/Settings";
import Privacy from "@/pages/Privacy";
import ErrorBoundary from "@/components/ErrorBoundary";
import { SidebarProvider } from "@/components/ui/sidebar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/dashboard",
    element: (
      <SidebarProvider>
        <Dashboard />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/connection",
    element: (
      <SidebarProvider>
        <Connection />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/funnels",
    element: (
      <SidebarProvider>
        <Funnels />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/contacts",
    element: (
      <SidebarProvider>
        <Contacts />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/broadcasts",
    element: (
      <SidebarProvider>
        <Broadcasts />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/reminders",
    element: (
      <SidebarProvider>
        <Reminders />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/schedules",
    element: (
      <SidebarProvider>
        <Schedules />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/settings",
    element: (
      <SidebarProvider>
        <Settings />
      </SidebarProvider>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/auth",
    element: <Auth />,
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
