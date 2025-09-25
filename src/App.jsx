import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./components/home";
import Login from "./components/login";
import Registro from "./components/registro";
import Usuario from "./components/usuario";
import Catalogo from "./components/catalogo";
import Seguimiento from "./components/seguimiento";
import SoporteChat from "./components/soporteChat";
import SobreNosotros from "./components/sobreNosotros";
import "./App.css";


function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);

  const secciones = ["Remeras / Blusas / Musculosas", "Shorts / Polleras", "Pantalones", "Vestidos", "Abrigos"];

  return (
    <>
      <Navbar secciones={secciones} onSelect={setSeccionActiva} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/soporteChat" element={<SoporteChat />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/seguimiento" element={<Seguimiento />} /> 
        <Route 
          path="/catalogo" 
          element={<Catalogo seccionSeleccionada={seccionActiva} />} 
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;