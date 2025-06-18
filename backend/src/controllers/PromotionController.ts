import { Request, Response } from "express";
import { AppDataSource } from "../config/datasource";
import { Promotion } from "../entity/Promotion";

const repo = AppDataSource.getRepository(Promotion);

// Lấy danh sách tất cả khuyến mãi
export const getPromotions = async (_: Request, res: Response): Promise<void> => {
  try {
    const promotions = await repo.find({ relations: ["productPromotions"] });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi lấy danh sách khuyến mãi",
      error,
    });
  }
};

// Tạo khuyến mãi mới
export const createPromotion = async (req: Request, res: Response): Promise<void> => {
  try {
    const promotion = repo.create(req.body);
    const savedPromotion = await repo.save(promotion);
    res.status(201).json(savedPromotion);
  } catch (error) {
    res.status(400).json({
      message: "Lỗi khi tạo khuyến mãi",
      error,
    });
  }
};

// Xoá khuyến mãi theo ID
export const deletePromotion = async (
  req: Request<{ id: string }>, //  Chỉ rõ kiểu của params
  res: Response
): Promise<void> => {
  try {
    const result = await repo.delete(req.params.id);

    if (result.affected === 0) {
      res.status(404).json({ message: "Không tìm thấy khuyến mãi để xoá" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xoá khuyến mãi",
      error,
    });
  }
};
