import express, { Request, Response } from "express";
import puppeteer from "puppeteer";

const router = express.Router();

interface OrderData {
  customerName: string;
  orderId: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}


async function generateInvoicePdf(order: OrderData, res: Response): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const html = generateInvoiceHTML(order);
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `inline; filename=invoice-${order.orderId}.pdf`,
  });

  res.send(pdfBuffer); 
}
router.post("/generate-invoice", async (req: Request, res: Response) => {
  try {
    const order: OrderData = req.body.orderData;
    await generateInvoicePdf(order, res); 
  } catch (err) {
    console.error("Lỗi tạo hóa đơn:", err);
    res.status(500).send("Không thể tạo hóa đơn");
  }
});

function generateInvoiceHTML(order: OrderData): string {
  const itemsHtml = order.items
    .map(
      (item) =>
        `<tr><td>${item.name}</td><td>${item.quantity}</td><td>${item.price} VND</td></tr>`
    )
    .join("");

  return `
    <html>
      <head>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Hóa đơn thanh toán</h2>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Order ID:</strong> ${order.orderId}</p>
        <table>
          <thead><tr><th>Sản phẩm</th><th>Số lượng</th><th>Giá</th></tr></thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        <h3>Tổng cộng: ${order.total} VND</h3>
      </body>
    </html>
  `;
}

export default router;
