# ======== Build Stage ==========
FROM node:18-alpine AS build

# Tạo thư mục làm việc
WORKDIR /app

# Copy chỉ package để cache tốt hơn
COPY package*.json ./

# Cài đặt phụ thuộc và fix bảo mật (nếu cần)
RUN npm install && npm audit fix --force

# Copy toàn bộ mã nguồn
COPY . .

# Build frontend
RUN npm run build


# ======== Production Stage ==========
FROM node:18-alpine AS production

# Tạo thư mục làm việc
WORKDIR /app

# Cài đặt serve để chạy app tĩnh
RUN npm install -g serve

# Copy thư mục build từ stage build
COPY --from=build /app/dist ./dist

# Mở cổng ứng dụng
EXPOSE 3000

# Chạy ứng dụng với serve
CMD ["serve", "-s", "dist", "-l", "3000"]
