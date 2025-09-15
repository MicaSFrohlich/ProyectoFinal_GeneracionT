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
        <h3>⌯⌲ Envios gratis a partir de $100.000 </h3>
        <h3>⚲ Pick up gratis en nuestro local</h3>
        <h3>Ropa vendida con amor 𖹭.ᐟ</h3>
      </div>

      <div className="barra-footer">
        <a href="/">
          <img src="/img/LogoFooter.png" alt="" id="logofooter" />
        </a>
 {/* Secciones desplegables */}
      <div className="footer-toggles">
        <div className="toggle">
          <button onClick={() => toggleSection("ayuda")}>Ayuda</button>
          {open.ayuda && (
            <div className="toggle-content">
              <p>Preguntas frecuentes</p>
              <p>Políticas de devolución</p>
              <p>Guía de talles</p>
            </div>
          )}
        </div>

        <div className="toggle">
          <button onClick={() => toggleSection("contacto")}>Contacto</button>
          {open.contacto && (
            <div className="toggle-content">
              <p>Email: contacto@mitienda.com</p>
              <p>WhatsApp: +54 9 11 1234-5678</p>
              <p>Formulario de contacto</p>
            </div>
          )}
        </div>

        <div className="toggle">
          <button onClick={() => toggleSection("local")}>Local</button>
          {open.local && (
            <div className="toggle-content">
              <p>📍 Dirección: Av. Siempre Viva 123, CABA</p>
              <p>🕒 Horarios: Lunes a Sábado de 10 a 20hs</p>
              <p>🚇 Cerca del subte línea B</p>
            </div>
          )}
        </div>
      </div>
        <div className="barra-lado-derecho">
          <p className="font subtitulo">Nuestras redes</p>
          <div className="link-contactos">
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/128/2111/2111491.png"
                alt="instagram"
                className="iconos"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3046/3046120.png"
                alt="tiktok"
                className="iconos"
              />
            </a>
            <a href="#">
              <img
                src="https://cdn-icons-png.flaticon.com/128/1384/1384023.png"
                alt="youtube"
                className="iconos"
              />
            </a>
            <a href="#">
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
