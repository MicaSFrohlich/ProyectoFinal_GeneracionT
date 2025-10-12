const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (re,res)=>{
    res.end("holiwis soy APP!");
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    res.json({mensaje: "El producto se creo correctamente", statud:"ok", data: nuevoProducto});
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});