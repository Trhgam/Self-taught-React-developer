# Bài 01: Giới thiệu React & Thiết lập môi trường

##  Lý thuyết

### React là gì?

React là một thư viện JavaScript mã nguồn mở được phát triển bởi Facebook (Meta) dùng để xây dựng giao diện người dùng (UI), đặc biệt là cho các ứng dụng single-page.

### Đặc điểm chính của React

#### 1. **Component-Based Architecture**
- Chia nhỏ UI thành các component độc lập, có thể tái sử dụng
- Mỗi component quản lý state riêng của nó
- Dễ dàng maintain và scale

#### 2. **Virtual DOM**
- React tạo ra một bản sao của DOM trong bộ nhớ
- Khi có thay đổi, React so sánh Virtual DOM với Real DOM
- Chỉ update những phần thay đổi → Hiệu năng cao

```
User Action → State Change → Virtual DOM Update → Diffing → Real DOM Update
```

#### 3. **Declarative**
- Bạn mô tả UI sẽ như thế nào
- React lo việc cập nhật DOM
- Code dễ đọc, dễ debug

```javascript
// Declarative (React)
<div>{isLoggedIn ? <UserPanel /> : <LoginForm />}</div>

// vs Imperative (Vanilla JS)
if (isLoggedIn) {
  div.innerHTML = '<div>User Panel</div>';
} else {
  div.innerHTML = '<div>Login Form</div>';
}
```

#### 4. **One-way Data Flow**
- Dữ liệu chảy từ trên xuống (parent → child)
- Dễ dàng debug và trace data
- Tránh side effects

### Tại sao học React?

✅ **Phổ biến nhất** - Cộng đồng lớn, nhiều công việc  
✅ **Hiệu năng cao** - Virtual DOM tối ưu render  
✅ **Tái sử dụng** - Component có thể dùng lại nhiều nơi  
✅ **Ecosystem phong phú** - React Router, Redux, Next.js...  
✅ **React Native** - Có thể làm mobile app  
✅ **Backed by Meta** - Được hỗ trợ bởi công ty lớn  

### React vs Angular vs Vue

| Tiêu chí | React | Angular | Vue |
|----------|-------|---------|-----|
| Loại | Library | Framework | Progressive Framework |
| Học | Trung bình | Khó | Dễ |
| Performance | Cao | Trung bình | Cao |
| Size | Nhỏ (~40KB) | Lớn (~500KB) | Nhỏ (~30KB) |
| Language | JavaScript/JSX | TypeScript | JavaScript |
| Learning Curve | Vừa phải | Dốc | Thoải mái |

### Kiến thức cần có trước khi học React

#### JavaScript ES6+ (Bắt buộc)
- Arrow Functions
- Destructuring
- Spread Operator
- Template Literals
- Modules (import/export)
- Promises & Async/Await
- Array Methods (map, filter, reduce)

#### HTML & CSS (Cơ bản)
- HTML semantic tags
- CSS Flexbox & Grid
- Responsive Design

#### Node.js & npm (Công cụ)
- Cài đặt packages
- Chạy scripts

---

## 🛠️ Thiết lập môi trường

### 1. Cài đặt Node.js

Tải và cài đặt từ: https://nodejs.org/

```bash
# Kiểm tra version
node --version  # v18.0.0 trở lên
npm --version   # v8.0.0 trở lên
```

### 2. Tạo React App với Vite (Khuyến nghị)

```bash
# Tạo project mới
npm create vite@latest my-react-app -- --template react

# Di chuyển vào folder
cd my-react-app

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

### 3. Tạo React App với Create React App (CRA)

```bash
# Tạo project mới
npx create-react-app my-react-app

# Di chuyển vào folder
cd my-react-app

# Chạy development server
npm start
```

### 4. Cấu trúc thư mục React App

```
my-react-app/
├── node_modules/       # Dependencies
├── public/            # Static files
│   └── index.html     # HTML template
├── src/               # Source code
│   ├── App.jsx        # Main component
│   ├── main.jsx       # Entry point
│   └── index.css      # Styles
├── package.json       # Project config
└── vite.config.js     # Vite config
```

### 5. Editor & Extensions

**VS Code Extensions:**
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Auto Rename Tag
- Bracket Pair Colorizer

### 6. React Developer Tools

Cài đặt extension trên Chrome/Firefox:
- React Developer Tools

Giúp debug React apps dễ dàng hơn.

---

##  Concepts cơ bản

### JSX (JavaScript XML)

```javascript
const element = <h1>Hello, React!</h1>;
```

JSX cho phép viết HTML trong JavaScript.

### Component

```javascript
function Welcome() {
  return <h1>Welcome to React!</h1>;
}
```

Component là building block của React app.

### Props & State

- **Props**: Dữ liệu truyền từ parent → child (immutable)
- **State**: Dữ liệu nội bộ của component (mutable)

---

##  Tóm tắt

- React là thư viện UI component-based
- Sử dụng Virtual DOM để tối ưu performance
- Declarative và one-way data flow
- Cần biết JavaScript ES6+ trước khi học
- Sử dụng Vite hoặc CRA để tạo project
- Cài đặt React DevTools để debug

---

##  Bài tiếp theo

Trong bài tiếp theo, chúng ta sẽ học về **JSX** - cú pháp đặc biệt của React!