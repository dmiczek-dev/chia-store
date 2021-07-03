const express = require("express");
const OrderController = require("../controllers/OrderController");
const { authenticate } = require('../middlewares/authenticate');
const { validateAdmin, validateUser, validateCreateOrder, validateEditOrder } = require("../middlewares/validate");

const router = express.Router();

router.get("/user/orders", [authenticate, validateUser, OrderController.getUserOrders]);
router.get("/admin/orders", [authenticate, validateAdmin, OrderController.getAdminOrders]);
router.post("/create-order", [authenticate, validateUser, validateCreateOrder, OrderController.createOrder]);
router.post("/edit-order", [authenticate, validateAdmin, validateEditOrder, OrderController.editOrder]);
router.get("/order-status", [authenticate, OrderController.getOrderStatus]);
router.get("/order-types", [authenticate, OrderController.getOrderTypes]);

module.exports = router;
