import React, { useState } from "react";
import "./armarConjunto.css";

const categorias = {
  "Parte superior": ["Musculosa", "Blusa", "Remera", "Abrigo", "Vestido"],
  "Parte inferior": ["Pollera", "Short", "Pantalon"],
};

const armarConjunto = ({ carrito }) => {
  const [indexSuperior, setIndexSuperior] = useState(0);
  const [indexInferior, setIndexInferior] = useState(0);
  const [indexVestido, setIndexVestido] = useState(0);

  const prendasPorCategoria = Object.keys(categorias).reduce((acc, cat) => {
    acc[cat] = carrito.filter((item) =>
      categorias[cat].includes(item.tipo)
    );
    return acc;
  }, {});

  const mover = (categoria, direccion) => {
    if (categoria === "Parte superior") {
      const total = prendasPorCategoria["Parte superior"].length;
      setIndexSuperior((prev) =>
        direccion === "izq" ? (prev - 1 + total) % total : (prev + 1) % total
      );
    }
    if (categoria === "Parte inferior") {
      const total = prendasPorCategoria["Parte inferior"].length;
      setIndexInferior((prev) =>
        direccion === "izq" ? (prev - 1 + total) % total : (prev + 1) % total
      );
    }
    if (categoria === "Vestido") {
      const total = prendasPorCategoria["Vestido"].length;
      setIndexVestido((prev) =>
        direccion === "izq" ? (prev - 1 + total) % total : (prev + 1) % total
      );
    }
  };

  const prendaSuperior = prendasPorCategoria["Parte superior"]?.[indexSuperior];
  const prendaInferior = prendasPorCategoria["Parte inferior"]?.[indexInferior];
  const prendaVestido = prendasPorCategoria["Vestido"]?.[indexVestido];

  return (
    <div className="armario">
      <h2 className="font-armario">Outfit Selector</h2>

      {carrito.length === 0 ? (
        <p>No tenés prendas en el carrito aún 🛍️</p>
      ) : (
        <div className="preview-area">
          {(!prendaVestido || !prendasPorCategoria["Vestido"].length) && (
            <div className="slot">
              <button onClick={() => mover("Parte superior", "izq")}>↫</button>
              {prendaSuperior ? (
                <img src={prendaSuperior.imagen} alt={prendaSuperior.nombre} />
              ) : (
                <p>No hay tops</p>
              )}
              <button onClick={() => mover("Parte superior", "der")}>↬</button>
            </div>
          )}

          {(!prendaVestido || !prendasPorCategoria["Vestido"].length) && (
            <div className="slot">
              <button onClick={() => mover("Parte inferior", "izq")}>↫</button>
              {prendaInferior ? (
                <img src={prendaInferior.imagen} alt={prendaInferior.nombre} />
              ) : (
                <p>No hay bottoms</p>
              )}
              <button onClick={() => mover("Parte inferior", "der")}>↬</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default armarConjunto;
