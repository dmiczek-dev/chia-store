const express = require("express");
const OrderController = require("../controllers/OrderController");
const Validator = require('../middlewares/validator');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.get("/user/orders", [authenticate, Validator.validateUserOrders, OrderController.getUserOrders]);
router.get("/admin/orders", authenticate, Validator.validateAdminOrders, OrderController.getAdminOrders);
router.post("/create-order", Validator.validateCreateOrder, OrderController.createOrder);
router.post("/edit-order", Validator.validateEditOrder, OrderController.editOrder);
router.get("/order-status", OrderController.getOrderStatus);
router.get("/order-types", OrderController.getOrderTypes);

module.exports = router;
