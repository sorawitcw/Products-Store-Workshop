var express = require('express');
var router = express.Router();
var productController = require('../controllers/product.controller')
// const adminMiddleware = require('../middlewares/check.middleware')
// router.use(adminMiddleware.adminOnly)
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images"))
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/', productController.getProduct)
router.get('/:id',productController.getProductById)
router.post("/", upload.single("productphoto"), productController.createProduct)
router.put('/:id', upload.single("productphoto"), productController.updateProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router;
