import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login({ setCarrito }) { // <-- recibe la función para actualizar el estado del carrito
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

const iniciarSesion = async () => {
  if (!email.trim() || !password) return alert("Completa todos los campos");

  setLoading(true);
  try {
    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`❌ ${data.error || "Error al iniciar sesión"}`);
      setLoading(false);
      return;
    }

    const usuario = data.user;
    const usuarioId = usuario?.userid;
    if (!usuarioId) throw new Error("No se recibió un ID de usuario válido");

    // Guardamos usuario
    sessionStorage.setItem("usuario", JSON.stringify(usuario));

    // Fusionar carrito temporal con el del usuario
    const carritoTemporal = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoUsuario = JSON.parse(localStorage.getItem(`carrito_${usuarioId}`)) || [];

    const fusionado = [...carritoUsuario];

    carritoTemporal.forEach(item => {
      const existe = fusionado.find(i => i.id === item.id && i.talle === item.talle);
      if (existe) existe.cantidad += item.cantidad;
      else fusionado.push(item);
    });

    // Guardar en localStorage del usuario y limpiar temporal
    localStorage.setItem(`carrito_${usuarioId}`, JSON.stringify(fusionado));
    localStorage.removeItem("carrito");

    // Actualizar estado React
    if (setCarrito) setCarrito(fusionado);

    alert(`🤍 ¡Bienvenido ${usuario.email}!`);
    navigate("/");

  } catch (err) {
    console.error(err);
    alert("❌ Error al iniciar sesión");
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