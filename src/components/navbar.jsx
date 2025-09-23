import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

function navbar({ secciones, onSelect }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  return (
    <header>
      <div className="barra">
        <div className="barra-lado-derecho">
          <button className="menu-btn" onClick={() => setMenuAbierto(!menuAbierto)}>
            ☰ 
          </button>
          <Link to="/"><img src="/img/LogoHeader.png" alt="" id="logoNS" /></Link>
        </div>
        <div className="barra-lado-derecho">
          <div className="link-otros-sitios">
            <Link to="/catalogo"><p className="texto-nav">Catálogo</p></Link>
            <Link to="#"><p className="texto-nav">Sobre Nosotros</p></Link>
            <Link to="#"><p className="texto-nav">Carrito</p></Link>
            <Link to="/seguimiento"><p className="texto-nav">Seguí tu envío</p></Link>
            <Link to="#"><p className="texto-nav">Arma tu conjunto</p></Link>
          </div>
          <Link to="/usuario"><img src="/img/contacto.png" alt="" className="logo" /></Link>
        </div>
      </div>

      <div className={`sidebar ${menuAbierto ? "activo" : ""}`}>
        <button className="cerrar-btn" onClick={() => setMenuAbierto(false)}>
          ×
        </button>
        <ul>
          {secciones.map((seccionSeleccionada) => (
            <li
              key={seccionSeleccionada}
              onClick={() => {
                onSelect(seccionSeleccionada); 
                setMenuAbierto(false);
                navigate(`/catalogo/`);                
              }}
            >
              {seccionSeleccionada}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default navbar;