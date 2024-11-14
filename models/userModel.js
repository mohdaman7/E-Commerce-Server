import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    accountCreateDate: {
        type: Date,
        default: Date.now,
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Wishlist"
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Orders"
    }]
},{timestamps: true}) // Automatically adds createdAt and updatedAt fields

const User = mongoose.model("User",userSchema);
export default User;