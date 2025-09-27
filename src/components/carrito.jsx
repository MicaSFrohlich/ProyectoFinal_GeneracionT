import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./carrito.css";


const Carrito = ({ carrito, eliminarDelCarrito,setCarrito}) => {
  const total = carrito.reduce((acc, item) => acc + item.precio, 0);

  const finalizarCompra = () => {
    alert("La compra se realizó con éxito 🛍️✨!");
    setCarrito([]);
  };

  return (
    <div className="carrito">
      <p className="txt-carrito titulo-carrito">Tu Carrito</p>
      {carrito.length === 0 ? (
        <div className="respuesta">
          <p className="txt-carrito">Aún no agregaste nada a tu carrito</p>
          <Link to="/catalogo">
          <img src="public\img\SeguiComprando_2.png" alt="Ir al carrito" className="HasCompra"/>
          </Link>    
          <p className="txt-carrito">Explorá la colección y encontrá tu próximo favorito</p>
        </div>
      ) : (
        <div>
          <div className="seleccionados">
            {carrito.map((item, index) => (
              <div key={index} className="item-carrito">
                <img src={item.imagen} alt={item.nombre} className="Prenda"/>
                <div>
                  <p className="txt-carrito titulo-prenda">{item.nombre}</p>
                  <p className="txt-carrito txt-prenda">Talle: {item.talle}</p>
                  <p className="txt-carrito txt-prenda">${item.precio}</p>
                </div>
                <button onClick={() => eliminarDelCarrito(item.id)} className="btn-eliminar">Eliminar</button>
              </div>
            ))}
          </div>
          <div className="final">
            <p className="txt-carrito">Total: ${total}</p>
          <Link to="/metodoPago" state={{ total }}>
            <button className="btn-comprar-final">Finalizar Compra</button>
          </Link>
          </div>

        </div>
      )}
    </div>
  );
};

export default Carrito;
