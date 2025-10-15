import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Registro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const registrar = async () => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    alert("⚠️ Por favor ingresá un email válido!");
    return;
  }
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    alert("⚠️ Tu contraseña es insegura! Mínimo 6 caracteres, agrega letras y números!");
    return;
  }
  if (!email || !password || !passwordRepeat) {
    alert("⚠️ Todos los campos son obligatorios!");
    return;
  }
  if (password !== passwordRepeat) {
    alert("⚠️ Las contraseñas no coinciden!");
    return;
  }

try {
  const response = await fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, role: "cliente" })
  });

  const data = await response.json();

  if (!response.ok) {
    alert("Usuario creado con éxito 🛍️!");
    navigate("/");
    return;
  }

  if (data.user) {
    localStorage.setItem("usuario", JSON.stringify(data.user)); //REVISEN ACA!!!
    console.log("✅ Usuario guardado en localStorage:", data.user);
  }

  if (!data || data.length === 0) {
    console.warn("⚠️ Insert realizado pero sin devolver datos");
    alert("Usuario registrado correctamente ✅");
    return;
  }


  alert("✅ Usuario insertado correctamente");
  } catch (err) {
    console.error("❌ Error inesperado:", err);
    alert("⚠️ Ocurrió un error al registrarte.");
  }
  };

  return (
    <main className="inicio">
      <p className="font titulo">Registrate</p>
      <p className="font subtitulo">¿Ya tenés una cuenta?</p>
      <Link to="/login">
        <p className="font subtitulo">Inicia Sesión</p>
      </Link>
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
        <button type="button" onClick={togglePassword}>{showPassword ? "ꗃ" : "👁"}</button>

        <label className="font texto">Repetir contraseña:</label>
        <input
          type={showPassword ? "text" : "password"}
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
          className="texto"
        />
        <button type="button" onClick={togglePassword}>{showPassword ? "ꗃ" : "👁"}</button>
      </div>

      <button onClick={registrar} className="btn">Registrarme</button>
    </main>
  );
}

export default Registro;