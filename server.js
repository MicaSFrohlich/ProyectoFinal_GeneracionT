import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { supabase } from "./utils/supabaseClient.js";
import productosRouter from "./utils/productos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/productos", productosRouter);

//  Productos
app.get("/productos", async (req, res) => {
  try {
    const { data, error } = await supabase.from("product").select("*");
    if (error) throw new Error("Error al obtener productos");
    res.json(data);
  } catch (err) {
    console.error("💥 Error obteniendo productos:", err.message);
    res.status(500).json({ error: "No se pudieron obtener los productos" });
  }
});

//  Registro
app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const { data: existingUser, error: searchError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    if (searchError) throw new Error("Error al verificar el usuario existente");

    if (existingUser) {
      return res.status(500).json({ error: "⚠️ Este email ya tiene una cuenta registrada." });
    }

    const { data, error } = await supabase
      .from("users")
      .insert([{ email, password, role: role || "cliente" }])
      .select()
      .maybeSingle();

    if (error) throw new Error("No se pudo registrar el usuario");

    res.json({ message: "Usuario registrado correctamente", user: data });
  } catch (err) {
    console.error("❌ Error en registro:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//  Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

    if (error) throw new Error("Error interno al iniciar sesión");
    if (!data) return res.status(401).json({ error: "Email o contraseña incorrectos" });

    res.json({ message: "Inicio de sesión exitoso", user: data });
  } catch (err) {
    console.error("💥 Error en login:", err.message);
    res.status(500).json({ error: "No se pudo iniciar sesión" });
  }
});

// Checkout
app.post("/api/checkout", async (req, res) => {
  const { usuario, carrito, shippingaddress, total } = req.body;

  if (!usuario || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos para el checkout" });
  }

  try {

    const { data: existingUser, error: dniError } = await supabase
      .from("users")
      .select("userid, dni")
      .eq("dni", usuario.dni)
      .maybeSingle();

    if (dniError) throw new Error("Error al verificar DNI");
    if (existingUser && existingUser.userid !== usuario.userid) {
      return res.status(400).json({ error: "Este DNI ya está registrado por otro usuario" });
    }

    const { data: updatedUser, error: userError } = await supabase
      .from("users")
      .update({
        name: usuario.name,
        dni: usuario.dni,
        address: usuario.address,
        phone: usuario.phone,
      })
      .eq("userid", usuario.userid)
      .select()
      .maybeSingle();

    if (userError) throw new Error("No se pudo actualizar el usuario");

    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert([{ userid: usuario.userid, shippingaddress, total }])
      .select()
      .maybeSingle();

    if (orderError) throw new Error("No se pudo crear la orden");

    const orderItems = carrito.map((item) => ({
      orderid: newOrder.orderid,
      productid: item.id,
      quantity: item.cantidad,
      itemprice: item.precio,
    }));

    const { error: itemsError } = await supabase
      .from("orderitems")
      .insert(orderItems);

    if (itemsError) throw new Error("No se pudieron registrar los productos de la orden");

    res.json({
      message: "Compra realizada correctamente",
      order: newOrder,
      user: updatedUser,
    });
  } catch (err) {
    console.error("❌ Error en checkout:", err.message);
    res.status(500).json({ error: err.message });
  }
});

//  Servidor
app.get('/', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || '127.0.0.1';

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Servidor backend en http://localhost:${PORT} (bound to ${HOST})`);
  console.log('PID:', process.pid);
});

server.on('error', (err) => {
  console.error('Error al iniciar el servidor:', err && err.stack ? err.stack : err);
  process.exit(1);
});