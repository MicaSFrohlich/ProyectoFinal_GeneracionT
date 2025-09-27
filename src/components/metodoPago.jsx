import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./metodoPago.css";

const MetodoPago = ({ setCarrito }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total } = location.state || { total: 0 };

  const [metodo, setMetodo] = useState("");
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    vencimiento: "",
    cvv: "",
  });
  const [confirmado, setConfirmado] = useState(false);

  const confirmarPago = () => {
    if (!metodo) {
      alert("Por favor seleccioná un método de pago");
      return;
    }

    if ((metodo === "tarjeta" || metodo === "tarjetaMP") && 
        (!tarjeta.numero || !tarjeta.nombre || !tarjeta.vencimiento || !tarjeta.cvv)) {
        alert("Por favor completá todos los campos de la tarjeta.");
        return;
    }

    setCarrito([]);

    setConfirmado(true);

    setTimeout(() => {
      alert("La compra se realizó con éxito 🛍️✨");
      navigate("/");
    }, 500);
  };

  return (
    <div className="pago-container">
      <h2 className="titulo-pago">Seleccioná tu método de pago</h2>
      <p>Total a pagar: <strong>${total}</strong></p>

      <div className="opciones-pago">
        <label>
          <input
            type="radio"
            value="tarjeta"
            checked={metodo === "tarjeta"}
            onChange={() => setMetodo("tarjeta")}
          />
          Tarjeta de Crédito/Débito
        </label>
        <label>
          <input
            type="radio"
            value="Mercado Pago"
            checked={metodo === "tarjetaMP"}
            onChange={() => setMetodo("tarjetaMP")}
          />
          Tarjeta de Mercado Pago
        </label>
      </div>

      {(metodo === "tarjeta" || metodo === "tarjetaMP") && (
        <div className="tarjeta-form">
            <input
            type="text"
            placeholder="Número de tarjeta"
            maxLength={16}
            inputMode="numeric"
            value={tarjeta.numero}
            onChange={(e) => setTarjeta({ ...tarjeta, numero: e.target.value.replace(/\D/g, "")})}
            />
            <input
            type="text"
            placeholder="Nombre del titular"
            value={tarjeta.nombre}
            onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
            />
            <input
            type="text"
            placeholder="MM/AA"
            maxLength={4}
            inputMode="numeric"
            value={tarjeta.vencimiento}
            onChange={(e) => setTarjeta({ ...tarjeta, vencimiento: e.target.value.replace(/\D/g, "")})}
            />
            <input
            type="text"
            placeholder="CVV"
            maxLength={3}
            inputMode="numeric"
            value={tarjeta.cvv}
            onChange={(e) => setTarjeta({ ...tarjeta, cvv: e.target.value.replace(/\D/g, "")})}
            />
        </div>
    )}

      <button className="btn-confirmar" onClick={confirmarPago}>
        Confirmar Pago
      </button>

      {confirmado && <p className="mensaje-exito">✅ Pago confirmado</p>}
    </div>
  );
};

export default MetodoPago;