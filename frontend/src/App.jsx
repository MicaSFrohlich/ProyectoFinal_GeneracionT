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
import Carrito from "./components/carrito";
import ArmarConjunto from "./components/armarConjunto.jsx";
import MetodoPago from "./components/metodoPago";
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
  const [carrito, setCarrito] = useState([]);

  // ✅ Función para agregar productos al carrito desde el catálogo
  const agregarAlCarrito = (producto, talle, cantidad) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (item) =>
          item.id === producto.productid && item.talle === talle
      );

      if (existe) {
        // Si ya está el mismo producto y talle, aumento la cantidad
        return prev.map((item) =>
          item.id === producto.productid && item.talle === talle
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        // Si es nuevo, lo agrego con los campos correctos
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

  // ✅ Función para eliminar un producto del carrito
  const eliminarDelCarrito = (id, talle) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (item) => !(item.id === id && item.talle === talle)
      )
    );
  };

  return (
    <>
      <Navbar
        secciones={secciones}
        onSelect={setSeccionActiva}
        carrito={carrito}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/usuario" element={<Usuario />} />
        <Route path="/soporte" element={<SoporteChat />} />
        <Route path="/sobreNosotros" element={<SobreNosotros />} />
        <Route path="/seguimiento" element={<Seguimiento />} />

        {/* 🛒 Carrito conectado */}
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              setCarrito={setCarrito}
              eliminarDelCarrito={eliminarDelCarrito}
            />
          }
        />

        {/* 🛍️ Catálogo conectado */}
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