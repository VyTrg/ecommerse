import { Request, Response } from "express";
import { ProductItemService } from "../services/ProductItemService";

const productItemService = new ProductItemService();

export class ProductItemController {
    static async getAllProductItems(req: Request, res: Response) {
        try {
            const productItems = await productItemService.getAllProductItems();
            res.json(productItems);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product items", error });
        }
    }

    static async getProductItemById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const productItem = await productItemService.getProductItemById(id);
            if (!productItem) {
                res.status(404).json({ message: "Product item not found" });
                return;
            }
            res.json(productItem);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product item", error });
        }
    }

    static async getProductItemsByProductId(req: Request, res: Response) {
        try {
            const productId = parseInt(req.params.productId);
            const productItems = await productItemService.getProductItemsByProductId(productId);
            res.json(productItems);
        } catch (error) {
            res.status(500).json({ message: "Error fetching product items", error });
        }
    }

    static async createProductItem(req: Request, res: Response) {
        try {
            const productItem = await productItemService.createProductItem(req.body);
            res.status(201).json(productItem);
        } catch (error) {
            res.status(500).json({ message: "Error creating product item", error });
        }
    }

    static async updateProductItem(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const updatedProductItem = await productItemService.updateProductItem(id, req.body);
            if (!updatedProductItem) {
                res.status(404).json({ message: "Product item not found" });
                return;
            }
            res.json(updatedProductItem);
        } catch (error) {
            res.status(500).json({ message: "Error updating product item", error });
        }
    }

    static async deleteProductItem(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await productItemService.deleteProductItem(id);
            if (!deleted) {
                res.status(404).json({ message: "Product item not found" });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting product item", error });
        }
    }
}


