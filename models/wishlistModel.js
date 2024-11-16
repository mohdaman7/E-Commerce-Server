import mongoose from "mongoose";


const wishlistSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    productId:{
        type:mongoose.Schema.ObjectId,
        ref:"products",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
});

const Wishlist = new mongoose.model("Wishlist",wishlistSchema);
export default Wishlist;