const express = require("express");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productControllers");

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:jobId", getProduct);
router.put("/:jobId", updateProduct);
router.delete("/:jobId", deleteProduct);

module.exports = router;
