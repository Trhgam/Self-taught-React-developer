
# Bài 05: State & Events - Quản lý trạng thái và Xử lý sự kiện

## 📚 Lý thuyết

### State là gì?

**State** là dữ liệu nội bộ của component, có thể thay đổi theo thời gian. Khi state thay đổi, React tự động re-render component.

---

### Props vs State

| Props            | State                        |
| ---------------- | ---------------------------- |
| Truyền từ parent xuống childrent | Quản lý bởi chính component  |
| Read-only        | Có thể thay đổi              |
| Immutable        | Mutable (thông qua setState) |
| Từ bên ngoài     | Từ bên trong                 |

```javascript
// Props - từ parent
function Child({ name }) {
  return <h1>Hello { name } !!!</h1>;
}

// State - internal
function Counter() {
  const [count, setCount] = useState(0);
  return <div>{ count }</div>;
}
```

---

##  useState Hook

### Basic Usage

```javascript
import { useState } from "react";

function Counter() {
  // Declare state variable
  const [count, setCount] = useState(0);
  //     ^state  ^setter    ^initial value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
khi khai báo và sử dụng useState thì sẽ được cung cấp 1 hàm setter để cập nhật dữ liệu khi re-render lại 
có thể xêm thêm ở 02-practice/05-statePractice

---

### Multiple State Variables
Một component có thẻ có nhiều State được sử dụng , ví dụ nhưu việc xử lý 1 form vì nó chứa nhiều cấu trúc phức tạp cần render và check Validate liên tục.


```javascript
function Form() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  return <div>...</div>;
}
```

### State với Different Types

```javascript
// String
const [name, setName] = useState("John");

// Number
const [age, setAge] = useState(25);

// Boolean
const [isOpen, setIsOpen] = useState(false);

// Array
const [items, setItems] = useState([]);
const [todos, setTodos] = useState(["Learn React", "Build App"]);

// Object
const [user, setUser] = useState({
  name: "John",
  age: 25,
  email: "john@example.com",
});

// Null
const [data, setData] = useState(null);
```
---

### Lazy Initial State

Nếu initial state cần tính toán phức tạp:

```javascript
// ❌ Tính toán mỗi lần render
const [state, setState] = useState(expensiveCalculation());

// ✅ Chỉ tính toán lần đầu
const [state, setState] = useState(() => expensiveCalculation());

// Example
const [todos, setTodos] = useState(() => {
  const saved = localStorage.getItem("todos");
  return saved ? JSON.parse(saved) : [];
});
```

---

## 🔄 Updating State

### Cập nhật State cơ bản

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### Functional Updates

Khi state mới phụ thuộc vào state cũ:

```javascript
// ❌ Có thể có vấn đề với multiple updates
setCount(count + 1);

// ✅ Đúng cách - sử dụng previous state
setCount((prevCount) => prevCount + 1);

// Example: Multiple updates
function handleClick() {
  // ❌ Chỉ tăng 1
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);

  // ✅ Tăng 3
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}
```

### Updating Objects

```javascript
const [user, setUser] = useState({
  name: "John",
  age: 25,
  email: "john@example.com",
});

// ❌ WRONG - Mutating state
user.name = "Jane";

// ❌ WRONG - Losing other properties
setUser({ name: "Jane" });

// ✅ CORRECT - Spread và override
setUser({
  ...user,
  name: "Jane",
});

// ✅ CORRECT - With functional update
setUser((prevUser) => ({
  ...prevUser,
  name: "Jane",
  age: prevUser.age + 1,
}));

// Nested objects
const [user, setUser] = useState({
  name: "John",
  address: {
    city: "Hanoi",
    country: "Vietnam",
  },
});

// Update nested
setUser((prev) => ({
  ...prev,
  address: {
    ...prev.address,
    city: "Ho Chi Minh",
  },
}));
```
##### Tại sao phải spread object ra thì mới được update lại ? 
Vì quy tắc Immutability (Tính bất biến) của State.
React sử dụng phép so sánh nông (shallow comparison) để kiểm tra xem State có thay đổi hay không.

Nếu bạn không phân rã: Tức là đang chỉnh sửa trực tiếp (mutate) trên vùng nhớ cũ của object. React thấy địa chỉ vùng nhớ không đổi nên nó nghĩ "State vẫn vậy" và không chịu render lại giao diện.

Khi bạn phân rã: Bạn đang tạo ra một Object hoàn toàn mới (địa chỉ vùng nhớ mới) nhưng vẫn giữ lại các thuộc tính cũ. React thấy "Ồ, đây là một object mới", và nó sẽ thực hiện re-render.

Nên đối với object khi muốn update lại bạn phải thực hiện phân ra object ra trước nhé !!


#### Lưu ý quan trong đối với các object có sở hữu object khác.

buộc bạn phải phân rã object lớn , và lấy objectt lớn gọi ra thuộc tính obejct bị sở hữa để phân rã tiếp , tức là phân rã phân tầng đối với object có sở hữu object.


---

### Updating Arrays

```javascript
const [items, setItems] = useState([1, 2, 3]);

// ❌ WRONG - Mutating
items.push(4);

// ✅ Add item
setItems([...items, 4]);
setItems((prev) => [...prev, 4]);

// ✅ Remove item
setItems(items.filter((item) => item !== 2));

// ✅ Update item
setItems(items.map((item) => (item === 2 ? 20 : item)));

// ✅ Insert at index
const index = 1;
setItems([...items.slice(0, index), newItem, ...items.slice(index)]);

// Complex array of objects
const [todos, setTodos] = useState([
  { id: 1, text: "Learn React", done: false },
]);

