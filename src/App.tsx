import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Settings from "@/pages/Settings";
import Contacts from "@/pages/Contacts";
import Users from "@/pages/Users";
import Departments from "@/pages/Departments";
import Schedules from "@/pages/Schedules";
import Broadcasts from "@/pages/Broadcasts";
import Reminders from "@/pages/Reminders";
import Tags from "@/pages/Tags";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import FunnelEditor from "@/pages/FunnelEditor";
import Funnels from "@/pages/Funnels";
import Connection from "@/pages/Connection";
import NovoAgente from "@/pages/NovoAgente";
import ConfigurarAgente from "@/pages/ConfigurarAgente";
import Agentes from "@/pages/Agentes";
import Conversas from "@/pages/Conversas";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/broadcasts" element={<Broadcasts />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/etiquetas" element={<Tags />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/funnel-editor" element={<FunnelEditor />} />
          <Route path="/funnels" element={<Funnels />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/novo-agente" element={<NovoAgente />} />
          <Route path="/configurar-agente" element={<ConfigurarAgente />} />
          <Route path="/agentes" element={<Agentes />} />
          <Route path="/conversas" element={<Conversas />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}