import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;


let supabaseClient = null;
if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("⚠️ Variables de Supabase no encontradas. Usando modo mock para desarrollo.");

  const MOCK_PRODUCTS = [];

  function builderFor(table) {
    const op = { selectArg: null, insertArg: null, updateArg: null, eqFilters: [] };
    const builder = {
      select(arg) { op.selectArg = arg; return builder; },
      insert(arg) { op.insertArg = arg; return builder; },
      update(arg) { op.updateArg = arg; return builder; },
      eq(field, value) { op.eqFilters.push({ field, value }); return builder; },
      async maybeSingle() {
        if (table === 'product') return { data: MOCK_PRODUCTS[0] || null, error: null };
        if (table === 'users') return { data: null, error: null };
        return { data: null, error: null };
      },
      async then(onFulfilled, onRejected) {
        try {
          if (table === 'product') {
            const result = { data: MOCK_PRODUCTS, error: null };
            return onFulfilled ? onFulfilled(result) : result;
          }
          return onFulfilled ? onFulfilled({ data: null, error: null }) : { data: null, error: null };
        } catch (e) {
          return onRejected ? onRejected(e) : Promise.reject(e);
        }
      }
    };
    return builder;
  }

  supabaseClient = {
    from(table) {
      return builderFor(table);
    }
  };
}

export const supabase = supabaseClient;
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