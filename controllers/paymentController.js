import Razorpay from "razorpay";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import Orders from "../models/orderModel.js";
import crypto from "crypto";
import Cart from "../models/cartModel.js";

dotenv.config();

const razorpay = new Razorpay({
  key_id: Date.now,
  key_secret: process.env.Razorpay_key_secret,
});

export const payment = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id).populate({
    path: "cart",
    populate: { path: "productId" },
  });

  if (!user) {
    return res.status(404).json({ messege: "user not found" });
  }

  if (!user.cart || user.cart.length === 0) {
    return res.status(200).json({ messege: "your cart is empty " });
  }

  const amount = user.cart.reduce((total, item) => {
    return (total += item.productId.price * item.quantity);
  }, 0);

  const productNames = user.cart.map((item) => item.productId.title).join(", ");

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_order_${Math.random().toString(36).substring(2, 15)}`,
    notes: {
      product: productNames,
      userid: id,
    },
  };

  const order = await razorpay.orders.create(options);
  res.status(200).json({
    id: order.id,
    amount: order.amount,
    currency: order.currency,
  });
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const hmac = crypto.createHmac("sha256", process.env.Razorpay_key_secret);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).send("verification failed");
  }

  const order = await razorpay.orders.fetch(razorpay_order_id);

  const user = await User.findById(order.notes.userid).populate({
    path: "cart",
    populate: { path: "productId" },
  });

  let productids = [];
  user.cart.map((item) => {
    productids.push(item.productId._id);
  });

  //  products: user.cart.map(item => ({
  //             productId: item.id,
  //             quantity: item.quantity,
  //             price: item.productId.price
  //         })),

  const newOrder = new Orders({
    userId: user.id,
    amount: order.amount,
    productId: productids,
    paymentId: razorpay_payment_id,
    orderId: razorpay_order_id,
    totalPrice: order.amount / 100,
    status: "paid",
  });

  await newOrder.save();
  user.orders.push(newOrder);
  user.cart = [];
  await Cart.deleteMany({ userId: user._id });
  await user.save();

  res.send("payment verified successfully");
};
