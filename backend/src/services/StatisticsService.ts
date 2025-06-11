import { AppDataSource } from "../config/datasource";
import { Between } from "typeorm";
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";

function getLastDayOfMonth(date: Date) {
  const year  = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan, 1 = Feb, …

  const monthLengths = [
    31,
    ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) ? 29 : 28, 
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
  ];

  const lastDay = monthLengths[month];

  return new Date(year, month, lastDay, 23, 59, 59, 999);
}

function getTimeRange(type: string, date: string) {
    const inputDate = new Date(date);
    let start: Date, end: Date;

    switch (type) {
        case "day":
            start = new Date(inputDate.setHours(0, 0, 0, 0));
            end = new Date(inputDate.setHours(23, 59, 59, 999));
            break;
        case "week":
            const first = inputDate.getDate() - inputDate.getDay() + 1;
            start = new Date(inputDate.setDate(first));
            start.setHours(0, 0, 0, 0);
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            end.setHours(23, 59, 59, 999);
            break;
        case "month":
            start = new Date(inputDate.getFullYear(), inputDate.getMonth() , 1, 0, 0, 0, 0);
            end = getLastDayOfMonth(inputDate);
            break;
        default:
            throw new Error("Type must be one of: day, week, month");
    }
    return { start, end };
}

export class StatisticsService {
    // static async productsStatistics() {
        
        
    //     const productRepo = AppDataSource.getRepository(Product);
    //     const result = await productRepo
    //         .createQueryBuilder("product")
    //         .select("(COUNT(product.id))", "totalProducts")
    //         .getRawOne<{ totalProducts: string }>();

    //     return { totalProducts: Number(result?.totalProducts ?? 0) };
    // }

    static async ordersStatistics(type: string, date: string) {
        const { start, end } = getTimeRange(type, date);
        const orderRepo = AppDataSource.getRepository(Order);
        const result = await orderRepo
            .createQueryBuilder("order")
            .where("order.orderDate BETWEEN :start AND :end", { start, end })
            .select("(COUNT(order.id))", "totalOrders")
            .getRawOne<{ totalOrders: string }>();

        return { totalOrders: Number(result?.totalOrders ?? 0) };
    }
}