// Add todo
setTodos([...todos, { id: 2, text: "Build App", done: false }]);

// Toggle done
setTodos(
  todos.map((todo) => (todo.id === 1 ? { ...todo, done: !todo.done } : todo))
);

// Remove todo
setTodos(todos.filter((todo) => todo.id !== 1));
```

---

## 🖱️ Event Handling

### onClick Event

```javascript
function Button() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Với tham số
function Button() {
  const handleClick = (message) => {
    alert(message);
  };

  return <button onClick={() => handleClick("Hello!")}>Click me</button>;
}
```

### onChange Event (Forms)

```javascript
function Input() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return <input type="text" value={value} onChange={handleChange} />;
}

// Shorthand
<input value={value} onChange={(e) => setValue(e.target.value)} />;
```

### onSubmit Event

```javascript
function Form() {
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    console.log("Submitted:", name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Common Events

```javascript
function EventExamples() {
  return (
    <div>
      {/* Click events */}
      <button onClick={handleClick}>Click</button>
      <button onDoubleClick={handleDoubleClick}>Double Click</button>

      {/* Mouse events */}
      <div onMouseEnter={handleMouseEnter}>Hover me</div>
      <div onMouseLeave={handleMouseLeave}>Leave me</div>
      <div onMouseMove={handleMouseMove}>Move</div>

      {/* Form events */}
      <input onChange={handleChange} />
      <input onFocus={handleFocus} />
      <input onBlur={handleBlur} />
      <form onSubmit={handleSubmit} />

      {/* Keyboard events */}
      <input onKeyDown={handleKeyDown} />
      <input onKeyUp={handleKeyUp} />
      <input onKeyPress={handleKeyPress} />

      {/* Other events */}
      <input onCopy={handleCopy} />
      <input onPaste={handlePaste} />
      <input onCut={handleCut} />
      <div onScroll={handleScroll} />
    </div>
  );
}
```

### Event Object

```javascript
function Input() {
  const handleChange = (event) => {
    console.log(event.target.value); // Input value
    console.log(event.target.name); // Input name
    console.log(event.type); // Event type: "change"
    console.log(event.currentTarget); // Element với handler
  };

  const handleKeyDown = (event) => {
    console.log(event.key); // Key pressed: "Enter"
    console.log(event.code); // Key code: "Enter"
    console.log(event.keyCode); // Number code
    console.log(event.shiftKey); // Shift pressed?
    console.log(event.ctrlKey); // Ctrl pressed?
    console.log(event.altKey); // Alt pressed?

    if (event.key === "Enter") {
      // Handle Enter key
    }
  };

  return <input onChange={handleChange} onKeyDown={handleKeyDown} />;
}
```

---

## 🎨 Patterns & Best Practices

### Pattern 1: Controlled Components

```javascript
function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      value={value} // Value from state
      onChange={(e) => setValue(e.target.value)} // Update state
    />
  );
}
```

### Pattern 2: Toggle State

```javascript
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  // Hoặc:
  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <button onClick={toggle}>{isOpen ? "Close" : "Open"}</button>
      {isOpen && <div>Content</div>}
    </div>
  );
}
```

### Pattern 3: List Management

```javascript
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: input, done: false }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return <div>...</div>;
}
```

### Pattern 4: Form Handling

```javascript
function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
      <input
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        name="terms"
        type="checkbox"
        checked={formData.terms}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## ⚠️ Common Mistakes

### 1. Direct State Mutation

```javascript
// ❌ WRONG
const [user, setUser] = useState({ name: "John" });
user.name = "Jane"; // Mutating!

// ✅ CORRECT
setUser({ ...user, name: "Jane" });
```

### 2. State Update Timing

```javascript
// ❌ State updates are asynchronous
const [count, setCount] = useState(0);

const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still 0! (old value)
};

// ✅ Use useEffect to react to state changes
useEffect(() => {
  console.log(count); // Updated value
}, [count]);
```

### 3. Missing Functional Update

```javascript
// ❌ May cause issues
const increment = () => {
  setCount(count + 1);
  setCount(count + 1); // Still only increments by 1
};

// ✅ Use functional update
const increment = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1); // Increments by 2
};
```

### 4. Event Handler Inline

```javascript
// ❌ Creates new function every render
<button onClick={() => console.log('clicked')}>
  Click me
</button>

// ✅ Define outside (better for performance)
const handleClick = () => console.log('clicked')
<button onClick={handleClick}>Click me</button>
```

---

## 💡 Best Practices

### 1. Naming Conventions

```javascript
// State
const [isOpen, setIsOpen] = useState(false);
const [hasError, setHasError] = useState(false);
const [count, setCount] = useState(0);
const [user, setUser] = useState(null);

// Event handlers
const handleClick = () => {};
const handleChange = () => {};
const handleSubmit = () => {};
const handleToggle = () => {};
```

### 2. Tổ chức State

```javascript
// ❌ Too many states
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [address, setAddress] = useState("");

// ✅ Group related state
const [user, setUser] = useState({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
});
```

### 3. Keep State Minimal

```javascript
// ❌ Redundant state
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState(""); // Can be calculated!

// ✅ Calculate from existing state
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const fullName = `${firstName} ${lastName}`;
```

---

## 📝 Tóm tắt

- **State** là dữ liệu có thể thay đổi của component
- **useState** hook để quản lý state
- State updates trigger re-render
- **Immutability** - không mutate state trực tiếp
- **Functional updates** khi state mới phụ thuộc state cũ
- **Events** để tương tác với users
- **Controlled components** cho forms
- State updates are **asynchronous**

---

## 🎯 Bài tiếp theo

Bài 06: **Lists & Keys** - Render danh sách dữ liệu!
