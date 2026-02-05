### CSS Pseudo-classes
A CSS pseudo-class is a keyword that can be added to a selector, to define a style for a special state of an element.
##### Các trường hợp sử dụng Pseudo-classes phổ biến
Interactive Pseudo-classes
| Trường hợp sử dụng | Pseudo-class | Mô tả |
| :--- | :--- | :--- |
| **Khi di chuột qua** | `:hover` | Định dạng phần tử khi người dùng di chuyển con trỏ chuột lên trên nó. |
| **Trạng thái liên kết** | `:link` / `:visited` | Phân biệt giữa liên kết chưa truy cập và liên kết đã truy cập. |
| **Khi được tiêu điểm** | `:focus` | Định dạng phần tử (như ô input, button) khi người dùng nhấn vào hoặc dùng phím Tab. |
| **Trạng thái Form** | `:valid` / `:invalid` | Định dạng dựa trên việc dữ liệu nhập vào đúng hay sai quy tắc. |
| **Trường bắt buộc** | `:required` / `:optional` | Định dạng các ô nhập liệu là bắt buộc hoặc không bắt buộc. |
| **Phần tử con đầu tiên** | `:first-child` | Định dạng phần tử nếu nó là con đầu tiên trong thẻ cha của nó. |


```css

/* Thay đổi màu nền khi di chuột qua nút */
button:hover {
  background-color: #2ecc71;
  cursor: pointer;
}

/* Đổi màu viền khi người dùng nhấn vào ô nhập liệu (Focus) */
input:focus {
  border: 2px solid #3498db;
  outline: none;
}

/* Hiệu ứng khi đang nhấn giữ chuột trên thẻ <a> */
a:active {
  color: red;
}


/* --- 2. Structural Pseudo-classes (Dựa trên cấu trúc HTML) --- */

/* Chọn phần tử <li> đầu tiên trong danh sách */
li:first-child {
  font-weight: bold;
  color: #e74c3c;
}

/* Chọn các hàng chẵn trong bảng để làm hiệu ứng sọc (Zebra stripes) */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Chọn phần tử con cuối cùng */
p:last-child {
  margin-bottom: 0;
}


/* --- 3. Form Pseudo-classes (Trạng thái của Form) --- */

/* Hiện viền đỏ khi dữ liệu nhập vào không hợp lệ (ví dụ: sai định dạng email) */
input:invalid {
  border-color: #e74c3c;
}

/* Hiện viền xanh khi dữ liệu đã đúng quy tắc */
input:valid {
  border-color: #2ecc71;
}

/* Định dạng cho các ô input bắt buộc phải nhập */
input:required {
  background-color: #fff9c4;
}
```
---

Structure Pseudo-classes
| Pseudo-class | Vị trí lựa chọn | Giải thích chi tiết |
| :--- | :--- | :--- |
| **`:first-child`** | Con đầu tiên | Chọn phần tử nếu nó là con đầu tiên trong thẻ cha của nó. |
| **`:last-child`** | Con cuối cùng | Chọn phần tử nếu nó là con cuối cùng trong thẻ cha của nó. |
| **`:nth-child(n)`** | Con thứ **n** | Chọn phần tử con thứ **n** (có thể dùng số cụ thể, từ khóa `even`/`odd`, hoặc công thức `an+b`). |
| **`:lang(code)`** | Theo ngôn ngữ | Chọn các phần tử được xác định ngôn ngữ cụ thể (ví dụ: `:lang(vi)` cho tiếng Việt). |
---

### CSS Pseudo-elements
| Pseudo-element | Mục đích sử dụng | Giải thích chi tiết |
| :--- | :--- | :--- |
| **`::first-letter`** | Chữ cái đầu tiên | Định dạng chữ cái đầu tiên của một đoạn văn (thường dùng làm Drop Cap). |
| **`::first-line`** | Dòng đầu tiên | Định dạng dòng văn bản đầu tiên của một khối. |
| **`::before`** | Chèn phía trước | Chèn thêm nội dung hoặc trang trí vào trước nội dung của phần tử. |
| **`::after`** | Chèn phía sau | Chèn thêm nội dung hoặc trang trí vào sau nội dung của phần tử. |
| **`::marker`** | Dấu đầu dòng | Định dạng các ký hiệu đầu dòng của danh sách (dấu chấm, số). |
| **`::selection`** | Phần được chọn | Định dạng phần văn bản mà người dùng đang bôi đen bằng chuột. |
| **`::backdrop`** | Nền phía sau | Định dạng lớp nền (overlay) nằm phía sau một hộp thoại (`<dialog>`). |

## Code ví dụ minh họa

```css
/* Phóng to chữ cái đầu dòng */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
  color: red;
}

/* Thêm icon trước tiêu đề */
h2::before {
  content: "📍 ";
}

/* Thay đổi màu nền khi bôi đen văn bản */
::selection {
  background: yellow;
  color: black;
}

/* Đổi màu dấu chấm đầu dòng của list */
li::marker {
  color: blue;
}

```
---

### CSS 2D Transformation Functions

| Hàm | Chức năng | Giải thích chi tiết |
| :--- | :--- | :--- |
| **`translate(x, y)`** | Di chuyển | Di chuyển phần tử khỏi vị trí gốc theo trục X (ngang) và Y (dọc). |
| **`rotate(angle)`** | Quay | Quay phần tử theo một góc (ví dụ: `45deg`). Số dương quay theo chiều kim đồng hồ. |
| **`scale(x, y)`** | Co giãn | Thay đổi kích thước phần tử. `1` là giữ nguyên, `>1` là phóng to, `<1` là thu nhỏ. |
| **`scaleX(n)`** | Co giãn ngang | Chỉ thay đổi chiều rộng của phần tử. |
| **`scaleY(n)`** | Co giãn dọc | Chỉ thay đổi chiều cao của phần tử. |
| **`skew(x, y)`** | Nghiêng | Làm nghiêng phần tử theo trục X và Y một góc nhất định. |
| **`skewX(angle)`** | Nghiêng ngang | Nghiêng phần tử dọc theo trục X. |
| **`skewY(angle)`** | Nghiêng dọc | Nghiêng phần tử dọc theo trục Y. |
| **`matrix(a,b,c,d,e,f)`** | Ma trận | Kết hợp tất cả 6 hàm trên (scale, skew, translate) vào một dòng code. |

```css
/* Di chuyển phần tử sang phải 50px và xuống 20px */
.box-move {
  transform: translate(50px, 20px);
}

/* Quay phần tử 30 độ */
.box-rotate {
  transform: rotate(30deg);
}

/* Phóng to đều 1.2 lần */
.box-scale {
  transform: scale(1.2);
}

/* Nghiêng trục X 20 độ */
.box-skew {
  transform: skewX(20deg);
}

/* Kết hợp nhiều hiệu ứng cùng lúc */
.box-complex {
  /* Di chuyển -> Quay -> Phóng to */
  transform: translate(10px, 10px) rotate(15deg) scale(1.1);
}

/* Sử dụng ma trận (Matrix) */
/* Cú pháp: matrix(scaleX(), skewY(), skewX(), scaleY(), translateX(), translateY()) */
.box-matrix {
  transform: matrix(1, 0.5, 0, 1, 0, 0);
}
```
---
