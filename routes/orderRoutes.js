import express from "express";
import {
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  verifiPaymentStatusUser
} from "../controllers/orderController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//orders
router.get("/orders", requireSignIn, getOrdersController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  // isAdmin,
  orderStatusController
);

router.put(
  "/order-status",
  requireSignIn,
  // isAdmin,
  orderStatusController
);



// order status update
router.put(
  "/order-status1/:orderId",
  requireSignIn,
  // isAdmin,
  verifiPaymentStatusUser
);

export default router;
