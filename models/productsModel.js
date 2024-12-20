import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    name:{
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
    quantity: {
        type: Number,
        default: 1
    },    
    isDeleted:{
        type:Boolean,
        default:false
    }
})

const Products = mongoose.model("products",productsSchema);
export default Products;