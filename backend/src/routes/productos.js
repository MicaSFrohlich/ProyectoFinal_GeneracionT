// backend/src/routes/productos.js
const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

console.log("📦 Cargando rutas de productos...");

// Configuración de Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: variables de entorno de Supabase no encontradas.");
} else {
console.log('URL Supabase:', supabaseUrl);
console.log('Key Supabase:', supabaseKey ? '✅ OK' : '❌ MISSING');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Ruta GET para traer todos los productos
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase.from('product').select('*');
        if (error) {
            console.error("❌ Error en Supabase:", error);
            return res.status(500).json({ error: error.message }); // <- aquí aparecería
        }

        console.log("Productos:", data); // Ver si realmente devuelve algo
        res.json(data);
    } catch (err) {
        console.error("💥 Error en try/catch:", err);
        res.status(500).json({ error: 'Error al traer productos' });
    }
});
module.exports = router;
