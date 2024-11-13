import mongoose from "mongoose";


const wishlistSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    ProductId:{
        type:mongoose.Schema.ObjectId,
        ref:"Products",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    }
});

const Wishlist = new mongoose.model("Wishlist",wishlistSchema);
export default Wishlist;