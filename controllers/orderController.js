import orderModel from "../models/orderModel.js";

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: "-1" });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, verifiCodeAdmin, verifiCodeUser } = req.body;

    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status, verifiCodeAdmin, verifiCodeUser },
      { new: true }
    );
    if (
      orders.verifiCodeAdmin !== "" &&
      orders.verifiCodeUser !== "" &&
      orders.verifiCodeAdmin === orders.verifiCodeUser
    ) {
      await orderModel.findByIdAndUpdate(
        orderId,
        { payment: "Verified" },
        { new: true }
      );
    }
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

// export const verifiPaymentStatusUser = async (req, res) => {
//   try {
//     console.log("hahahah");
//     const { orderId } = req.params;
//     const {verifiCodeUser } = req.body;
//     console.log(verifiCodeUser);
//     const order = await orderModel.findById(orderId);
//     console.log(order)

//     if (
//       order.verifiCodeAdmin == verifiCodeUser
//     ) {
//       console.log("google")
//       await orderModel.findByIdAndUpdate(
//         orderId,
//         { verifiCodeUser, payment: "Verified" },
//         { new: true }
//       );
//       res.json(order);
//     } else {
//       res.status(500).send({
//         success: false,
//         message: "Verification code is not matching",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error While Updateing Order",
//       error,
//     });
//   }
// };


export const verifiPaymentStatusUser = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { verifiCodeUser } = req.body;

    const order = await orderModel.findById(orderId);
    
    if(order.verifiCodeAdmin === verifiCodeUser){
         await orderModel.findByIdAndUpdate(
        orderId,
        { verifiCodeUser, 
          payment: "Verified" },
        { new: true }
      );
      res.json(order);
    } else {
      res.status(400).json({
        success: false,
        message: "Verification code is not matching",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while updating order",
      error: error.message,
    });
  }
};
