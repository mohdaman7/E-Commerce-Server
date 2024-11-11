import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"Products",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
})

const Cart = mongoose.model("Cart",cartSchema);
export default Cart