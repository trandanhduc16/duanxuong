import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel";
import ApiError from "../utils/ApiError";

class ProductsController {
  // GET /products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find().populate('category'); // Sử dụng populate để lấy thông tin danh mục
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }

  // GET /products/:id
  async getProductDetail(req, res, next) {
    try {
      const product = await Product.findById(req.params.id).populate('category'); // Sử dụng populate để lấy thông tin danh mục
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json(product);
    } catch (error) {
      next(error);
    }
  }

  // POST /products
  async createProduct(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Product Successful",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT /products/:id
  async updateProduct(req, res, next) {
    try {
      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      ).populate('category'); // Sử dụng populate để lấy thông tin danh mục sau khi cập nhật
      if (!updateProduct) throw new ApiError(404, "Product Not Found");

      res.status(StatusCodes.OK).json({
        message: "Update Product Successful",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  // DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Product Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductsController;
