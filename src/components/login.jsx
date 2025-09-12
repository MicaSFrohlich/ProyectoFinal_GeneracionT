import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const iniciarSesion = () => {
    if (!email || !password) {
      alert("⚠️ Debes completar todos los campos!");
      return;
    }
    alert("🩷 ¡Bienvenido!");
    navigate("/home");
  };

  return (
    <main className="inicio">
      <p className="font titulo">Inicia Sesión</p>
      <p className="font subtitulo">¿No tenés una cuenta?</p>
      <Link to="/registro">
        <p className="font subtitulo">Registrate</p>
      </Link>

      <hr className="division" />

      <div className="datos">
        <label className="font texto">E-mail:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="datos">
        <label className="font texto">Contraseña:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="texto"
        />
        <button onClick={togglePassword}>{showPassword ? "ꗃ" : "👁"}</button>
      </div>

      <button onClick={iniciarSesion} className="btn">
        Iniciar Sesión
      </button>
    </main>
  );
}

export default login;