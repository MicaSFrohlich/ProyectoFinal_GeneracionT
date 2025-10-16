import React, { useState, useEffect } from "react";
import "./seguimiento.css";

const pasos = [
  "Pedido recibido",
  "Pedido en preparación",
  "En camino",
  "Entregado !"
];

const Seguimiento = () => {
  const savedPedido = JSON.parse(localStorage.getItem("pedidoActual"));
  const [pedido, setPedido] = useState(savedPedido || { carrito: [], pasoActivo: 0, entregado: false });

  const { carrito, pasoActivo, entregado } = pedido;

  useEffect(() => {
    if (!entregado && pasoActivo < pasos.length - 1) {
      const timer = setTimeout(() => {
        const nuevoPaso = pasoActivo + 1;
        const updatedPedido = { ...pedido, pasoActivo: nuevoPaso };
        setPedido(updatedPedido);
        localStorage.setItem("pedidoActual", JSON.stringify(updatedPedido));
      }, 10000); 

      return () => clearTimeout(timer);
    }
  }, [pasoActivo, entregado, pedido]);

    const confirmarEntrega = () => {
      const updatedPedido = { ...pedido, entregado: true };
      setPedido(updatedPedido);
      localStorage.setItem("pedidoActual", JSON.stringify(updatedPedido));
      localStorage.removeItem("carrito"); 
      alert("Gracias por confirmar la recepción de tu pedido 🤍✨!");
    };

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

      {pasoActivo === pasos.length - 1 && !entregado && (
        <button className="btn-confirmar-seg" onClick={confirmarEntrega}>
          Confirmar Recibido
        </button>
      )}
            {entregado && <p className="confirmado">Pedido recibido</p>}

            <h3 id="titulo_ped">Productos en tu pedido:</h3>

      <div className="productos-comprados">
        {carrito.length === 0 ? (
          <p>No hay productos en este pedido.</p>
        ) : (
          carrito.map((item) => (
            <div key={`${item.id}-${item.talle}`} className="item-pedido">
              <img src={item.imagen} alt={item.nombre} className="img-pedido" />
              <div>
                <p className="texto-ped">{item.nombre}</p>
                <p className="texto-ped">Talle: {item.talle}</p>
                <p className="texto-ped">Cantidad: {item.cantidad}</p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Seguimiento;
