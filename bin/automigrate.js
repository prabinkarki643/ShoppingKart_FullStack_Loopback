"use strict"
const app = require('../server/server')
const ds = app.datasources.mysqlDS;
var allModels = [
  'Customer',
  "Category",
  "Cart",
  "CartItem",
  "Order",
  "OrderItem",
  "Product",
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  // 'Order',
  // 'Product',
  // 'OrderItem',
  // 'CreditCard'
]
ds.automigrate(allModels,err=>{
  if(err) throw err;
  console.log("models synced! with automigrate");
  ds.disconnect();
  process.exit();
})
