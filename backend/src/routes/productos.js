const express = require('express');
const router = express.Router();

// Ruta para traer todos los productos
router.get('/', (req, res) => {
    const productos = [
    { id: 1, tipo: "Musculosa", nombre: "Musculosa Valery", precio: 7500.0, imagen: "/img/productos/top_botones.png" },
    { id: 2, tipo: "Musculosa", nombre: "Musculosa Cottage", precio: 9000.0, imagen: "/img/productos/musculosa_cottage.png" },
    { id: 3, tipo: "Musculosa", nombre: "Musculosa Guilty", precio: 6500.0, imagen: "/img/productos/musculosa_guilty.png" },
    { id: 4, tipo: "Musculosa", nombre: "Musculosa Louise", precio: 10500.0, imagen: "/img/productos/musculosa_louise.png" },
    { id: 5, tipo: "Blusa", nombre: "Blusa Lover", precio: 8500.0, imagen: "/img/productos/top_rosa.png" },
    { id: 6, tipo: "Blusa", nombre: "Blusa Greedy", precio: 8500.0, imagen: "/img/productos/top_turquesa.png" },
    { id: 7, tipo: "Pollera", nombre: "Pollera Supernat", precio: 9000.0, imagen: "/img/productos/pollera_brillos.png" },
    { id: 8, tipo: "Pollera", nombre: "Pollera Obvious", precio: 7500.0, imagen: "/img/productos/pollera_coqueta.png" },
    { id: 9, tipo: "Pollera", nombre: "Pollera Cassandra", precio: 10000.0, imagen: "/img/productos/pollera_cassandra.png" },
    { id: 10, tipo: "Pollera", nombre: "Pollera Cottage", precio: 13500.0, imagen: "/img/productos/pollera_cottage.png" },
    { id: 11, tipo: "Pollera", nombre: "Pollera Cornelia", precio: 8800.0, imagen: "/img/productos/pollera_cornelia.png" },
    { id: 12, tipo: "Short", nombre: "Short Problem", precio: 15000.0, imagen: "/img/productos/short_jean.png" },
    { id: 13, tipo: "Vestido", nombre: "Vestido Mistake", precio: 23500.0, imagen: "/img/productos/vestido_negro.png" },
    { id: 14, tipo: "Vestido", nombre: "Vestido Hopeless", precio: 19000.0, imagen: "/img/productos/vestido_argolla.png" },
    { id: 15, tipo: "Vestido", nombre: "Vestido Romantic", precio: 21500.0, imagen: "/img/productos/vestido_blanco.png" },
    { id: 16, tipo: "Vestido", nombre: "Vestido Amelia", precio: 23500.0, imagen: "/img/productos/vestido_amelia.png" },
    { id: 17, tipo: "Vestido", nombre: "Vestido Grecia", precio: 19000.0, imagen: "/img/productos/vestido_grecia.png" },
    { id: 18, tipo: "Vestido", nombre: "Vestido Lily", precio: 21500.0, imagen: "/img/productos/vestido_lily.png" },
    { id: 19, tipo: "Pantalon", nombre: "Pantalon Diver", precio: 42000.0, imagen: "/img/productos/pantalon_rosa.png" },
    { id: 20, tipo: "Pantalon", nombre: "Pantalon Comfy", precio: 20000.0, imagen: "/img/productos/pantalon_comfy.png" },
    { id: 21, tipo: "Pantalon", nombre: "Pantalon Sunny", precio: 47000.0, imagen: "/img/productos/pantalon_amarillo.png" },
    { id: 22, tipo: "Pantalon", nombre: "Pantalon Classy", precio: 45500.0, imagen: "/img/productos/pantalon_classy.png" },
    { id: 23, tipo: "Pantalon", nombre: "Pantalon Jean", precio: 22500.0, imagen: "/img/productos/pantalon_jean.png" },
    { id: 24, tipo: "Pantalon", nombre: "Pantalon Sky", precio: 21500.0, imagen: "/img/productos/pantalon_sky.png" },
    { id: 26, tipo: "Abrigo", nombre: "Sweater Lola", precio: 17000.0, imagen: "/img/productos/sweater_rosa.png" },
    { id: 27, tipo: "Abrigo", nombre: "Cardigan Folklore", precio: 20500.0, imagen: "/img/productos/cardigan.png" },
    { id: 28, tipo: "Abrigo", nombre: "Abrigo Money", precio: 53000.0, imagen: "/img/productos/abrigo_blanco.png" },
    { id: 29, tipo: "Abrigo", nombre: "Abrigo Expensive", precio: 60700.0, imagen: "/img/productos/abrigo_broches.png" },
    { id: 30, tipo: "Abrigo", nombre: "Saco Shadows", precio: 59000.0, imagen: "/img/productos/saco_negro.png" },
    { id: 31, tipo: "Abrigo", nombre: "Saco Clouds", precio: 34000.0, imagen: "/img/productos/abrigo_clouds.png" },
    ];
    res.json(productos);
});

// Ruta POST para crear producto
router.post('/', (req, res) => {
  const nuevoProducto = req.body;
  res.json({ mensaje: "El producto se creó correctamente", status:"ok", data: nuevoProducto });
});

// Ruta PUT para actualizar
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const data = req.body;
    res.json({ mensaje: `Producto ${id} actualizado`, data: data });
});

// Ruta DELETE para eliminar un recurso
router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    res.json({ mensaje: `Producto ${id} eliminado` });
});

module.exports = router;
