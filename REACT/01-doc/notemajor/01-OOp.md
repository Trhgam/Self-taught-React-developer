1. Định nghĩa OOP (Object-Oriented Programming)

Lập trình hướng đối tượng là một phương pháp lập trình dựa trên khái niệm về "đối tượng" (objects). Thay vì tập trung vào các hàm và logic xử lý tuần tự, OOP tập trung vào việc tổ chức dữ liệu thành các thực thể chứa cả thuộc tính (dữ liệu) và phương thức (hành động).

2. Bốn tính chất cơ bản của OOP

Tính Đóng gói (Encapsulation): Giúp che giấu các chi tiết thực thi bên trong và chỉ để lộ ra các giao tiếp cần thiết. Điều này bảo vệ trạng thái của đối tượng khỏi sự can thiệp không mong muốn từ bên ngoài.

Tính Kế thừa (Inheritance): Cho phép một lớp (Class) con kế thừa lại các đặc tính và hành vi từ lớp cha. Điều này giúp tái sử dụng mã nguồn và thiết lập mối quan hệ phân cấp giữa các đối tượng.

Tính Đa hình (Polymorphism): Cho phép các đối tượng khác nhau thực thi cùng một phương thức theo những cách khác nhau. Điều này thường được thực hiện thông qua việc ghi đè phương thức (Overriding) hoặc nạp chồng phương thức (Overloading).

Tính Trừu tượng (Abstraction): Tập trung vào những đặc điểm cốt lõi của đối tượng và bỏ qua các chi tiết triển khai rườm rà. Bạn chỉ cần biết đối tượng đó làm được gì mà không cần quan tâm nó làm như thế nào.

3. Bộ nguyên tắc SOLID

SOLID là 5 nguyên tắc thiết kế giúp phần mềm dễ duy trì, mở rộng và ít lỗi hơn khi dự án phát triển lớn dần.

__S - Single Responsibility Principle (Nguyên tắc đơn trách nhiệm):__ Mỗi một Class chỉ nên đảm nhận một nhiệm vụ duy nhất. Nếu một Class làm quá nhiều việc, khi thay đổi một tính năng sẽ dễ làm hỏng các tính năng khác.

O - Open/Closed Principle (Nguyên tắc Đóng/Mở): Một thực thể phần mềm (class, module, function) nên "mở cho việc mở rộng" nhưng "đóng cho việc sửa đổi". Nghĩa là khi muốn thêm tính năng mới, ta nên viết thêm code thay vì sửa trực tiếp vào code cũ đang chạy ổn định.

L - Liskov Substitution Principle (Nguyên tắc thay thế Liskov): Các đối tượng của lớp con phải có thể thay thế cho đối tượng của lớp cha mà không làm thay đổi tính đúng đắn của chương trình.

I - Interface Segregation Principle (Nguyên tắc phân tách Interface): Thay vì dùng một Interface lớn cho nhiều mục đích, ta nên chia nhỏ thành nhiều Interface cụ thể. Các lớp không nên bị ép buộc phải triển khai những phương thức mà chúng không sử dụng.

D - Dependency Inversion Principle (Nguyên tắc đảo ngược phụ thuộc): Các module cấp cao không nên phụ thuộc vào các module cấp thấp, cả hai nên phụ thuộc vào sự trừu tượng (Abstraction/Interface). Điều này giúp code linh hoạt, không bị dính chặt (tight coupling) vào một implementation cụ thể nào.

4. Các thành phần quan trọng khác
Class (Lớp): Là bản thiết kế hoặc khuôn mẫu cho các đối tượng.

Object (Đối tượng): Là một thực thể cụ thể được tạo ra từ Class.

Constructor (Hàm khởi tạo): Phương thức đặc biệt được gọi khi một đối tượng được tạo ra để thiết lập các giá trị ban đầu.

Interface/Abstract Class: Các "hợp đồng" định nghĩa các hành vi mà một lớp phải có nhưng không trực tiếp thực hiện logic.
