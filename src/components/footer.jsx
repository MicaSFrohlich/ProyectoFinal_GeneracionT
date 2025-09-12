import "../App.css";

function footer() {
  return (
    <footer>
          <div className="informacion">
            <h3>⌯⌲ Envios gratis a partir de $100.000 </h3>
            <h3> ⚲ Pick up gratis en nuestro local</h3>
            <h3>Ropa vendida con amor 𖹭.ᐟ</h3>
        </div>
      <div className="barra-footer">
        <a href="/"><img src="/img/LogoFooter.png" alt="" id="logofooter" /></a>
        <div className="barra-lado-derecho">
          <p className="font subtitulo">Nuestras redes</p>
          <div className="link-contactos">
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111491.png" alt="" className="iconos" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/3046/3046120.png" alt="" className="iconos" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/1384/1384023.png" alt="" className="iconos" /></a>
            <a href="#"><img src="https://cdn-icons-png.flaticon.com/128/646/646094.png" alt="" className="iconos" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default footer;