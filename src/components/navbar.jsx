import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../App.css";

function navbar({ secciones, onSelect, carrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

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
            <Link to="/sobreNosotros"><p className="texto-nav">Sobre Nosotros</p></Link>
            <Link to="/soporte"><p className="texto-nav">Soporte</p></Link>
            <Link to="/carrito"><p className="texto-nav">Carrito ({carrito.length})</p></Link>
            <Link to="/armarConjunto"><p className="texto-nav">Arma tu conjunto</p></Link>
          </div>
          <Link 
              to={usuario ? "#" : "/usuario"} 
              className={`link-usuario ${usuario ? "deshabilitado" : ""}`}
              onClick={(e) => usuario && e.preventDefault()}
            >
              <img src="/img/contacto.png" alt="" className="logo" />
          </Link>
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