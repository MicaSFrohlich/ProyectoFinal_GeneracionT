import { Link } from "react-router-dom";
import "../App.css";

function usuario() {
  return (
    <main className="inicio">
      <p className="font titulo">Bienvenido</p>
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
    </main>
  );
}

export default usuario;