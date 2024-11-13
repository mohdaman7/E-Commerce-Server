const TryCatchMiddleware = (handler) =>{
    return async (req,res,next) => {
        try{
            await handler(req,res,next);
        } catch(error){
            console.log(error);
            res.status(500).json({
                status:'failier',
                message:'error',
                error_message:error.message
            });
        }
        return 
    }
}

export default TryCatchMiddleware;