import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "./utils/supabaseClient.js";
import productosRouter from "./utils/productos.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/productos", productosRouter);

const supabaseUrl = "https://ltyappemysyfspwzujpf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx0eWFwcGVteXN5ZnNwd3p1anBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjI3NzIsImV4cCI6MjA3NTMzODc3Mn0.fFjI2h0mjBdJMc97QJavX3PMhuQ1foo-xdPuzNWlUM8";


app.get("/productos", async (req, res) => {
  try {
    const { data, error } = await supabase.from("product").select("*");

    if (error) {
      console.error("❌ Error al obtener productos:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log("✅ Productos obtenidos:", data.length);
    res.json(data);
  } catch (err) {
    console.error("💥 Error inesperado:", err);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

//REGISTRO

app.post("/api/register", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          "email": email,
          "password": password,
          "role": role || "cliente",
        },
      ]);

    if (error) {
        console.error("❌ Error al insertar usuario:", error);
      } else {
        console.log("✅ Usuario insertado correctamente");
      }

        console.log("Usuario registrado correctamente:", data[0]);
        res.json({ message: "Usuario registrado correctamente", user: data[0] });
      } catch (err) {
        console.error("Error en try/catch:", err);
        res.status(500).json({ error: err.message });
      }
    });

  //LOGIN

  app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Intentando iniciar sesión con:", email);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .maybeSingle();

    if (error) {
      console.error("Error al buscar usuario:", error.message);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (!data) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    console.log("✅ Usuario autenticado:", data.email);
    res.json({ message: "Inicio de sesión exitoso", user: data });

  } catch (err) {
    console.error("💥 Error en try/catch:", err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

//CHECKOUT

app.post("/api/checkout", async (req, res) => {
  const { usuario, carrito, shippingaddress, total } = req.body;

  if (!usuario || !carrito || carrito.length === 0) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  try {
    console.log("🟢 Procesando checkout de usuario:", usuario.userid);


    console.log("Actualizando usuario con datos:", usuario);
    const { data: updatedUser, error: userError } = await supabase
      .from("users")
      .update({
        name: usuario.name,
        dni: usuario.dni,
        address: usuario.address,
        phone: usuario.phone
      })
      .eq("userid", usuario.userid)
      .select()
      .maybeSingle();

    if (userError) throw userError;

    console.log("✅ Usuario actualizado:", updatedUser);

    const { data: newOrder, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          userid: usuario.userid,
          shippingaddress,
          total,

        },
      ])
      .select()
      .maybeSingle();

    if (orderError) throw orderError;

    console.log("🧾 Nueva orden creada:", newOrder);

    const orderId = newOrder.orderid;
    const orderItems = carrito.map((item) => ({
      orderid: orderId,
      productid: item.id,
      quantity: item.cantidad,
      itemprice: item.precio,
    }));

    const { error: itemsError } = await supabase
      .from("orderitems")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    console.log("📦 Productos asociados a la orden correctamente.");

    res.json({
      message: "Compra realizada correctamente",
      order: newOrder,
      user: updatedUser,
    });

  } catch (err) {
    console.error("❌ Error en checkout:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});
