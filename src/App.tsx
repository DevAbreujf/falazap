import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import IndexAlternative from "./pages/IndexAlternative";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/alternative" element={<IndexAlternative />} />
      </Routes>
    </Router>
  );
}

export default App;
