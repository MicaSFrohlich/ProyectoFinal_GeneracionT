import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./metodoPago.css";

const MetodoPago = ({ setCarrito }) => {
  const location = useLocation();
  const { carrito, total, usuario } = location.state || {};
  const usuarioActual = usuario || JSON.parse(sessionStorage.getItem("usuario"));

  if (!usuarioActual || !usuarioActual.userid) {
    alert("Debes iniciar sesión antes de comprar ✨");
    navigate("/login");
    return null;
  }

  const navigate = useNavigate();

  const [metodo, setMetodo] = useState("");
  const [tarjeta, setTarjeta] = useState({
    numero: "",
    nombre: "",
    vencimiento: "",
    cvv: "",
    dni: "",
    telefono: "",
    direccion: "",
  });
  const [confirmado, setConfirmado] = useState(false);


const confirmarPago = async () => {
  if (!metodo) return alert("Por favor seleccioná un método de pago");

  if ((metodo === "tarjeta" || metodo === "tarjetaMP") &&
      (!tarjeta.numero || !tarjeta.nombre || !tarjeta.vencimiento || 
       !tarjeta.cvv || !tarjeta.dni || !tarjeta.direccion || !tarjeta.telefono)) {
    return alert("Por favor completá todos los campos de la tarjeta.");
  }

  try {
    const usuarioStorage = JSON.parse(sessionStorage.getItem("usuario"));

    const usuario = {
      userid: usuarioStorage.userid,
      name: tarjeta.nombre,
      dni: tarjeta.dni,
      address: tarjeta.direccion,
      phone: tarjeta.telefono
    };

    const response = await fetch("http://localhost:3001/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        usuario,
        carrito,
        total,
        shippingaddress: tarjeta.direccion
      })
    });

    const data = await response.json();

    if (!response.ok) {
      // ⚠️ Si el error viene por un DNI duplicado, mostrar explicación más clara
      if (data.error && data.error.includes("users_dni_key")) {
        alert(
          "⚠️ Este DNI ya está registrado por otro usuario.\n" +
          "Por favor verificá que estés usando tu propio DNI o iniciá sesión con la cuenta asociada a ese número."
        );
      } else {
        alert(data.error || "❌ Ocurrió un error al procesar el pago");
      }
      return;
    }

    alert("✅ Compra realizada con éxito!");
    setCarrito([]);

    // 🟢 Mantener el email y el rol originales del usuario logueado
    const usuarioActualizado = {
      ...usuarioStorage, // conserva email, role, etc.
      name: tarjeta.nombre,
      dni: tarjeta.dni,
      address: tarjeta.direccion,
      phone: tarjeta.telefono
    };

    // 🟢 Si el backend devuelve el usuario actualizado, usarlo preferentemente
    sessionStorage.setItem("usuario", JSON.stringify(data.user || usuarioActualizado));

    navigate("/seguimiento");

  } catch (err) {
    console.error("Error en checkout:", err);
    alert("❌ Ocurrió un error al procesar el pago");
  }


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
              placeholder="Nombre De Titular"
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
            <input
            type="text"
            placeholder="DNI"
            maxLength={8}
            inputMode="numeric"
            value={tarjeta.dni}
            onChange={(e) => setTarjeta({ ...tarjeta, dni: e.target.value.replace(/\D/g, "")})}
            />
            <input
            type="text"
            placeholder="Teléfono"
            maxLength={10}
            inputMode="numeric"
            value={tarjeta.telefono}
            onChange={(e) => setTarjeta({ ...tarjeta, telefono: e.target.value.replace(/\D/g, "")})}
            />
            <input
            type="text"
            placeholder="Dirección particular"
            value={tarjeta.direccion}
            onChange={(e) => setTarjeta({ ...tarjeta, direccion: e.target.value })}
            />
        </div>
    )}

      <div className="final">
              <button className="btn-confirmar" type="button" onClick={confirmarPago}>
                Confirmar Pago
              </button>
      </div>

      {confirmado && <p className="mensaje-exito">✅ Pago confirmado</p>}
    </div>
  );
};

export default MetodoPago;