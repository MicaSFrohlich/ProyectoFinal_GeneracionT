const { createClient } = require("@supabase/supabase-js");
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Faltan las variables de entorno de Supabase");
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

module.exports = supabase;