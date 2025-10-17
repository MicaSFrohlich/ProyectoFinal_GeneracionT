import { supabase } from "../utils/supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { data, error } = await supabase.from('product').select('*');
    if (error) {
      console.error('Error obteniendo productos:', error);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Error inesperado en /api/productos:', err);
    res.status(500).json({ error: 'Error inesperado' });
  }
}
