import React from "react";
import "../App.css";

const productos = [
  "/img/productos/vestido_argolla.png",
  "/img/productos/top_celeste.png",
  "/img/productos/short_jean.png",
  "/img/productos/pollera_coqueta.png",
  "/img/productos/pollera_brillos.png",
];

function home() {
  return (
    <main className="inicio">
      <p className="font titulo">Nova Style</p>
      <p className="font subtitulo">Destacados del mes</p>

        <div className="destacados-container">
            {productos.map((img, index) => (
            <div key={index} className="destacados">
                <img src={img} alt={`Prenda ${index + 1}`} />
            </div>
            ))}
        </div>

    </main>
  );
}

export default home;