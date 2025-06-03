import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import { AppDataSource } from "../config/datasource";
import { Category } from "../entity/Category";

const productService = new ProductService();

export class ProductController {

    // static async getAllProducts(req: Request, res: Response) {
    //     try {
    //         const products = await productService.getAllProducts();
    //         res.json(products);
    //     } catch (error) {
    //         res.status(500).json({ message: "Error fetching products", error });
    //     }
    // }

    // static async getProductById(req: Request, res: Response) {
    //     try {
    //         const product = await productService.getProductById(parseInt(req.params.id));
    //         if (!product) res.status(404).json({ message: "Product not found" });
    //         else res.json(product);
    //     } catch (error) {
    //         res.status(500).json({ message: "Error fetching product", error });
    //     }
    // }

    // static async createProduct(req: Request, res: Response) {
    //     try {
    //         const product = await productService.createProduct(req.body);
    //         res.status(201).json(product);
    //     } catch (error) {
    //         res.status(500).json({ message: "Error creating product", error });
    //     }
    // }

    // static async updateProduct(req: Request, res: Response) {
    //     try {
    //         const updatedProduct = await productService.updateProduct(parseInt(req.params.id), req.body);
    //         if (!updatedProduct) res.status(404).json({ message: "Product not found" });
    //         else res.json(updatedProduct);
    //     } catch (error) {
    //         res.status(500).json({ message: "Error updating product", error });
    //     }
    // }

    // static async deleteProduct(req: Request, res: Response) {
    //     try {
    //         const deleted = await productService.deleteProduct(parseInt(req.params.id));
    //         if (!deleted) res.status(404).json({ message: "Product not found" });
    //         else res.status(204).send();
    //     } catch (error) {
    //         res.status(500).json({ message: "Error deleting product", error });
    //     }
    // }
    // static async searchProducts(req: Request, res: Response) {
    //     try {
    //       const query = req.query.q?.toString().toLowerCase() || "";
    //       const allProducts = await productService.getAllProducts();
    
    //       const filtered = allProducts.filter((product) =>
    //         product.name.toLowerCase().includes(query)
    //       );
    
    //       res.json(filtered);
    //     } catch (error) {
    //       res.status(500).json({ message: "Error searching products", error });
    //     }
    //   }


  static getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      
      const categoryName = req.query.category?.toString().toLowerCase();
      const categoryRepo = AppDataSource.getRepository(Category);

      if (categoryName) {
        const allCategories = await categoryRepo.find({ relations: ["parent"] });

        console.log("All categories:", allCategories.map(c => ({
          id: c.id,
          name: c.name,
          parentId: c.parent?.id ?? null
        })));

        const parentCategory = allCategories.find(
          (c) => c.name.toLowerCase() === categoryName
        );

        console.log("Matched parentCategory:", parentCategory);

        if (!parentCategory) {
          res.json([]);
          return;
        }

        const matchedCategoryIds = allCategories
          .filter((c) => c.id === parentCategory.id || c.parent?.id === parentCategory.id)
          .map((c) => c.id);

        console.log("Matched category IDs:", matchedCategoryIds);

        const products = await productService.getProductsByCategoryIds(matchedCategoryIds);
        console.log("Found products:", products.length);
        res.json(products);
        return;
      }

      const products = await productService.getAllProducts();
      console.log("All products:", products.length);
      res.json(products);
    } catch (error) {
      console.error("❌ Error in getAllProducts:", error);
      res.status(500).json({
        message: "Error fetching products",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

  static getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await productService.getProductById(parseInt(req.params.id));
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(product);
    } catch (error) {
      console.error("❌ Error in getProductById:", error);
      res.status(500).json({
        message: "Error fetching product",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

  static createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      console.error("❌ Error creating product:", error);
      res.status(500).json({
        message: "Error creating product",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

  static updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const updatedProduct = await productService.updateProduct(parseInt(req.params.id), req.body);
      if (!updatedProduct) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.json(updatedProduct);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      res.status(500).json({
        message: "Error updating product",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

  static deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const deleted = await productService.deleteProduct(parseInt(req.params.id));
      if (!deleted) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error("❌ Error deleting product:", error);
      res.status(500).json({
        message: "Error deleting product",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

  static searchProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const query = req.query.q?.toString().toLowerCase() || "";
      const allProducts = await productService.getAllProducts();

      const filtered = allProducts.filter((product) =>
        product.name.toLowerCase().includes(query)
      );

      console.log(`🔎 Search matched ${filtered.length} product(s) with query "${query}"`);
      res.json(filtered);
    } catch (error) {
      console.error("❌ Error searching products:", error);
      res.status(500).json({
        message: "Error searching products",
        error: {
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    }
  };

}

