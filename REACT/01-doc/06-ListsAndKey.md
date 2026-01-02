
# Bài 06: Lists & Keys - Render Danh Sách

##  Lý thuyết

### Rendering Lists

Để render một array trong React, sử dụng `.map()`:

```javascript
const numbers = [1, 2, 3, 4, 5];

function NumberList() {
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number}>{number}</li>
      ))}
    </ul>
  );
}
```

---

##  Keys

#### Keys là gì?

**Keys** giúp React xác định items nào đã thay đổi, được thêm, hoặc bị xóa.

```javascript
const todos = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build App' }
]

<ul>
  {todos.map(todo => (
    <li key={todo.id}>{todo.text}</li>
  ))}
</ul>
```

### Tại sao cần Keys?

```javascript
// ❌ Không có key - React không biết item nào là nào
{
  items.map((item) => <Item />);
}

// ✅ Có key - React track được từng item
{
  items.map((item) => <Item key={item.id} />);
}
```

### Chọn Keys đúng cách

```javascript
// ✅ Best: Unique ID từ data
<li key={user.id}>{user.name}</li>

// ⚠️ OK: Nếu data stable và không re-order
<li key={index}>{item}</li>

// ❌ Bad: Random hoặc Date.now()
<li key={Math.random()}>{item}</li>
<li key={Date.now()}>{item}</li>
```

### Keys với Index

```javascript
// ⚠️ Chỉ dùng index khi:
// - List stable (không thay đổi)
// - Items không có ID
// - List không re-order

{
  items.map((item, index) => <li key={index}>{item}</li>);
}

// ❌ Không dùng index khi:
// - Items có thể re-order
// - Items có thể thêm/xóa ở giữa
// - Items có ID riêng
```

---

## 📝 Patterns

### Basic List

```javascript
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

### List với Components

```javascript
function TodoList({ todos }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
```

### Nested Lists

```javascript
function CategoryList({ categories }) {
  return (
    <div>
      {categories.map((category) => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <ul>
            {category.items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

### Conditional Items

```javascript
function ProductList({ products }) {
  return (
    <div>
      {products
        .filter((product) => product.inStock)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
}
```

### Extracting List Item Component

```javascript
// Component riêng cho list item
function ListItem({ value }) {
  return <li>{value}</li>;
}

// Parent component
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number} value={number} />
      ))}
    </ul>
  );
}
```

---

## ⚠️ Common Mistakes

### 1. Missing Keys

```javascript
// ❌ Warning: Each child should have unique "key" prop
{
  items.map((item) => <div>{item}</div>);
}

// ✅ Correct
{
  items.map((item) => <div key={item.id}>{item}</div>);
}
```

### 2. Non-Unique Keys

```javascript
// ❌ Duplicate keys
{
  items.map((item) => <div key="same">{item}</div>);
}

// ✅ Unique keys
{
  items.map((item) => <div key={item.id}>{item}</div>);
}
```

### 3. Keys on Fragments

```javascript
// ❌ Key on wrong element
{
  items.map((item) => (
    <React.Fragment>
      <div key={item.id}>{item.name}</div>
    </React.Fragment>
  ));
}

// ✅ Key on Fragment
{
  items.map((item) => (
    <React.Fragment key={item.id}>
      <div>{item.name}</div>
      <div>{item.description}</div>
    </React.Fragment>
  ));
}
```

---

## 💡 Best Practices

### 1. Use Stable IDs

```javascript
// ✅ Database ID
<Item key={item.id} />

// ✅ UUID
<Item key={item.uuid} />

// ✅ Unique combination
<Item key={`${item.type}-${item.id}`} />
```

### 2. Keys Should Be Unique Among Siblings

```javascript
// ✅ OK - Different lists
<div>
  {users.map(user => <div key={user.id}>{user.name}</div>)}
</div>
<div>
  {posts.map(post => <div key={post.id}>{post.title}</div>)}
</div>
```

### 3. Don't Pass Key as Prop

```javascript
// ❌ key không được pass như prop
function Item({ key, name }) {
  // key undefined
  return <div>{name}</div>;
}

// ✅ Pass ID separately
function Item({ id, name }) {
  return <div data-id={id}>{name}</div>;
}

<Item key={item.id} id={item.id} name={item.name} />;
```

### 4. Map Inside JSX vs Variable

```javascript
// ✅ Inside JSX - Clean
return (
  <ul>
    {items.map((item) => (
      <li key={item.id}>{item}</li>
    ))}
  </ul>
);

// ✅ Variable - When complex logic
const listItems = items.map((item) => <li key={item.id}>{item}</li>);

return <ul>{listItems}</ul>;
```

---

## 🎨 Advanced Patterns

### Empty State

```javascript
function List({ items }) {
  if (items.length === 0) {
    return <p>No items found</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### With Index When Needed

```javascript
function List({ items }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={item.id}>
          #{index + 1} - {item.name}
        </li>
      ))}
    </ol>
  );
}
```

### Dynamic Grouping

```javascript
function GroupedList({ items }) {
  // Group by category
  const grouped = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {items.map((item) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
```

---

## 📝 Tóm tắt

- Dùng `.map()` để render lists
- **Keys** bắt buộc và phải unique
- Keys giúp React identify items
- Dùng stable ID, không phải index (trừ khi list stable)
- Keys chỉ cần unique trong siblings
- Keys không được pass như props
- Handle empty states
- Extract list item components khi phức tạp

---

## 🎯 Bài tiếp theo


