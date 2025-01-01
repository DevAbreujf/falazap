import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Broadcasts from "@/pages/Broadcasts";
import Connection from "@/pages/Connection";
import Contacts from "@/pages/Contacts";
import Funnels from "@/pages/Funnels";
import Reminders from "@/pages/Reminders";
import Settings from "@/pages/Settings";
import Schedules from "@/pages/Schedules";

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/entrar" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
          <Route path="/painel" element={<Dashboard />} />
          <Route path="/disparos" element={<Broadcasts />} />
          <Route path="/conexao" element={<Connection />} />
          <Route path="/contatos" element={<Contacts />} />
          <Route path="/funis" element={<Funnels />} />
          <Route path="/lembretes" element={<Reminders />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/agendamentos" element={<Schedules />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;