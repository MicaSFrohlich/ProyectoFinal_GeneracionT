import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const registrar = () => {
    if (password !== passwordRepeat) {
      alert("⚠️ Las contraseñas no coinciden!");
      return;
    }
    alert("🩷 ¡Bienvenido!");
    navigate("/inicio");
  };

  return (
    <main className="inicio">
      <p className="font titulo">Registrate</p>
      <p className="font subtitulo">¿Ya tenés una cuenta?</p>
      <Link to="/login"><p className="font subtitulo">Inicia Sesión</p></Link>
      <hr className="division" />

      <div className="datos">
        <label className="font texto">E-mail:</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </div>

      <div className="datos">
        <label className="font texto">Contraseña:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="texto"
        />
        <button onClick={togglePassword}>{showPassword ? "ꗃ" : "👁"}</button>

        <label className="font texto">Repetir contraseña:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
          className="texto"
        />
        <button onClick={togglePassword}>{showPassword ? "ꗃ" : "👁"}</button>
      </div>

      <button onClick={registrar} className="btn">Registrarme</button>
    </main>
  );
}

export default registro;