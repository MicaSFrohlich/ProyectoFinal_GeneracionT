import React from "react";
import { Link } from "react-router-dom";
import "./carrito.css";

const Carrito = ({ carrito, setCarrito }) => {

  const eliminarDelCarrito = (id, talle) => {
    setCarrito((prev) =>
      prev.filter((item) => !(item.id === id && item.talle === talle))
    );
  };

  const aumentarCantidad = (id, talle) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id && item.talle === talle
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const disminuirCantidad = (id, talle) => {
    setCarrito((prev) =>
      prev
        .map((item) =>
          item.id === id && item.talle === talle
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const finalizarCompra = () => {
    alert("Llena tus datos para finalizar la compra ✨!");
    setCarrito([]);
  };

  return (
    <div className="carrito">
      <p className="txt-carrito titulo-carrito">Tu Carrito</p>

      {carrito.length === 0 ? (
        <div className="respuesta">
          <p className="txt-carrito">Aún no agregaste nada a tu carrito</p>
          <Link to="/catalogo">
            <img
              src="public/img/SeguiComprando_2.png"
              alt="Seguir comprando"
              className="HasCompra"
            />
          </Link>
          <p className="txt-carrito">
            Explorá la colección y encontrá tu próximo favorito
          </p>
        </div>
      ) : (
        <div>
          <div className="seleccionados">
            {carrito.map((item, index) => (
              <div key={`${item.id}-${item.talle}`} className="item-carrito">
                <img src={item.imagen} alt={item.nombre} className="Prenda" />
                <div>
                  <p className="txt-carrito titulo-prenda">{item.nombre}</p>
                  <p className="txt-carrito txt-prenda">Talle: {item.talle}</p>
                  <p className="txt-carrito txt-prenda">
                    ${item.precio} x {item.cantidad} = $
                    {item.precio * item.cantidad}
                  </p>
                </div>

                <div className="acciones-cantidad">
                  <button
                    onClick={() => disminuirCantidad(item.id, item.talle)}
                    className="btn-cantidad"
                  >
                    -
                  </button>
                  <span className="txt-carrito">{item.cantidad}</span>
                  <button
                    onClick={() => aumentarCantidad(item.id, item.talle)}
                    className="btn-cantidad"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => eliminarDelCarrito(item.id, item.talle)}
                  className="btn-eliminar"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          <div className="final">
            <p className="txt-carrito">Total: ${total}</p>
            <Link to="/metodoPago" state={{ total }}>
              <button className="btn-comprar-final" onClick={finalizarCompra}>
                Finalizar Compra
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;