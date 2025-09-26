import React, { useState, useEffect } from "react";
import "./seguimiento.css";

const pasos = [
  "Pedido recibido",
  "Pedido en preparación",
  "En camino",
  "Entregado !"
];

const Seguimiento = () => {
  const [pasoActivo, setPasoActivo] = useState(0);

  useEffect(() => {
    if (pasoActivo < pasos.length - 1) {
      const timer = setTimeout(() => {
        setPasoActivo((prev) => prev + 1);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [pasoActivo]);

  return (
    <div className="seguimiento-container">
      <h2 id="titulo_seg">Estado de tu pedido</h2>
      <div className="timeline">
        {pasos.map((texto, index) => (
          <div
            key={index}
            className={`timeline-item ${index <= pasoActivo ? "active" : ""}`}
          >
            <div className="circle"></div>
            <p>{texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Seguimiento;
