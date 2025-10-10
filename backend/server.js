const express = require('express');
const cors = require('cors');
const productosRouter = require('./src/routes/productos');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/productos', productosRouter);

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;

  // ejemplo sin Supabase
  console.log("Datos recibidos:", email, password, role);
  res.json({ message: "Usuario recibido correctamente" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));