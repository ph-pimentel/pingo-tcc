import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Informacoes from "./pages/Sobre/Informacoes";
import MenuCourt from "./pages/MenuQuadras/MenuQuadras";
import QuadraInfo from "./pages/QuadraInfo/QuadraInfo"
import UsuarioAgendamento from "./pages/UsuarioAgendamento/usuarioagendamento";
import Perfil from "./pages/Perfil/perfil"
import Friends from "./pages/Friends/friends";
import SearchPage from "./pages/SearchPage/SearchPage";
import Config from "./pages/config/config";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/informacoes" element={<Informacoes />} />
        <Route path="/quadraopcoes" element={<MenuCourt />} />
        <Route path="/quadrainformacoes" element={<QuadraInfo/>}/>
        <Route path="/meusagendamentos" element={<UsuarioAgendamento/>} />
        <Route path="/perfil" element={<Perfil/>}/>
        <Route path="/amigos" element={<Friends/>}/>
        <Route path="/pesquisa" element={<SearchPage/>}/>
        <Route path="/configuracoes" element={<Config/>}/>

        </Routes>
    </Router>
  );
}

export default App;
