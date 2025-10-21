import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import "./PopUp.css";

const productosDestacados = [
  { nombre: "Vestido Grecia", imagen: "/img/productos/vestido_grecia.png", seccion: "Vestidos" },
  { nombre: "Musculosa Louise", imagen: "/img/productos/musculosa_louise.png", seccion: "Remeras / Blusas / Musculosas" },
  { nombre: "Abrigo Broches", imagen: "/img/productos/abrigo_broches.png", seccion: "Abrigos" },
  { nombre: "Pollera Coqueta", imagen: "/img/productos/pollera_coqueta.png", seccion: "Shorts / Polleras" },
  { nombre: "Pollera Brillos", imagen: "/img/productos/pollera_brillos.png", seccion: "Shorts / Polleras" },
];

function Home({ setSeccionSeleccionada }) {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    const usuario = usuarioGuardado ? JSON.parse(usuarioGuardado) : null;

    if (!usuario) {
      setTimeout(() => setShowPopup(true), 800);
    }
  }, []);

  const handleClickProducto = (seccion) => {
    setSeccionSeleccionada(seccion);
    navigate("/catalogo");
  };

  const cerrarPopup = () => {
    setShowPopup(false);
  };

  return (
    <main className="inicio">
      <p className="font titulo">Nova Style</p>
      <p className="font subtitulo">Destacados del mes</p>

      <div className="destacados-container">
        {productosDestacados.map((prod, index) => (
          <div
            key={index}
            className="destacados"
            onClick={() => handleClickProducto(prod.seccion)}
          >
            <img src={prod.imagen} alt={prod.nombre} />
          </div>
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-container">
            <h2 className="popup-titulo">Bienvenido a NovaStyle</h2>
            <p className="popup-text">
              Nos alegra tenerte acá 🤍<br />
              Antes de continuar, <strong>iniciá sesión o registrate</strong> para guardar tus datos y tus pedidos.
            </p>
            <p className="popup-note">
              Si continuás sin iniciar sesión, tu carrito se perderá.
            </p>

            <div className="popup-buttons">
              <button className="btn-iniciar" onClick={() => navigate("/login")}>
                Iniciar sesión
              </button>
              <button className="btn-continuar" onClick={cerrarPopup}>
                Continuar sin iniciar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;
