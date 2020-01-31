'use strict';
var LoopBackContext = require('loopback-context')
module.exports = function(Cartitem) {




   //afterRemoteMethod
   Cartitem.beforeRemote('find', function(context, userInstance, next) {
    // console.log("context",context.currentUser);
  //   var ctx = LoopBackContext.getCurrentContext();
  // var currentUser = ctx && ctx.get('currentUser');
  console.log("currentUser",context.req.currentUser);
    next()
   });
};
