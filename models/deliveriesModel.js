module.exports = { deliveries, shippingInformation };

const deliveries = {
  id,
  order_id,
  shipping_information_id,
};

const shippingInformation = {
  address: { length: 300 },
  name: { length: 100 },
  contact: { length: 15 },
};
