import { supabase } from "../utils/supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, role } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Faltan campos' });

  try {
    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .maybeSingle();

    if (searchError) throw searchError;
    if (existingUser) return res.status(400).json({ error: 'Este email ya tiene una cuenta registrada.' });

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, role: role || 'cliente' }])
      .select()
      .maybeSingle();

    if (error) throw error;
    res.status(200).json({ message: 'Usuario registrado correctamente', user: data });
  } catch (err) {
    console.error('Error en /api/register:', err);
    res.status(500).json({ error: err.message || 'Error en registro' });
  }
}
