import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const productosDestacados = [
  { nombre: "Vestido Grecia", imagen: "/img/productos/vestido_grecia.png", seccion: "Vestidos" },
  { nombre: "Musculosa Louise", imagen: "/img/productos/musculosa_louise.png", seccion: "Remeras / Blusas / Musculosas" },
  { nombre: "Abrigo Broches", imagen: "/img/productos/abrigo_broches.png", seccion: "Abrigos" },
  { nombre: "Pollera Coqueta", imagen: "/img/productos/pollera_coqueta.png", seccion: "Shorts / Polleras" },
  { nombre: "Pollera Brillos", imagen: "/img/productos/pollera_brillos.png", seccion: "Shorts / Polleras" },
];

function Home({ setSeccionSeleccionada }) {
  const navigate = useNavigate();

  const handleClickProducto = (seccion) => {
    setSeccionSeleccionada(seccion);
    navigate("/catalogo");
  };

  return (
    <main className="inicio">
      <p className="font titulo">Nova Style</p>
      <p className="font subtitulo">Destacados del mes</p>

      <div className="destacados-container">
        {productosDestacados.map((prod, index) => (
          <div key={index} className="destacados" onClick={() => handleClickProducto(prod.seccion)}>
            <img src={prod.imagen} alt={prod.nombre} />
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;