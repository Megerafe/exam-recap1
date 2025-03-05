const express = require("express");
const authenticate = require('../middleware/auth')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getProducts);
router.get("/:jobId", getProduct)

// Protected routes:
router.use(authenticate)

router.post("/", createProduct);
router.put("/:jobId", updateProduct);
router.delete("/:jobId", deleteProduct);

module.exports = router;
