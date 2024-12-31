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
import ErrorBoundary from "@/components/ErrorBoundary";
import { SidebarProvider } from "@/components/ui/sidebar";

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
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <RouterProvider router={router} />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}

export default App;