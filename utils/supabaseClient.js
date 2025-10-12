import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// 🔹 Cargar variables de entorno antes de todo
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// 🔹 Verificación de variables
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ No se encontraron las variables de entorno de Supabase");
  console.log("SUPABASE_URL:", supabaseUrl);
  console.log("SUPABASE_SERVICE_KEY:", supabaseKey ? "OK" : "MISSING");
  throw new Error("Faltan variables de entorno para Supabase");
}

/**
 * @typedef {Object} Users
 * @property {number} UserId
 * @property {string} Name
 * @property {number} [DNI]
 * @property {string} Email
 * @property {string} Password
 * @property {string} [Address]
 * @property {string} [Phone]
 * @property {string} [Role]
 */

/**
 * @typedef {Object} Product
 * @property {number} ProductId
 * @property {string} ProductName
 * @property {number} Price
 * @property {string} [Type]
 * @property {string} [Image]
 */

/**
 * @typedef {Object} Orders
 * @property {number} OrderId
 * @property {number} UserId
 * @property {string} ShippingAddress
 * @property {number} Total
 * @property {string} OrderDate
 */

/**
 * @typedef {Object} OrderItems
 * @property {number} OrderItemId
 * @property {number} OrderId
 * @property {number} ProductId
 * @property {number} Quantity
 * @property {number} ItemPrice
 */

// 🔹 Export único
export const supabase = createClient(supabaseUrl, supabaseKey);