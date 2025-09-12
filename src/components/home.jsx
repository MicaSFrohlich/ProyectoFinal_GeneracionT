import React from "react";
import "../App.css";

const productos = [
  "/img/productos/vestido_argolla.jpg",
  "/img/productos/top_celeste.jpg",
  "/img/productos/short_jean.jpg",
  "/img/productos/pollera_coqueta.jpg",
  "/img/productos/pollera_brillos.jpg",
];

function home() {
  return (
    <main className="inicio">
      <p className="font titulo">Nova Style</p>
      <p className="font subtitulo">Destacados del mes</p>

        <div className="destacados-container">
            {productos.map((img, index) => (
            <div key={index} className="producto">
                <img src={img} alt={`Prenda ${index + 1}`} />
            </div>
            ))}
        </div>



    </main>
  );
}

export default home;