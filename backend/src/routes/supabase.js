import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}
export const supabase = createClient(supabaseUrl, supabaseKey);

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