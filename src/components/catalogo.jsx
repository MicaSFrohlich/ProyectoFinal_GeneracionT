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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  useEffect(() => {
  const fetchProductos = async () => {
    try {
      setLoading(true);

  const base = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001' : '');
  const path = import.meta.env.DEV ? `${base}/productos` : (import.meta.env.VITE_API_URL ? `${base}/productos` : '/api/productos');
      const response = await fetch(path);

      if (!response.ok) {
        const text = await response.clone().text();
        throw new Error(`HTTP ${response.status} ${response.statusText} - ${text.slice(0,300)}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await response.clone().text();
        throw new Error('La API no devolvió JSON. Respuesta: ' + text.slice(0,300));
      }

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error('Los datos recibidos no son un array: ' + JSON.stringify(data).slice(0,300));

      setProductos(data);
    } catch (err) {
      console.error(err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };
  fetchProductos();
}, []);

  const tiposFiltrar = mapaSecciones[seccionSeleccionada] || null;
  const productosFiltrados = tiposFiltrar
    ? productos.filter((p) => tiposFiltrar.includes(p.type))
    : productos;

  const handleClick = (producto) => setProductoSeleccionado(producto);
  const cerrarModal = () => {
    setProductoSeleccionado(null);
    setTalleSeleccionado("");
    setCantidadSeleccionada(1);
  };

  if (error) return <p>Error: {error}</p>;

  if (loading) {
    return (
      <main className="catalogo-cargando">
        <p className="font texto">🤍 Cargando productos...</p>
      </main>
    );
  }

  return (
    <div className="catalogo">
      <div className="productos">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.product_id || producto.productid}
            className="producto"
            onClick={() => handleClick(producto)}
          >
            <img
              src={producto.image || "/placeholder.jpg"}
              alt={producto.product_name || producto.productname}
              className="imagen-producto"
            />
            <p className="nombre fuente">{producto.product_name || producto.productname}</p>
            <p className="fuente">${producto.price}</p>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={cerrarModal}>✖</button>
            <img
              src={productoSeleccionado.image || "/placeholder.jpg"}
              alt={productoSeleccionado.product_name || productoSeleccionado.productname}
              className="modal-imagen"
            />
            <div className="detalle-producto">
              <h2>{productoSeleccionado.product_name || productoSeleccionado.productname}</h2>
              <p><strong>Tipo:</strong> {productoSeleccionado.type}</p>
              <p><strong>Precio:</strong> ${productoSeleccionado.price}</p>

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
                  max="25"
                  value={cantidadSeleccionada}
                  onChange={(e) => {
                    const valor = Number(e.target.value);
                    if (valor > 25) {
                      setCantidadSeleccionada(25);
                    } else if (valor < 1) {
                      setCantidadSeleccionada(1);
                    } else {
                      setCantidadSeleccionada(valor);
                    }
                  }}
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
                    alert("Por favor ingrese una cantidad válida.");
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