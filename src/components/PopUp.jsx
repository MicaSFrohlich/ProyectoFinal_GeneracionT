import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PopUp.css"; 

const PopUp = () => {
  const [mostrar, setMostrar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (location.pathname === "/" && !usuario) {
      setMostrar(true);
    } else {
      setMostrar(false);
    }
  }, [location]);

  if (!mostrar) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-titulo">Bienvenido a NovaStyle</h2>
        <p className="popup-text">
          Nos alegra tenerte aquí 🤍<br />
          Antes de continuar,{" "} 
          <strong>iniciá sesión o registrate</strong> para guardar tus datos y tus pedidos.
        </p>
        <p className="popup-note">
          Si continuás sin iniciar sesión, tu carrito se perderá al salir del sitio.
        </p>

        <div className="popup-buttons">
          <button className="btn-iniciar" onClick={() => navigate("/login")}>
            Iniciar sesión
          </button>
          <button className="btn-continuar" onClick={() => setMostrar(false)}>
            Continuar sin iniciar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
