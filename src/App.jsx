import { useState, useEffect } from "react";
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
import Carrito from "./components/carrito";
import ArmarConjunto from "./components/armarConjunto";
import MetodoPago from "./components/metodoPago";
import PopupBienvenida from "./components/PopUp";
import "./App.css";

function App() {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const secciones = [
    "Remeras / Blusas / Musculosas",
    "Shorts / Polleras",
    "Pantalones",
    "Vestidos",
    "Abrigos",
  ];

  const [carrito, setCarrito] = useState(() => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (!usuario || !usuario.userid) return [];
    const guardado = localStorage.getItem(`carrito_${usuario.userid}`);
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (!usuario || !usuario.userid) return;
    localStorage.setItem(`carrito_${usuario.userid}`, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, talle, cantidad) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) => item.id === producto.productid && item.talle === talle
      );

      if (existe) {
        return prev.map((item) =>
          item.id === producto.productid && item.talle === talle
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: producto.productid,
            nombre: producto.productname,
            imagen: producto.image,
            precio: producto.price,
            tipo: producto.type,
            talle,
            cantidad,
          },
        ];
      }
    });
  };

  const eliminarDelCarrito = (id, talle) => {
    setCarrito((prev) =>
      prev.filter((item) => !(item.id === id && item.talle === talle))
    );
  };

  return (
    <>
      <PopupBienvenida />
      <Navbar secciones={secciones} onSelect={setSeccionActiva} carrito={carrito} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/soporte" element={<SoporteChat />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/seguimiento" element={<Seguimiento />} />

        <Route
          path="/carrito"
          element={
            <Carrito carrito={carrito} setCarrito={setCarrito} />
          }
        />

        <Route
          path="/catalogo"
          element={
            <Catalogo
              seccionSeleccionada={seccionActiva}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />

        <Route path="/metodoPago" element={<MetodoPago setCarrito={setCarrito} />} />
        <Route path="/armarConjunto" element={<ArmarConjunto carrito={carrito} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
