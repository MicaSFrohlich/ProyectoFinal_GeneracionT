import express from "express";
import { supabase } from "./supabaseClient.js"; // ya lo tenés configurado

console.log("🔑 Cargando ruta de login...");

const router = express.Router();

// POST /api/login → verifica las credenciales
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
      return res.status(400).json({ error: "Debes completar todos los campos" });
    }

    // Buscar el usuario en la tabla "users" (ajustá el nombre si es distinto)
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single(); // esperamos un solo usuario

    if (error) {
      console.error("❌ Error en Supabase:", error.message);
      return res.status(500).json({ error: "Error al buscar usuario" });
    }

    // Si no existe el usuario
    if (!users) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Comparar contraseña
    // ⚠️ Esto asume que las contraseñas están guardadas en texto plano (solo para pruebas)
    // Si las guardás encriptadas con bcrypt, hay que usar bcrypt.compare()
    if (users.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Si todo está bien
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: users.id,
        email: users.email,
        name: users.name || "",
      },
    });
  } catch (err) {
    console.error("💥 Error inesperado en login:", err.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
