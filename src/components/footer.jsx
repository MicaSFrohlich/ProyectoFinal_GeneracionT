import { useState } from "react";
import "../App.css";

function Footer() {
  const [open, setOpen] = useState({
    ayuda: false,
    contacto: false,
    local: false,
  });

  const toggleSection = (section) => {
    setOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <footer>
      <div className="informacion">
        <h3>⌯⌲ Envios gratis a todo el país </h3>
        <h3>⚲ Pick up gratis en nuestro local</h3>
        <h3>Ropa vendida con amor 𖹭.ᐟ</h3>
      </div>

      <div className="barra-footer">
        <a href="/">
          <img src="/img/LogoFooter.png" alt="" id="logofooter" />
        </a>
      
      <div className="footer-toggles">
        <div className="toggle">
          <button onClick={() => toggleSection("ayuda")}>Ayuda</button>
          {open.ayuda && (
            <div className="toggle-content">
              <p className="toggle-font">🤍 Querés mandar un reclamo? </p>
              <p className="toggle-font"> Comunicate a nuestro mail:</p>
              <p className="toggle-font"> novastyle.reclamos@gmail.com</p>
            </div>
          )}
      </div>

        <div className="toggle">
          <button onClick={() => toggleSection("contacto")}>Contacto</button>
          {open.contacto && (
            <div className="toggle-content">
              <p className="toggle-font">🤍 Email: novastyle@gmail.com</p>
              <p className="toggle-font">🤍 Teléfono: +54 9 11 1234-5678</p>
            </div>
          )}
        </div>

        <div className="toggle">
          <button onClick={() => toggleSection("local")}>Local</button>
          {open.local && (
            <div className="toggle-content">
              <p className="toggle-font">🤍 Dirección: Av. Santa Fe 2015, CABA</p>
              <p className="toggle-font">🤍 Horarios: Lunes a Viernes de 9 a 18hs</p>
              <p className="toggle-font">🤍 Cerca del Ateneo Grand Splendid</p>
            </div>
          )}
        </div>
      </div>
      
        <div className="barra-lado-derecho">
          <p className="font-subtitulo">Nuestras redes</p>
          <div className="link-contactos">
            <a href="https://www.instagram.com/">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2111/2111491.png"
                alt="instagram"
                className="iconos"
              />
            </a>
            <a href="https://www.tiktok.com/">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3046/3046120.png"
                alt="tiktok"
                className="iconos"
              />
            </a>
            <a href="https://www.whatsapp.com/?lang=es_LA">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1384/1384023.png"
                alt="whatsapp"
                className="iconos"
              />
            </a>
            <a href="https://www.gmail.com/">
              <img
                src="https://cdn-icons-png.flaticon.com/128/646/646094.png"
                alt="mail"
                className="iconos"
              />
            </a>
          </div>
        </div>
          
      </div>

    </footer>
  );
}

export default Footer;