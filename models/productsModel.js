import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    quantity:{

    },
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Products = mongoose.model("products",productsSchema);
export default Products;