import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Connection from "@/pages/Connection";
import Chatboard from "@/pages/Chatboard";
import Agents from "@/pages/Agents";
import Funnels from "@/pages/Funnels";
import Broadcasts from "@/pages/Broadcasts";
import Reminders from "@/pages/Reminders";
import Schedules from "@/pages/Schedules";
import Contacts from "@/pages/Contacts";
import Users from "@/pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/chatboard" element={<Chatboard />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/funnels" element={<Funnels />} />
        <Route path="/broadcasts" element={<Broadcasts />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;