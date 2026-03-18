# Kiến thức chuyên sâu: SSR vs CSR

### 1. Bảng so sánh tổng quan

| Đặc điểm           | **Server-Side Rendering (SSR)**            | **Client-Side Rendering (CSR)**                       |
| :----------------- | :----------------------------------------- | :---------------------------------------------------- |
| **Cơ chế**         | HTML được tạo sẵn trên **Server**.         | Browser tải **HTML rỗng** và file JS.                 |
| **SEO**            | **Rất tốt** (Bot dễ quét nội dung).        | **Hạn chế** (Phụ thuộc vào khả năng chạy JS của Bot). |
| **Tốc độ tải đầu** | **Nhanh** (Người dùng thấy nội dung ngay). | **Chậm** (Phải chờ tải và thực thi JS xong).          |
| **Tương tác**      | Cần thời gian **Hydration**.               | **Mượt mà** ngay sau khi load xong.                   |

---

### 2. Cơ chế Hydration trong SSR

**Hydration** là quá trình "hồi sinh" các thành phần tĩnh thành các thành phần có khả năng tương tác.

- **Quy trình:** Server gửi về bản HTML tĩnh (đã có nội dung chữ, hình ảnh). Trình duyệt hiển thị bản này ngay lập tức. Sau đó, trình duyệt tải JavaScript và "gắn" (hydrate) các sự kiện (click, submit, hover...) vào các thẻ HTML tương ứng.
- **Lợi ích:** Tối ưu chỉ số **First Contentful Paint (FCP)**, giúp người dùng cảm thấy trang web load cực nhanh dù JS vẫn đang tải ngầm.

---

### 3. Ví dụ Code minh họa

#### Server-Side Rendering (SSR) với Next.js

Sử dụng `getServerSideProps` để fetch dữ liệu tại Server.

```javascript
// pages/products.js
export async function getServerSideProps() {
  // Logic này chạy hoàn toàn trên Server
  const res = await fetch(
    "[https://api.example.com/products](https://api.example.com/products)",
  );
  const data = await res.json();

  // Truyền data vào component thông qua props
  return { props: { data } };
}

export default function Products({ data }) {
  return (
    <div>
      <h1>Danh sách sản phẩm (SSR)</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 3. Ví dụ Code minh họa (Tiếp theo)

##### **Client-Side Rendering (CSR) với React thuần**

Sử dụng `useEffect` để fetch dữ liệu tại trình duyệt sau khi trang đã load khung HTML cơ bản.

```javascript
// components/Products.js
import { useEffect, useState } from "react";

export default function Products() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dữ liệu được fetch tại trình duyệt (Client) sau khi trang đã hiển thị khung
    fetch(
      "[https://api.example.com/products](https://api.example.com/products)",
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu từ Client...</p>;

  return (
    <div>
      <h1>Danh sách sản phẩm (CSR)</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

#### 4. Phân tích công dụng thực tế

##### **Công dụng của SSR (Server-Side Rendering):**

- **Tối ưu SEO:** Cực kỳ quan trọng cho các trang bán hàng, tin tức để nội dung dễ dàng xuất hiện và đạt thứ hạng cao trên Google.
- **Tải trang nhanh (First Contentful Paint):** Giúp người dùng thấy ngay nội dung hữu ích, giảm tỷ lệ thoát trang, đặc biệt hiệu quả với người dùng mạng yếu.
- **Bảo mật:** Các logic lấy dữ liệu phức tạp hoặc sử dụng API Key nhạy cảm được thực hiện ở Server, tránh lộ thông tin ra phía Client.

##### **Công dụng của CSR (Client-Side Rendering):**

- **Tiết kiệm tài nguyên Server:** Giảm tải đáng kể cho Server vì việc render giao diện nặng nhọc đã được đẩy cho máy tính/điện thoại của người dùng xử lý.
- **Trải nghiệm mượt mà (SPA):** Khi đã load xong ứng dụng ban đầu, việc chuyển giữa các trang con diễn ra tức thì, không bị hiện tượng "trắng màn hình" do phải load lại toàn bộ trang.
- **Giảm băng thông:** Sau lần tải đầu tiên, các thao tác sau này chỉ truyền nhận dữ liệu JSON gọn nhẹ thay vì phải gửi cả khối HTML lớn từ Server.

---

#### 5. Chiến lược lựa chọn kỹ thuật

| Loại dự án                   | Kỹ thuật khuyên dùng | Lý do                                                                         |
| :--------------------------- | :------------------- | :---------------------------------------------------------------------------- |
| **Landing Page / Blog**      | **SSR**              | Cần SEO tuyệt đối và tốc độ hiển thị nội dung tức thì để giữ chân khách.      |
| **Trang Thương mại điện tử** | **SSR**              | Đảm bảo sản phẩm và mô tả luôn xuất hiện đầy đủ trên kết quả tìm kiếm Google. |
| **Dashboard / Admin Panel**  | **CSR**              | Cần tương tác cao, dữ liệu thay đổi liên tục và không yêu cầu SEO công khai.  |
| **App nội bộ / Công cụ**     | **CSR**              | Tối ưu chi phí vận hành và duy trì tài nguyên Server cho doanh nghiệp.        |

---
SEO (viết tắt của Search Engine Optimization) là Tối ưu hóa công cụ tìm kiếm.

Nói một cách đơn giản nhất, SEO là tập hợp các phương pháp giúp trang web của bạn xuất hiện ở vị trí cao (thường là trang 1) trên kết quả tìm kiếm của Google, Bing... khi người dùng gõ một từ khóa nào đó.

####