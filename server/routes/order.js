const express = require("express");
const OrderController = require("../controllers/OrderController");
const Validator = require('../middlewares/validator');

const router = express.Router();

router.get("/user/orders", Validator.validateUserOrders, OrderController.getUserOrders);
router.get("/admin/orders", Validator.validateAdminOrders, OrderController.getAdminOrders);
router.post("/create-order", Validator.validateCreateOrder, OrderController.createOrder);
router.post("/edit-order", Validator.validateEditOrder, OrderController.editOrder);
router.get("/order-status", OrderController.getOrderStatus);
router.get("/order-types", OrderController.getOrderTypes);

module.exports = router;
