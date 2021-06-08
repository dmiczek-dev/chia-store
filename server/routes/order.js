const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();

router.get("/orders/:id", OrderController.getUserOrders);
router.post("/create-order", OrderController.createOrder);
router.post("/edit-order", OrderController.editOrder);
router.post("/delete-order", OrderController.deleteOrder);

module.exports = router;
