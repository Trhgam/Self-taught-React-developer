# TỔNG HỢP KIẾN THỨC DOCKER & DNS

Tài liệu này hệ thống lại toàn bộ kiến thức về Docker, quy trình xây dựng ứng dụng, cơ chế mạng DNS và các câu lệnh thực thi quan trọng.

---

## 1. Tổng quan & Các thành phần chính

Docker giúp đóng gói ứng dụng và môi trường chạy vào một **Container** duy nhất, đảm bảo tính nhất quán trên mọi máy tính.

| Thành phần | Chức năng | Lệnh liên quan |
| :--- | :--- | :--- |
| **Dockerfile** | File chứa các chỉ thị để build Image. | `docker build` |
| **Image** | Bản đóng gói tĩnh, là "khuôn mẫu" (Read-only). | `docker images` |
| **Container** | Một thực thể của Image đang hoạt động (Runtime). | `docker run` |
| **Volume** | Nơi lưu trữ dữ liệu bền vững (không mất khi xóa container). | `docker volume` |
| **Network** | Hệ thống kết nối các container với nhau. | `docker network` |

---

## 2. Quy trình làm việc & Dockerfile mẫu

Quy trình chuẩn: **Viết Dockerfile** $\rightarrow$ **Build Image** $\rightarrow$ **Run Container**.



### Ví dụ Dockerfile cho ứng dụng Node.js/JavaScript:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```
### 3. Cơ chế DNS trong Docker

| Đặc điểm | Chi tiết cơ chế | Ứng dụng thực tế |
| :--- | :--- | :--- |
| **Embedded DNS** | Docker chạy DNS server tại địa chỉ `127.0.0.11`. | Container tự động nhận diện DNS này để phân giải tên miền. |
| **Service Discovery** | Tự động ánh xạ tên Service/Container sang IP nội bộ. | Dùng `host: database` thay vì IP tĩnh trong file cấu hình code. |
| **DNS Forwarding** | Chuyển tiếp request tên miền ngoài (google.com) ra host. | Giúp container có thể cập nhật thư viện từ internet qua DNS host. |
| **Isolation** | DNS chỉ hoạt động trong cùng một Network. | Tăng tính bảo mật, các network khác nhau không thể "thấy" nhau. |

---


### 4. Quản lý với Docker Compose
```docker-compose.yml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8080:3000"
    networks:
      - app-net

  database:
    image: postgres:15-alpine
    networks:
      - app-net

networks:
  app-net:
    driver: bridge
```
| Nhóm lệnh | Lệnh thực thi | Mục đích sử dụng |
| :--- | :--- | :--- |
| **Quản lý Container** | `docker ps` | Xem danh sách container đang chạy (thêm `-a` để xem tất cả). |
| | `docker stop <ID>` | Dừng một container đang hoạt động. |
| | `docker rm -f <ID>` | Xóa bỏ hoàn toàn một container. |
| **Tương tác** | `docker logs -f <ID>` | Theo dõi log trực tiếp từ ứng dụng bên trong container. |
| | `docker exec -it <ID> sh` | Mở terminal để thao tác trực tiếp bên trong container. |
| **Dọn dẹp** | `docker system prune` | Xóa mọi dữ liệu rác (container dừng, image thừa) để giải phóng ổ cứng. |
| **Compose** | `docker-compose up -d` | Khởi chạy toàn bộ hệ thống services dưới nền. |
| | `docker-compose down` | Dừng và dọn dẹp toàn bộ tài nguyên của project compose. |

---