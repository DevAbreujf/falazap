import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";

import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Contacts from "@/pages/Contacts";
import Broadcasts from "@/pages/Broadcasts";
import Reminders from "@/pages/Reminders";
import Schedules from "@/pages/Schedules";
import Settings from "@/pages/Settings";
import Privacy from "@/pages/Privacy";
import Connection from "@/pages/Connection";
import Funnels from "@/pages/Funnels";
import FunnelEditor from "@/pages/FunnelEditor";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/broadcasts" element={<Broadcasts />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/funnels" element={<Funnels />} />
          <Route path="/funnels/editor" element={<FunnelEditor />} />
          <Route path="/funnels/editor/:id" element={<FunnelEditor />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  );
}
