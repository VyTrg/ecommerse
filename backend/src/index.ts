import express, { Request, Response } from "express";
import dotenv from "dotenv";
import session from "express-session";
import cors from "cors";
import path from "path";

import { AppDataSource } from "./config/datasource";
import { keycloak, isAuthenticated, adminOnly, memoryStore } from "./middleware/keycloak";

// Routes
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
import Order_itemRoutes from "./routes/order_itemRoutes";
import adminOrderRoutes from "./routes/adminOrderRoutes";
import orderRoutes from "./routes/orderRoutes";
import {Token} from "keycloak-connect";
import { OrderItem } from "./entity/OrderItem";
import productPromotionRoutes from "./routes/productPromotionRoutes";
import order_itemRoutes from "./routes/order_itemRoutes";
import addressRoutes from "./routes/addressRoutes";
import uploadRoute from "./routes/uploadRoute";
import invoice from "./routes/invoice";

dotenv.config();
const app = express();
const PORT = 3001;


app.use(express.json());
app.use(session({
    secret: process.env.SECRET || 'app_secret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(keycloak.middleware());

// Routes
app.use("/api/users", keycloak.protect(isAuthenticated), UserRouter);

app.use("/api/promotions", promotionRoutes);
app.use("/api/sizes", sizeRoutes);
app.use("/api/user-addresses", keycloak.protect(isAuthenticated), User_addressRoute);
app.use("/api/reviews", keycloak.protect(isAuthenticated), ReviewRoutes);
app.use("/api/shipping-methods", keycloak.protect(isAuthenticated), Shipping_methodRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-items", product_itemRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", keycloak.protect(isAuthenticated), orderRoutes);
app.use("/api/addresses", keycloak.protect(isAuthenticated), addressRoutes);
app.use("/api/statistics", keycloak.protect(adminOnly), StatisticsRoutes);
app.use("/api/order_items", keycloak.protect(isAuthenticated), Order_itemRoutes);
app.use("/api/auth", authRoutes);
app.use("/admin/api/orders", keycloak.protect(isAuthenticated), adminOrderRoutes);
app.use("/api/upload", keycloak.protect(adminOnly), uploadRoute);
app.use("/api/invoice", keycloak.protect(isAuthenticated), invoice);

// Static upload files - only for admin
app.use("/uploads", keycloak.protect(adminOnly), express.static(path.join(__dirname, "../uploads")));

// DB connection
AppDataSource.initialize()
    .then(() => {
        console.log(" Database connected successfully");
        app.listen(PORT, () => {
            console.log(` Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => console.log(" Database connection error:", error));
