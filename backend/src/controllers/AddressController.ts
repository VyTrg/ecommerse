import { Request, Response } from "express";
import {AddressService} from "../services/AddressService";

const addressService = new AddressService();
export class AddressController {

    static async getAddressesByUserId(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);

        if (isNaN(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
        }

        try {
            const addressService = new AddressService();
            const addresses = await addressService.getAddressesByUserId(userId);
            res.status(200).json(addresses);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            res.status(500).json({ message: "Failed to retrieve addresses" });
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const userId = Number(req.body.user_id);
            if (!userId)  res.status(400).json({ error: "Missing user_id" });

            const address = await addressService.createAddress(userId, req.body);
            res.status(201).json(address);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to create address" });
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const addressId = Number(req.params.id);
            const updated = await addressService.updateAddress(addressId, req.body);

            if (!updated) res.status(404).json({ error: "Address not found" });

            res.json(updated);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to update address" });
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            const userId = Number(req.body.user_id);
            const addressId = Number(req.params.id);

            const deleted = await addressService.deleteAddress(userId, addressId);
            if (!deleted) res.status(404).json({ error: "Address not found" });

             res.json({ message: "Address deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Failed to delete address" });
        }
    }
}