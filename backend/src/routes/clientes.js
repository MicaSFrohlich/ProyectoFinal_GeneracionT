const express = require('express');
const router = express.Router();

// Ruta para traer todos los productos
router.get('/', (req, res) => {
    const clientes = [
        {    id: 1, nombre: "Daiana", contrasenia: "1234", email: "aylasdaiana06@gmail.com" },
        {    id: 1, nombre: "Micaela", contrasenia: "1234", email: "micaelasf2007@gmail.com" },
        {    id: 1, nombre: "Sofia", contrasenia: "1234", email: "e.sofiac06@gmail.com" }
    ];
    res.json(clientes);
});

// Ruta POST para crear producto
router.post('/', (req, res) => {
  const nuevoCliente = req.body;
  res.json({ mensaje: "El producto se creó correctamente", status:"ok", data: nuevoCliente });
});

// Ruta PUT para actualizar
router.put('/:id', (req,res) => {
    const id = req.params.id;
    const data = req.body;
    res.json({ mensaje: `Cliente ${id} actualizado`, data: data });
});

// Ruta DELETE para eliminar un recurso
router.delete('/:id', (req,res) =>{
    const id = req.params.id;
    res.json({ mensaje: `Cliente ${id} eliminado` });
});

module.exports = router;