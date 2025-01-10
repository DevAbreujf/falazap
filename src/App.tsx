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
import Chatboard from "@/pages/Chatboard";
import Agentes from "@/pages/Agentes";
import NovoAgente from "@/pages/NovoAgente";
import ConfigurarAgente from "@/pages/ConfigurarAgente";
import Users from "@/pages/Users";
import Departments from "@/pages/Departments";
import Tags from "@/pages/Tags";

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
          <Route path="/chatboard" element={<Chatboard />} />
          <Route path="/agentes" element={<Agentes />} />
          <Route path="/agentes/novo" element={<NovoAgente />} />
          <Route path="/agentes/novo/configurar" element={<ConfigurarAgente />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/etiquetas" element={<Tags />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  );
}