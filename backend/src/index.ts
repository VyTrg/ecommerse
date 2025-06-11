import express, {Request, Response} from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./config/datasource";

import UserRouter from "./routes/userRoutes";
import promotionRoutes from "./routes/promotionRoutes"; 
import sizeRoutes from "./routes/SizeRoutes";
import User_addressRoute from "./routes/UserAddressRoute";
import ReviewRoutes from "./routes/ReviewRoutes";
import Shipping_methodRoutes from "./routes/ShippingMethodRoutes";
import productRoutes from "./routes/productRoutes";
import imageRoutes from "./routes/imageRoutes";
import categoryRoutes from "./routes/categoryRoutes";

import product_itemRoutes from "./routes/productItemRoutes";
import authRoutes from "./routes/authRoutes";
import StatisticsRoutes from "./routes/StatisticsRoutes";

import path from "path";


import cors from "cors";
import orderRoutes from "./routes/orderRoutes";
import order_itemRoutes from "./routes/order_itemRoutes";

dotenv.config();
const app = express();
const PORT = 3001;


app.use(cors({
    origin: "http://localhost:3000", // hoặc "*" nếu muốn cho tất cả
    credentials: true
}));


app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/promotions", promotionRoutes); 
app.use("/api/sizes", sizeRoutes); 
app.use("/api/user-addresses", User_addressRoute);
app.use("/api/reviews", ReviewRoutes);
app.use("/api/shipping-methods", Shipping_methodRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-items", product_itemRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/statistics", StatisticsRoutes);
app.use("/api/order-items", order_itemRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// DB + start server
AppDataSource.initialize()
    .then(() => {
        console.log("✅ Database connected successfully");
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log("❌ Database connection error:", error));
