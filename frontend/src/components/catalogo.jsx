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
        const response = await fetch("http://localhost:3000/productos");
        if (!response.ok) throw new Error("Error al obtener productos");

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Los datos recibidos no son un array");

        setProductos(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
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
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="catalogo">
      <div className="productos">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.productid}
            className="producto"
            onClick={() => handleClick(producto)}
          >
            <img
              src={producto.image}
              alt={producto.productname}
              className="imagen-producto"
            />
            <p className="nombre fuente">{producto.productname}</p>
            <p className="fuente">${producto.price}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {productoSeleccionado && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <button className="cerrar" onClick={cerrarModal}>
              ✖
            </button>
            <img
              src={productoSeleccionado.image}
              alt={productoSeleccionado.productname}
              className="modal-imagen"
            />
            <div className="detalle-producto">
              <h2>{productoSeleccionado.productname}</h2>
              <p>
                <strong>Tipo:</strong> {productoSeleccionado.type}
              </p>
              <p>
                <strong>Precio:</strong> ${productoSeleccionado.price}
              </p>

              <div className="selector-talles">
                <label htmlFor="talle">Talle:</label>
                <select
                  id="talle"
                  value={talleSeleccionado}
                  onChange={(e) => setTalleSeleccionado(e.target.value)}
                >
                  <option value="" disabled>
                    Elegí
                  </option>
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
                  onChange={(e) =>
                    setCantidadSeleccionada(Number(e.target.value))
                  }
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
                  agregarAlCarrito(
                    productoSeleccionado,
                    talleSeleccionado,
                    cantidadSeleccionada
                  );
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
