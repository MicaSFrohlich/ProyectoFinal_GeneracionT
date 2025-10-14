import express from "express";
import { supabase } from "./supabaseClient.js";

console.log("📦 Cargando rutas de productos...");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("product").select("*");

    if (error) {
      console.error("❌ Error al obtener productos:", error.message);
      return res.status(500).json({ error: error.message });
    }

    console.log(`✅ Productos obtenidos: ${data.length}`);
    res.json(data);
  } catch (err) {
    console.error("💥 Error inesperado:", err.message);
    res.status(500).json({ error: "Error al obtener productos." });
  }
});

export default router;