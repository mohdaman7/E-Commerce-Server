import productjoi from '../validation/productjio.js'
import products from '../models/productsModel.js'
import express from 'express'

const app = express()
app.use(express.json())

export const adminAddProduct = async(req,res,next)=>{
    const result = await productjoi.validateAsync(req.body);
    if(!result){
     return res.status(403).json({messege:"validation error on add product"})
    }
 
    const newProdut=new products({
     name:result.name,
     description:result.description,
     price:result.price,
     category:result.category,
     image:req.cloudinaryImageUrl
    });
 
    await newProdut.save()
    return res.status(200).json({messege:'product added successfully'})
}


export const adminviewproduct=async (req,res,next)=>{
   
    const allproduct = await products.find()

    if(!allproduct){
        return res.status(404).json({message:'products not founded'})
    }

    res.status(200).json(allproduct)
   
}


export const adminviewproductbyid=async(req,res)=>{
    const {productId} = req.params;

    const product = await products.findById(productId)

    if(!product){
        return res.status(404).json({message:'product not found'})
    }

    return res.status(200).json(product)
}



export const adminproductbycategory=async(req,res)=>{
    const {categoryname} = req.params;

    const product=await products.find({
        $or:[
            {category:{$regex:new RegExp(categoryname,'i')}},
            {title:{$regex:new RegExp(categoryname,'i')}}
        ]
    }).select('title category price');

    if(product.length===0){
        return res.status(404).json({messege:'No items found in the given category'})
    }

    res.status(200).json({product})
}


export const adminUpdateproduct=async(req,res)=>{
    const {productId}=req.params

    const product= await products.findById(productId)

    if(!product){
        return res.status(404).json({messege:'product not found'})
    }

    const {name,description,price,category}=req.body;

    if(name)product.name=name;

    if(description)product.description=description;

    if(price)product.price=price;

    if(req.cloudinaryImageUrl)product.image=req.cloudinaryImageUrl

    if(category)product.category=category;

    await product.save()

    res.status(200).json({messege:'product successfully updated'})

}

export const admindeleteproductbyid=async (req,res)=>{
    const {productId}=req.params

    const produtdelete= await products.findByIdAndDelete(productId)

    if(!produtdelete){
        return res.status(404).json({messege:'product not found'})
    }

    res.status(200).json({messege:'product deleted successfully'})
}

