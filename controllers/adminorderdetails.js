import orders from "razorpay/dist/types/orders";

export const orderdetails=async (req,res)=>{
    const orders=await Orders.find().populate({
      path:'productId'
    })
    
    if(orders.length===0){
      return res.status(404).json({messege:'orders not found'})
    }
  
    res.status(200).json(orders)
  }
  
  
  export const stats=async (req,res)=>{
  
      const totalstats= await Orders.aggregate([
        {
          $group:{
            _id:null,
            totalproducts:{$sum:1},
            totalrevenue:{$sum:"$totalPrice"}
          }
        }
      ]);
  
      if(totalstats.length>0){
        res.status(200).json({status:'success',data:totalstats})
      }else{
        res.status(200).json({
          status:'success',
          totalproducts:0,
          totalrevenue:0
        });
      }
  
      console.log({totalstats});
      
  }