import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Funnels from "./pages/Funnels";
import Broadcasts from "./pages/Broadcasts";
import Reminders from "./pages/Reminders";
import Schedules from "./pages/Schedules";
import Settings from "./pages/Settings";
import Connection from "./pages/Connection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/funnels" element={<Funnels />} />
        <Route path="/broadcasts" element={<Broadcasts />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/connection" element={<Connection />} />
      </Routes>
    </Router>
  );
}

export default App;