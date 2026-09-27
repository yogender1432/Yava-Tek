const upload = require('../config/multer.config');
const {  createProduct, saveMultipleProducts, getAllProducts } = require('../controller/product.controller');

const productRouter = require('express').Router();

productRouter.post("/",upload.array('image', 5), createProduct)
productRouter.post("/save-all",saveMultipleProducts)
productRouter.get("/",getAllProducts)



module.exports = productRouter;