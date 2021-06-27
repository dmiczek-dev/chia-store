const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/user/orders", OrderController.getUserOrders);
router.get("/admin/orders", OrderController.getAdminOrders);
router.post("/create-order", OrderController.createOrder);
router.post("/edit-order", OrderController.editOrder);
router.get("/order-status", OrderController.getOrderStatus);
router.get("/order-types", OrderController.getOrderTypes);

module.exports = router;
