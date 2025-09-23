import React, { useState } from "react";
import "./catalogo.css";
const productos = [
  {
    seccion: "Ropa",
    productos: [
      { id: 1, tipo: "Musculosa", nombre: "Musculosa Valery", precio: 7500.0, imagen: "/img/productos/top_botones.png" },
      { id: 2, tipo: "Blusa", nombre: "Blusa Lover", precio: 6500.0, imagen: "/img/productos/top_rosa.png" },
      { id: 3, tipo: "Blusa", nombre: "Blusa Greedy", precio: 6000.0, imagen: "/img/productos/top_turquesa.png" },
      { id: 4, tipo: "Pollera", nombre: "Pollera Supernat", precio: 9000.0, imagen: "/img/productos/pollera_brillos.png" },
      { id: 5, tipo: "Pollera", nombre: "Pollera Obvious", precio: 7500.0, imagen: "/img/productos/pollera_coqueta.png" },
      { id: 6, tipo: "Short", nombre: "Short Problem", precio: 15000.0, imagen: "/img/productos/short_jean.png" },
      { id: 7, tipo: "Vestido", nombre: "Vestido Mistake", precio: 23500.0, imagen: "/img/productos/vestido_negro.png" },
      { id: 8, tipo: "Vestido", nombre: "Vestido Hopeless", precio: 19000.0, imagen: "/img/productos/vestido_argolla.png" },
      { id: 9, tipo: "Vestido", nombre: "Vestido Romantic", precio: 21500.0, imagen: "/img/productos/vestido_blanco.png" },
      { id: 10, tipo: "Pantalon", nombre: "Pantalon Diver", precio: 42000.0, imagen: "/img/productos/pantalon_rosa.jpg" },
      { id: 11, tipo: "Pantalon", nombre: "Pantalon Sunny", precio: 47000.0, imagen: "/img/productos/pantalon_amarillo.jpg" },
      { id: 12, tipo: "Pantalon", nombre: "Pantalon Classy", precio: 45500.0, imagen: "/img/productos/pantalon_classy.jpg" },
      { id: 13, tipo: "Abrigo", nombre: "Sweater Lola", precio: 17000.0, imagen: "/img/productos/sweater_rosa.jpg" },
      { id: 14, tipo: "Abrigo", nombre: "Cardigan Folklore", precio: 20500.0, imagen: "/img/productos/cardigan.jpg" },
      { id: 15, tipo: "Abrigo", nombre: "Abrigo Money", precio: 53000.0, imagen: "/img/productos/abrigo_blanco.jpg" },
      { id: 16, tipo: "Abrigo", nombre: "Abrigo Expensive", precio: 60700.0, imagen: "/img/productos/abrigo_broches.jpg" },
      { id: 17, tipo: "Abrigo", nombre: "Saco Shadows", precio: 59000.0, imagen: "/img/productos/saco_negro.jpg" },
    ],
  },
];
const mapaSecciones = {
    "Remeras / Blusas / Musculosas": ["Musculosa", "Blusa", "Remera"],
    "Shorts / Polleras": ["Short", "Pollera"],
    "Pantalones": ["Pantalon"], 
    "Vestidos": ["Vestido"],
    "Abrigos": ["Abrigo"],
};



const Catalogo = ({ seccionSeleccionada }) => {
  const tiposFiltrar = mapaSecciones[seccionSeleccionada] || null;
  const [productoSeleccionado, setProductoSeleccionado] = useState(null) || null;

  const handleClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
  };

  return (
    <div className="catalogo">
            {productos.map((seccionObj) => {
        const productosAMostrar = tiposFiltrar
          ? seccionObj.productos.filter((p) => tiposFiltrar.includes(p.tipo))
          : seccionObj.productos;

        if (productosAMostrar.length === 0);

        return (
          <div key={seccionObj.seccion} className="seccion">
            <div className="productos">
              {productosAMostrar.map((producto) => (
                <div
                  key={producto.id}
                  className="producto"
                  onClick={() => handleClick?.(producto)}
                >
                  <img src={producto.imagen} alt={producto.nombre} />
                  <p className="nombre fuente">{producto.nombre}</p>
                  <p className="fuente">${producto.precio}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
      {/* Modal de detalle */}
      {productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={cerrarModal}>
              ✖
            </button>
            <img
              src={productoSeleccionado.imagen}
              alt={productoSeleccionado.nombre}
              className="modal-imagen"
            />
              <div className="detalle-producto"> 
                <h2>{productoSeleccionado.nombre}</h2>
                <p><strong>Tipo:</strong> {productoSeleccionado.tipo}</p>
                <p><strong>Precio:</strong> ${productoSeleccionado.precio}</p>

                  <div className="selector-talles">
                    <label htmlFor="talle">Talle:</label>
                    <select id="talle" name="talle" defaultValue="">
                        <option value="" disabled>Selecciona! </option>
                        <option value="XS">XS</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                    </select>
                  </div>
                <button className="btn-comprar">Añadir al carrito !</button>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default Catalogo;