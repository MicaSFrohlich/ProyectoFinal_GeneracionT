import React, { useState, useEffect } from "react";
import "./catalogo.css";

const mapaSecciones = {
  "Remeras / Blusas / Musculosas": ["Musculosa", "Blusa", "Remera"],
  "Shorts / Polleras": ["Short", "Pollera"],
  "Pantalones": ["Pantalon"], 
  "Vestidos": ["Vestido"],
  "Abrigos": ["Abrigo"],
};

const Catalogo = ({ seccionSeleccionada, agregarAlCarrito }) => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("ERROR AL TRAER PRODUCTOS", err));
  }, []);

  const tiposFiltrar = mapaSecciones[seccionSeleccionada] || null;
  const productosFiltrados = tiposFiltrar
    ? productos.filter((p) => tiposFiltrar.includes(p.tipo))
    : productos;

  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const handleClick = (producto) => {
    setProductoSeleccionado(producto);
  };

  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setTalleSeleccionado("");
  };

  return (
    <div className="catalogo">
      <div className="productos">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="producto"
            onClick={() => handleClick(producto)}
          >
            <img src={producto.imagen} alt={producto.nombre} />
            <p className="nombre fuente">{producto.nombre}</p>
            <p className="fuente">${producto.precio}</p>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={cerrarModal}>✖</button>
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
                <select
                  id="talle"
                  value={talleSeleccionado}
                  onChange={(e) => setTalleSeleccionado(e.target.value)}
                >
                  <option value="" disabled>Elegí</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>

              <div className="selector-cantidad">
                <label htmlFor="cantidad">Cantidad:</label>
                <input
                  id="cantidad"
                  type="number"
                  min="1"
                  value={cantidadSeleccionada}
                  onChange={(e) => setCantidadSeleccionada(Number(e.target.value))}
                />
              </div>

              <button
                className="btn-comprar"
                onClick={() => {
                  if (!talleSeleccionado) {
                    alert("Por favor selecciona un talle.");
                    return;
                  }
                  if (cantidadSeleccionada <= 0) {
                    alert("Por favor ingrese una cantidad válida");
                    return;
                  }
                  agregarAlCarrito(productoSeleccionado, talleSeleccionado, cantidadSeleccionada);
                  cerrarModal();
                }}
              >
                Añadir al carrito !
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalogo;
