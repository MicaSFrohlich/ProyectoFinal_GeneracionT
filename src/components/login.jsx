import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const iniciarSesion = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      alert("⚠️ Por favor ingresá un email válido!");
      return;
    }

    if (!password) {
      alert("⚠️ Debes completar todos los campos!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); 

      localStorage.setItem("usuario", JSON.stringify(data.user));
      console.log("Usuario guardado en localStorage:", localStorage.getItem("usuario"));

      if (!response.ok) {
        alert(`❌ ${data.error || "Error al iniciar sesión"}`);
        setLoading(false);
        return;
      }

      alert(`🩷 ¡Bienvenido ${data.user.email}!`);

      navigate("/");
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      alert("❌ Ocurrió un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        />
      </div>

      <div className="datos">
        <label className="font texto">Contraseña:</label>
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="texto"
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePassword}
            disabled={loading}
            className="ver-btn"
          >
            {showPassword ? "ꗃ" : "👁"}
          </button>
        </div>
      </div>

      <button
        onClick={iniciarSesion}
        className="btn"
        disabled={loading}
      >
        {loading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </main>
  );
}

export default Login;
