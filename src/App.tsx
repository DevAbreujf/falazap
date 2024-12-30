import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/pages/Dashboard";
import Funnels from "@/pages/Funnels";
import FunnelEditor from "@/pages/FunnelEditor";

const router = createBrowserRouter([
  {
    path: "/",
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