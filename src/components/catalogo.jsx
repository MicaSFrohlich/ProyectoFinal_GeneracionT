import React from "react";
import "./catalogo.css";

const catalogo = [
  {
    seccion: "Ropa",
    productos: [
      { id: 1, nombre: "Remera", precio: 1500, imagen: "/img/productos/top_botones.jpg" },
      { id: 2, nombre: "Pantalón", precio: 2500, imagen: "/img/productos/top_rosa.jpg" },
      { id: 3, nombre: "Remera", precio: 1500, imagen: "/img/productos/top_turquesa.jpg" },
      { id: 4, nombre: "Pantalón", precio: 2500, imagen: "/img/productos/pollera_brillos.jpg" },
      { id: 5, nombre: "Remera", precio: 1500, imagen: "/img/productos/pollera_coqueta.jpg" },
      { id: 6, nombre: "Pantalón", precio: 2500, imagen: "/img/productos/short_jean.jpg" },
      { id: 7, nombre: "Remera", precio: 1500, imagen: "/img/productos/vestido_negro.jpg"},
      { id: 8, nombre: "Pantalón", precio: 2500, imagen: "/img/productos/vestido_argolla.jpg"},
      { id: 1, nombre: "Remera", precio: 1500, imagen: "/img/productos/vestido_blanco.jpg"}
    ],
  }
];

const Catalogo = () => {
  return (
    <div className="catalogo">
      {catalogo.map((seccion) => (
        <div key={seccion.seccion} className="seccion">
          <h2>{seccion.seccion}</h2>
          <div className="productos">
            {seccion.productos.map((producto) => (
              <div key={producto.id} className="producto">
                <img src={producto.imagen} alt={producto.nombre} />
                <p>{producto.nombre}</p>
                <p>${producto.precio}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default catalogo;