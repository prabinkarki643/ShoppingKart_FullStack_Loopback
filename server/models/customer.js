'use strict';
module.exports = function(Customer) {

//registerRemoteMethod
Customer.placeOrder = function (id,options,cb) {
  var currentCustomer,cartProducts,fetchedCart
  Customer.findOne({where:{id:id}})
  .then(customer=>{
    if(!customer){
      throw new Error("can't find user of specific email id")
    }
  currentCustomer=customer
   return customer.carts.get()
    .then(cart=>{
      fetchedCart = cart
      return cart.products.find()
    })
    .then(products=>{
      if (!products||products.length<=0) {
        const error = new Error('Empty products in cart!!!');
        error.statusCode = 401;
        throw error;
      }
      cartProducts=products
      return currentCustomer.orders.create()
     })
      .then(order=>{
      return Promise.all(cartProducts.map((product,index)=>order.orderItems.create({orderId:order.id,productId:product.id})))
      })
      .then(result=>{
        return  fetchedCart.cartItems.destroyAll()
      })
      .then(result=>{
        cb(null,"Order Placed Successfully")
      })
  })
  .catch(err=>{
    cb(err)
  })
 }
 Customer.remoteMethod('placeOrder',{
  description: 'Place a new order',
  http:{
    verb:'post',
    path:'/:id/orders/place-order'
  },
  accepts:[
    {
    arg:'id',
    type:'string'
    },
    {"arg": "options", "type": "object", "http": "optionsFromRequest"}
  ],
  returns:{
    arg:"message",
    type:'string'
  }
 })




//afterRemoteMethod
Customer.afterRemote('create', function(context, userInstance, next) {
  userInstance.carts.create({customerId:userInstance.id})
  .then(cartCreated=>{
    next()
  })
 });












//Diables Remote Methods
};
