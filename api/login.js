import { supabase } from "../utils/supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(401).json({ error: 'Email o contraseña incorrectos' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: data });
  } catch (err) {
    console.error('Error en /api/login:', err);
    res.status(500).json({ error: 'Error en login' });
  }
}
