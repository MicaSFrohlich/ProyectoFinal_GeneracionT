import React from "react";
import "./catalogo.css";

const productos = [
  {
    seccion: "Ropa",
    productos: [
      { id: 1, tipo: "Top", nombre: "Musculosa Valery", precio: 1500.00, imagen: "/img/productos/top_botones.png" },
      { id: 2, tipo: "Top", nombre: "Blusa Lover", precio: 2500.00, imagen: "/img/productos/top_rosa.png" },
      { id: 3, tipo: "Top", nombre: "Blusa Greedy", precio: 1500.00, imagen: "/img/productos/top_turquesa.png" },
      { id: 4, tipo: "Buttom", nombre: "Pollera Supernat", precio: 2500.00, imagen: "/img/productos/pollera_brillos.png" },
      { id: 5, tipo: "Buttom", nombre: "Pollera Obvious", precio: 1500.00, imagen: "/img/productos/pollera_coqueta.png" },
      { id: 6, tipo: "Buttom", nombre: "Short Problem", precio: 2500.00, imagen: "/img/productos/short_jean.png" },
      { id: 7, tipo: "Dress", nombre: "Vestido Mistake", precio: 1500.00, imagen: "/img/productos/vestido_negro.png"},
      { id: 8, tipo: "Dress", nombre: "Vestido Hopeless", precio: 2500.00, imagen: "/img/productos/vestido_argolla.png"},
      { id: 1, tipo: "Dress", nombre: "Vestido Romantic", precio: 1500.00, imagen: "/img/productos/vestido_blanco.png"}
    ],
  }
];

const catalogo = () => {
  return (
    <div className="catalogo">
      {productos.map((seccion) => (
        <div key={seccion.seccion} className="seccion">
          <div className="productos">
            {seccion.productos.map((producto) => (
              <div key={producto.id} className="producto">
                <img src={producto.imagen} alt={producto.nombre} />
                <p className="nombre fuente">{producto.nombre}</p>
                <p className="fuente">${producto.precio}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default catalogo;