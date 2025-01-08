import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agentes from "./pages/Agentes";
import NovoAgente from "./pages/NovoAgente";
import ConfigurarAgente from "./pages/ConfigurarAgente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agentes" element={<Agentes />} />
        <Route path="/agentes/novo" element={<NovoAgente />} />
        <Route path="/agentes/novo/configurar" element={<ConfigurarAgente />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;