const router = require("express").Router();
const Order = require("../models/Order");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");
//CREATE
router.post("/", verify, async (req, res) => {
  if (req.user) {
    console.log("Authenticated user:", req.user); // Log the user to check if it’s populated correctly
    const newOrder = new Order({
      ...req.body,
      userId: req.user.id, // Attach the userId to the order
    });
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed");
  }
});
//UPDATE
router.put("/markPaid/:id", verify, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" }); // Handle order not found
    }

    // Check if the user is the owner of the order or an admin
    if (req.user.id === order.userId || req.user.isAdmin) {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { $set: { status: "Paid" } }, // Set the status directly
        { new: true } // Return the updated document
      );

      return res.status(200).json(updatedOrder); // Send the updated order
    } else {
      return res
        .status(403)
        .json({ message: "You can update only your orders" }); // Provide a message for forbidden access
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message }); // Handle errors
  }
});
//DELETE
router.delete("/:id", verify, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (req.user._id === order.userId || req.user.isAdmin) {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted");
    } else {
      res.status(403).json("You can delete only your orders");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET
router.get("/find/:id", verify, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", verify, async (req, res) => {
  try {
    let orders;
    if (req.user.isAdmin) {
      orders = await Order.find(); // Admin can see all orders
    } else {
      orders = await Order.find({ userId: req.user.id }); // Users see only their orders
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
