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
