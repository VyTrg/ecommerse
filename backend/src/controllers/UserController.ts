import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import {UserService} from "../services/UserService";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
const userRepository = AppDataSource.getRepository(User);
const userService = new UserService();

export class UserController {
    static async getAllUsers(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
const limit = parseInt(req.query.limit as string) || 10;
const skip = (page - 1) * limit;

const [users, totalCount] = await userRepository.findAndCount({
    skip,
    take: limit,
    order: { id: "ASC" }, 
});

res.json({
    data: users,
    totalCount
});

        } catch (error) {
            res.status(500).json({ message: "Error fetching users", error });
        }
    }
    static async getUserById(req: Request, res: Response) {
        try {
            const user = await userService.getUserById(parseInt(req.params.id));
            if (!user) res.status(404).json({ message: "User not found" });
            else res.json(user);
        } catch (error) {
            res.status(500).json({ message: "Error fetching user", error });
        }
    }
    static async updateUser(req: Request, res: Response) {
        try {
            const updatedUser = await userService.updateUser(parseInt(req.params.id), req.body);
            if (!updatedUser) res.status(404).json({ message: "User not found" });
            else res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: "Error updating user", error });
        }
    }
    static async deleteUser(req: Request, res: Response) {
        try {
            const deleted = await userService.deleteUser(parseInt(req.params.id));
            if (!deleted) res.status(404).json({ message: "User not found" });
            else res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting user", error });
        }
    }
    static async addUserAddress(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const { street_name, city, region, district, country, is_default } = req.body;

            const addressData = { street_name, city, region, district, country };
            const userAddress = await userService.addUserAddress(parseInt(userId), addressData, is_default);

            res.status(201).json(userAddress);
        } catch (error) {
            res.status(500).json({ message: "Error adding address", error });
        }
    }


    static async createUser(req: Request, res: Response) {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: "Error creating user", error });
        }
    }
}