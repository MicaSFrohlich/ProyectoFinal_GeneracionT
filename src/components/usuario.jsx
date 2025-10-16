import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Usuario() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const cerrarSesion = () => {
    sessionStorage.removeItem("usuario");
    alert("Hasta Luego 🤍!");
    setUsuario(null); // Refresca el estado sin recargar
    navigate("/");
  };

  return (
    <main className="inicio">
      {usuario ? (
        <>
          <p className="font titulo">Bienvenido, {usuario.name || usuario.email}</p>
          <p className="font subtitulo">Tu cuenta está activa.</p>

          <div className="datosUsuario">
            <p><strong>Email:</strong> {usuario.email}</p>
            {usuario.dni && <p><strong>DNI:</strong> {usuario.dni}</p>}
            {usuario.address && <p><strong>Dirección:</strong> {usuario.address}</p>}
            {usuario.phone && <p><strong>Teléfono:</strong> {usuario.phone}</p>}
          </div>

          <button className="btn" onClick={cerrarSesion}>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <>
          <p className="font titulo">Bienvenido !</p>
          <p className="font subtitulo">Elegí una opción</p>
          <hr className="division" />

          <div className="container_usuario" style={{ flexDirection: "column", gap: "2vh" }}>
            <Link to="/login">
              <button className="btn">Iniciar Sesión</button>
            </Link>

            <Link to="/registro">
              <button className="btn">Registrarse</button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default Usuario;
