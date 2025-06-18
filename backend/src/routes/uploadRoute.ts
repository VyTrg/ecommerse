import express, { Request, Response } from "express";
import { upload } from "../middlewares/UpLoadMiddleware";
import { uploadFileBufferToCloudinary } from "../services/UpLoadService";
import multer from "multer";

const router = express.Router();

router.post("/", (req, res) => {
  upload.single("image")(req, res, async (err: any) => {
    // Xử lý lỗi từ multer
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: "File vượt quá 10MB" });
      }
      return res.status(400).json({ message: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }

    // Kiểm tra có file không
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được upload" });
    }

    try {
      const result = await uploadFileBufferToCloudinary(req.file.buffer);
      res.json({ url: result.url });
    } catch (error) {
      console.error(" Upload to Cloudinary failed:", error);
      res.status(500).json({ message: "Lỗi upload lên Cloudinary" });
    }
  });
});

export default router;
