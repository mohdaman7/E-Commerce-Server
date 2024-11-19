import { login,viewAllusers,adminviewUserbyid,adminBlockUserById,adminviewUserByUserName,adminUnblockUserById } from "../controllers/adminControlls";
import express from 'express';
import { adminToken } from "../middlewares/adminAuthmiddle";
import TryCatchMiddleware from '../middlewares/TryCatchMiddleware'
import { adminAddProduct,adminUpdateproduct,adminviewproduct,admindeleteproductbyid,adminviewproductbyid,adminproductbycategory } from "../controllers/adminProductController";
import { orderdetails,stats } from "../controllers/adminorderdetails";

const router = express.Router()

//admin login 
router.post('/login',TryCatchMiddleware(login))

router.use(adminToken)


//admin route
router.get('/viewAllUsers',TryCatchMiddleware(viewAllusers))

router.get('/user/:id',TryCatchMiddleware(adminviewUserbyid))

router.get('/user/findname/:username',TryCatchMiddleware(adminviewUserByUserName))

router.put('/user/block/:userId',TryCatchMiddleware(adminBlockUserById))

router.put('/user/unblock/:userId',TryCatchMiddleware(adminUnblockUserById))

//admin product route

router.post('/createproducts',uploadImage,TryCatchMiddleware(adminAddProduct))

router.get('/products',TryCatchMiddleware(adminviewproduct))

router.get('/products/:productId',TryCatchMiddleware(adminviewproductbyid))

router.get('/products/category/:categoryname',TryCatchMiddleware(adminproductbycategory))

router.put('/products/edit/:productId',uploadImage,TryCatchMiddleware(adminUpdateproduct))

router.delete('/products/delete/:productId',TryCatchMiddleware(admindeleteproductbyid))



router.get('/orders',TryCatchMiddleware(orderdetails))

router.get('/stats',TryCatchMiddleware(stats))


export default router;