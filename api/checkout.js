import { supabase } from "../utils/supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { usuario, carrito, shippingaddress, total } = req.body || {};
  if (!usuario || !carrito || carrito.length === 0) return res.status(400).json({ error: 'Datos incompletos para el checkout' });

  try {
    const { data: existingUser, error: dniError } = await supabase
      .from('users')
      .select('userid, dni')
      .eq('dni', usuario.dni)
      .maybeSingle();

    if (dniError) throw dniError;
    if (existingUser && existingUser.userid !== usuario.userid) {
      return res.status(400).json({ error: 'Este DNI ya está registrado por otro usuario' });
    }

    const { data: updatedUser, error: userError } = await supabase
      .from('users')
      .update({
        name: usuario.name,
        dni: usuario.dni,
        address: usuario.address,
        phone: usuario.phone,
      })
      .eq('userid', usuario.userid)
      .select()
      .maybeSingle();

    if (userError) throw userError;

    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert([{ userid: usuario.userid, shippingaddress, total }])
      .select()
      .maybeSingle();

    if (orderError) throw orderError;

    const orderItems = carrito.map((item) => ({
      orderid: newOrder.orderid,
      productid: item.id,
      quantity: item.cantidad,
      itemprice: item.precio,
    }));

    const { error: itemsError } = await supabase
      .from('orderitems')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    res.status(200).json({ message: 'Compra realizada correctamente', order: newOrder, user: updatedUser });
  } catch (err) {
    console.error('Error en /api/checkout:', err);
    res.status(500).json({ error: err.message || 'Error en checkout' });
  }
}
