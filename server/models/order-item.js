'use strict';

module.exports = function(Orderitem) {
  Orderitem.validatesInclusionOf('status', {in: ["pending", "shipped", "delivered","canceled"],message:"Value Not Allowed"});

};
