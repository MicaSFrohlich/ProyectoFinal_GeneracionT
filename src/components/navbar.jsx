import { Link } from "react-router-dom";
import "../App.css";

function navbar() {
  return (
    <header>
      <div className="barra">
        <Link to="/"><img src="/img/LogoHeader.png" alt="" className="logo" /></Link>
        <div className="barra-lado-derecho">
          <div className="link-otros-sitios">
            <Link to="#"><p className="texto">Sobre Nosotros</p></Link>
            <Link to="#"><p className="texto">Carrito</p></Link>
            <Link to="#"><p className="texto">Seguí tu envío</p></Link>
            <Link to="#"><p className="texto">Arma tu conjunto</p></Link>
          </div>
          <Link to="/usuario"><img src="/img/contacto.png" alt="" className="logo" /></Link>
        </div>
      </div>
    </header>
  );
}

export default navbar;