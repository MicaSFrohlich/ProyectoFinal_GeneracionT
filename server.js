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
          "role": role || "cliente", // opcional si tenés columna Role
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

const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));