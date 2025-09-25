import React from 'react'
import "./sobreNosotros.css"; 

export const sobreNosotros = () => {
  return (
    <div className="main">
      <div >
        <h1 className='titulo'>Sobre Nosotras</h1>
        <div className='contenedor'>
          <p className='nosotros'>
            En Nova Style
            creemos que la moda es una forma de expresión delicada y poderosa a la vez. 
            Nacimos en el corazón del barrio Recoleta como una tienda minimalista, 
            especializada en indumentaria femenina
            que combina feminidad, elegancia y sutileza.
          </p>
          <img src="public\img\local\local_4.png" alt="" className='local'/>
        </div>
        <div className='contenedor'>
          <img src="public\img\local\local_5.png" alt="" className='local'/>
          <p className='nosotros'>
            Hasta hoy, nuestras prendas se comercializan principalmente de manera 
            presencial, pero sentimos la necesidad de expandirnos y conectar con 
            más mujeres en todo el país. Por eso estamos renovando nuestro espacio 
            digital: un sitio moderno, organizado y pensado para que puedas explorar 
            nuestro catálogo, comprar online y recibir la misma calidez de siempre.
          </p>
        </div>
        <div className='contenedor'>
          <p className='nosotros'>
          Nuestro objetivo es simple: que cada clienta viva una experiencia única, 
          práctica y encantadora, desde la elección de la prenda hasta que llega 
          a sus manos. A través de la tecnología, buscamos no solo mejorar la 
          atención y organización, sino también reflejar la esencia de Nova Style: 
           delicadeza, clase y confianza.
          <p>Nova Style – Recoleta</p>
          </p>
          <img src="public\img\local\local_3.jpg" alt="" className='local'/>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}
export default sobreNosotros;
