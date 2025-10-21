import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./metodoPago.css";

const MetodoPago = ({ setCarrito }) => {
  const location = useLocation();
  const { carrito, total, usuario } = location.state || {};
  const usuarioActual = usuario || JSON.parse(sessionStorage.getItem("usuario"));

  const navigate = useNavigate();

  if (!usuarioActual || !usuarioActual.userid) {
    alert("Debes iniciar sesión antes de comprar ✨");
    navigate("/login");
    return null;
  }

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

  const confirmarPago = async () => {
    if (!metodo) return alert("Por favor seleccioná un método de pago");

    if ((metodo === "tarjeta" || metodo === "tarjetaMP") &&
        (!tarjeta.numero || !tarjeta.nombre || !tarjeta.vencimiento || 
         !tarjeta.cvv || !tarjeta.dni || !tarjeta.direccion || !tarjeta.telefono)) {
      return alert("Por favor completá todos los campos de la tarjeta.");
    }

    try {
      const usuarioStorage = JSON.parse(sessionStorage.getItem("usuario"));

      const usuarioActualizado = {
        userid: usuarioStorage.userid,
        name: tarjeta.nombre,
        dni: tarjeta.dni,
        address: tarjeta.direccion,
        phone: tarjeta.telefono
      };

  const base = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');
  const response = await fetch(`${base}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: usuarioActualizado,
          carrito,
          total,
          shippingaddress: tarjeta.direccion
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.error?.includes("DNI")) {
          alert("⚠️ Este DNI ya está registrado por otro usuario.");
        } else {
          alert("❌ No se pudo procesar el pago. " + (data.error || ""));
        }
        return;
      }

      const pedidoActual = {
        carrito,
        pasoActivo: 0,     
        entregado: false
      };
      localStorage.setItem("pedidoActual", JSON.stringify(pedidoActual));

      sessionStorage.setItem("compraConfirmada", "true");

      alert("✅ Compra realizada con éxito!");

      setCarrito([]);
      localStorage.removeItem("carrito");

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
            value="tarjetaMP"
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
            maxLength={50}
            value={tarjeta.nombre}
            onChange={(e) => setTarjeta({ ...tarjeta, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="MM/AA"
            maxLength={5}
            inputMode="numeric"
            value={tarjeta.vencimiento}
            onChange={(e) => {
              let val = e.target.value.replace(/\D/g, "");

              if (val.length > 2) {
                val = val.slice(0, 2) + "/" + val.slice(2, 4);
              }

              if (val.length === 5) {
                const [mesStr, anioStr] = val.split("/");
                const mes = parseInt(mesStr, 10);
                const anio = parseInt("20" + anioStr, 10);
                const hoy = new Date();
                const mesActual = hoy.getMonth() + 1;
                const anioActual = hoy.getFullYear();

                if (mes < 1 || mes > 12) {
                  alert("Mes inválido");
                  return;
                }

                if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
                  alert("La tarjeta está vencida");
                  return;
                }
              }

              setTarjeta({ ...tarjeta, vencimiento: val });
            }}
          />

          <input
            type="text"
            placeholder="CVV"
            maxLength={4}
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
            maxLength={50}
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
    </div>
  );
};

export default MetodoPago;