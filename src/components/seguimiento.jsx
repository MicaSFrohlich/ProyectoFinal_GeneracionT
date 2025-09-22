// src/components/seguimiento.jsx
import React from "react";
import "./seguimiento.css";

const Seguimiento = () => {
  return (
    <div className="seguimiento-container">
      <h2> Estado de tu pedido</h2>
      <div className="timeline">
        <div className="timeline-item active">
          <div className="circle"></div>
          <p>Pedido recibido</p>
        </div>
        <div className="timeline-item active">
          <div className="circle"></div>
          <p>Siendo empaquetado</p>
        </div>
        <div className="timeline-item">
          <div className="circle"></div>
          <p>En camino</p>
        </div>
        <div className="timeline-item">
          <div className="circle"></div>
          <p>Entregado</p>
        </div>
      </div>
    </div>
  );
};

export default Seguimiento;
