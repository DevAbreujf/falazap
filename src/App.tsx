import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Index } from "./pages/Index";
import { IndexAlternative } from "./pages/IndexAlternative";
import { Auth } from "./pages/Auth";
import { Dashboard } from "./pages/Dashboard";
import { Contacts } from "./pages/Contacts";
import { Broadcasts } from "./pages/Broadcasts";
import { Connection } from "./pages/Connection";
import { Funnels } from "./pages/Funnels";
import { Reminders } from "./pages/Reminders";
import { Schedules } from "./pages/Schedules";
import { Settings } from "./pages/Settings";
import { Privacy } from "./pages/Privacy";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Toaster } from "sonner";

export function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/alternative" element={<IndexAlternative />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/broadcasts" element={<Broadcasts />} />
          <Route path="/connection" element={<Connection />} />
          <Route path="/funnels" element={<Funnels />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/schedules" element={<Schedules />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  );
}