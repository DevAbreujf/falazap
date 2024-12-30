import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Funnels from "@/pages/Funnels";
import FunnelEditor from "@/pages/FunnelEditor";
import Index from "@/pages/Index";
import Login from "@/pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/funnels",
    element: <Funnels />,
  },
  {
    path: "/funnels/editor/:id?",
    element: <FunnelEditor />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;