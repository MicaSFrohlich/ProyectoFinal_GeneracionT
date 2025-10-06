const express = require('express');
require('dotenv').config();
const cors = require('cors');
const productosRouter = require('./src/routes/productos');
const clientesRouter = require('./src/routes/clientes');

const app = express();

app.use(express.json());
app.use(cors());

// acá le digo que todas las rutas dentro de productos van a arrancar con /productos
app.use('/productos', productosRouter);
app.use('/clientes', clientesRouter);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000/");
});
