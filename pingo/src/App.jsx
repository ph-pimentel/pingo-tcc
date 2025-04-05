import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Informacoes from "./pages/Sobre/Informacoes";
import MenuCourt from "./pages/MenuQuadras/MenuQuadras";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/quadraopcoes" element={<MenuCourt />} />
      </Routes>
    </Router>
  );
}

export default App;
