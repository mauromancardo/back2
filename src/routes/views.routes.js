import { Router } from "express";
import { productsService } from "../persistence/index.js";
const router = Router();
router.get("/",async(req, res)=>{
  const products = await productsService.getProduct();
  
    res.render("layouts/home",{products}) 
});
router.get("/realtimeproducts", (req, res) => {
  res.render("layouts/realTime");
});
export {router as viewsRouter};