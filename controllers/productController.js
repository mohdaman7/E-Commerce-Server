import products from "../models/productsModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";


export const viewproduct = async (req, res) => {
  const produt = await products.find();

  if (!produt) {
    return res.status(404).json({ messege: "unable to get products" });
  }

  res
    .status(200)
    .json({
      status: "success",
      messege: "successfully fetched data",
      data: produt,
    });
};

export const productById = async (req, res) => {

  const productId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  const product = await products.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ Error: "not found", messege: "product not found" });
  }
  res.status(200).json({ product });
};

export const productBycategory = async (req, res) => {
  const { categoryname } = req.params;
  const product = await products
    .find({
      $or: [
        { category: { $regex: new RegExp(categoryname, "i") } },
        { title: { $regex: new RegExp(categoryname, "i") } },
      ],
    })
    

  if (!product) {
    return res.status(404).json({ messege: "item not found" });
  }

  return res.status(200).json({ product });
};

export const orderbyid = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).populate({
    path: "orders", // Populate the orders array
    populate: { path: "productId" },
  });
  //  populate:{path:"productId"}
  if (!user) {
    return res.status(404).json({ messege: "user not found" });
  }

  if (!user.orders || user.orders.length === 0) {
    return res.status(200).json({ messege: "no orders yet ", data: [] });
  }

  return res.status(200).json(user.orders);
};
