#### So sánh SSR và CSR ne

---

#### 1. Tổng quan khái niệm ne

| Đặc điểm           | **Server-Side Rendering (SSR)**     | **Client-Side Rendering (CSR)**  |
| :----------------- | :---------------------------------- | :------------------------------- |
| **Cơ chế**         | HTML được tạo sẵn trên **Server**.  | Browser tải **HTML rỗng** và JS. |
| **SEO**            | **Rất tốt** (Bot dễ quét nội dung). | **Hạn chế** (Phụ thuộc vào Bot). |
| **Tốc độ tải đầu** | **Nhanh** (Thấy nội dung ngay).     | **Chậm** (Phải chờ tải JS).      |
| **Tương tác**      | Chậm hơn (**Hydration**).           | **Mượt mà** sau khi load xong.   |

---

#### 2. Luồng hoạt động chi tiết ne

##### **Server-Side Rendering (SSR)**

- **Bước 1:** User gửi **Request** đến Server.
- **Bước 2:** Server lấy dữ liệu từ **Database**, render thành file **HTML hoàn chỉnh**.
- **Bước 3:** Browser nhận HTML và hiển thị nội dung ngay lập tức cho người dùng.
- **Bước 4:** Browser tải các file **JavaScript** để kích hoạt các sự kiện tương tác (**Hydration**).

##### **Client-Side Rendering (CSR)**

- **Bước 1:** User gửi **Request**.
- **Bước 2:** Server phản hồi một file **HTML rỗng** và các tệp **JavaScript**.
- **Bước 3:** Browser thực thi JavaScript, hiển thị trạng thái **Loading**.
- **Bước 4:** JavaScript gọi **API** lấy dữ liệu và render nội dung trực tiếp vào **DOM**.

---

#### 3. Ưu và Nhược điểm ne

##### **Server-Side Rendering (SSR)**

- **Ưu điểm:** Tối ưu hóa cho **SEO**, hiển thị nội dung nhanh trên các thiết bị cấu hình yếu hoặc mạng chậm.
- **Nhược điểm:** Gây áp lực lớn lên **CPU của Server**, mỗi lần chuyển trang thường phải tải lại toàn bộ tài nguyên.

##### **Client-Side Rendering (CSR)**

- **Ưu điểm:** Trải nghiệm người dùng (**UX**) cực tốt, chuyển trang mượt mà vì chỉ thay đổi dữ liệu (Single Page Application - **SPA**).
- **Nhược điểm:** Lần tải trang đầu tiên (**First Load**) chậm, khó khăn trong việc lên top tìm kiếm nếu không cấu hình **Pre-rendering**.

---

#### 4. Trường hợp sử dụng ne

- **Nên dùng SSR khi:** Làm trang **Thương mại điện tử**, **Tin tức**, **Blog** hoặc bất kỳ trang nào cần **SEO** làm trọng tâm.
- **Nên dùng CSR khi:** Làm các ứng dụng cần tương tác cao như **Dashboard**, **CRM**, **SaaS** hoặc các trang yêu cầu đăng nhập mới thấy nội dung.
