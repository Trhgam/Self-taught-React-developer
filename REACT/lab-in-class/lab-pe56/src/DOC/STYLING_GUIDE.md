# Hướng dẫn Styling: React-Bootstrap & Custom CSS

Tài liệu này giải thích tường tận các cách style trong React, đặc biệt là khi dùng thư viện **React-Bootstrap**.

---

## 1. Ba cách Style phổ biến trong React

### Cách 1: Inline Style (Thủ công)
Đây là cách bạn viết trực tiếp vào thẻ thông qua thuộc tính `style`.
- **Cú pháp:** `style={{ property: "value" }}` (Lưu ý: dùng 2 dấu ngoặc nhọn, tên thuộc tính viết kiểu `camelCase`).
- **Ví dụ:** `<h2 style={{ color: "#6fb0de", fontWeight: "bold" }}>`
- **Khi nào dùng:** Khi bạn cần một màu sắc "độc nhất" (không có trong bảng màu Bootstrap) hoặc cần căn chỉnh cực kỳ chi tiết mà class không hỗ trợ.

### Cách 2: Component Props (Sẵn có của thư viện)
React-Bootstrap cung cấp các "Props" (thuộc tính) riêng cho từng component để thay đổi giao diện nhanh.
- **Ví dụ với Button:** `<Button variant="success">`
    - `variant`: Quyết định màu sắc chủ đạo (`primary`, `success`, `danger`, `warning`, `info`, `light`, `dark`).
    - `size`: Kích thước (`sm`, `lg`).
- **Khi nào dùng:** Luôn luôn ưu tiên dùng cái này trước để giữ code sạch và đúng quy chuẩn của thư viện.

### Cách 3: Utility Classes (Dùng `className`)
Bootstrap có hàng nghìn class "tiện ích" (Utility) giúp bạn căn chỉnh mà không cần viết CSS. Đây là lý do tại sao bạn thấy `className="w-100 fw-bold py-2 shadow-sm"`.
- **Phân tích ví dụ:**
    - `w-100`: Width 100% (rộng hết cỡ).
    - `fw-bold`: Font Weight Bold (chữ đậm).
    - `py-2`: Padding Y-axis (trên và dưới) mức 2.
    - `shadow-sm`: Đổ bóng nhẹ (Small Shadow).
- **Khi nào dùng:** Dùng để căn lề, khoảng cách, font chữ, hiển thị... mà không muốn mở file `.css`.

---

## 2. Grid System (Hệ thống lưới) - Layout tổng thể
Bootstrap chia chiều ngang màn hình thành **12 cột**. Đây là cách tốt nhất để chia bố cục trang web (ví dụ: bên trái là Menu, bên phải là Nội dung).

### Các thành phần chính:
- **`<Container>`**: Gom tất cả vào giữa màn hình.
- **`<Row>`**: Tạo một hàng ngang để chứa các cột.
- **`<Col>`**: Cột trong hàng. Bạn xác định độ rộng bằng số (tổng phải bằng 12).

### Ví dụ áp dụng:
```jsx
<Container>
  <Row>
    {/* Cột này chiếm 4 phần (1/3 màn hình) */}
    <Col md={4} className="bg-primary text-white p-3">
      Sidebar (Menu bên trái)
    </Col>
    
    {/* Cột này chiếm 8 phần (2/3 màn hình) */}
    <Col md={8} className="bg-light p-3">
      Main Content (Nội dung chính)
    </Col>
  </Row>
</Container>
```

### Cách nó hiển thị:
- Trên màn hình máy tính (`md` hoặc lớn hơn): Bạn sẽ thấy 2 cột nằm cạnh nhau.
- Trên điện thoại (màn hình nhỏ): Các cột sẽ tự động **xếp chồng lên nhau** (mỗi cái chiếm 100% chiều ngang) để dễ đọc.

### Breakpoints (Điểm ngắt):
- `sm`: Small (Cho điện thoại nằm ngang).
- `md`: Medium (Cho Tablet/iPad).
- `lg`: Large (Cho Laptop).
- `xl`: Extra Large (Cho màn hình PC lớn).

---

## 3. Flexbox & Căn chỉnh (Thường dùng trong className)
Flexbox dùng để sắp xếp các phần tử nhỏ hơn bên trong một khối (như các nút bấm trong một hàng, hoặc căn giữa một tấm ảnh).

### Các class quan trọng:
- `d-flex`: Bắt buộc phải có để kích hoạt Flexbox.
- `flex-row` (Mặc định): Xếp các phần tử nằm ngang.
- `flex-column`: Xếp các phần tử nằm dọc từ trên xuống.
- `gap-2`, `gap-3`: Tạo khoảng cách đều giữa các phần tử (rất tiện).

### Căn chỉnh theo chiều ngang (`justify-content`):
- `justify-content-start`: Dồn về bên trái.
- `justify-content-end`: Dồn về bên phải.
- `justify-content-center`: Căn giữa.
- `justify-content-between`: Đẩy ra 2 đầu (thường dùng cho Header: Logo bên trái, Menu bên phải).

### Căn chỉnh theo chiều dọc (`align-items`):
- `align-items-center`: Căn giữa theo chiều dọc.

### Ví dụ áp dụng:
```jsx
{/* Căn giữa hoàn toàn một nội dung */}
<div className="d-flex justify-content-center align-items-center" style={{ height: '200px', background: '#f8f9fa' }}>
  <div className="p-3 bg-white shadow">Tôi đang nằm chính giữa!</div>
</div>

{/* Hai nút bấm cách nhau một khoảng */}
<div className="d-flex gap-3 mt-3">
  <Button variant="primary">Lưu lại</Button>
  <Button variant="secondary">Hủy bỏ</Button>
</div>
```

---

## 4. Spacing (Khoảng cách) - Quan trọng nhất
Cú pháp: `{loại}{hướng}-{mức_độ}` (mức độ từ 0 đến 5).
- **Loại:** `m` (Margin - cách bên ngoài), `p` (Padding - cách bên trong).
- **Hướng:**
    - `t` (top), `b` (bottom), `s` (start - bên trái), `e` (end - bên phải).
    - `x` (trái và phải), `y` (trên và dưới).
- **Ví dụ:**
    - `mt-3`: Margin Top mức 3.
    - `px-4`: Padding trái và phải mức 4.
    - `mb-0`: Bỏ hoàn toàn Margin Bottom.

---

## 5. Border & Shadow (Viền và Bóng)
- `border`: Thêm viền nhẹ quanh phần tử.
- `border-0`: Xóa bỏ viền (thường dùng cho Card hoặc Button).
- `rounded-3`: Bo góc tròn mức 3.
- `shadow-sm` / `shadow-lg`: Đổ bóng nhẹ hoặc đậm.

---

## TỔNG KẾT: Tại sao dùng lẫn lộn nhiều cách?
Trong thực tế, bạn sẽ kết hợp chúng:
1. Dùng **Component Props** cho những thứ căn bản nhất (`variant="primary"`).
2. Dùng **Utility Classes** (`className="..."`) để căn lề, khoảng cách nhanh.
3. Dùng **Inline Style** (`style={{ ... }}`) chỉ khi Bootstrap không có option đó (Ví dụ màu sắc thương hiệu riêng `#6fb0de`).

**Quy tắc ưu tiên:** Component Props > Utility Classes > Inline Style.
