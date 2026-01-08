# Ôn tập kiến thức Javascript

Dưới đây là những kiến thức của Javascript mà trong React thường dùng.

Nếu bạn đã nắm chắc được những kiến thức này có thể bỏ qua chương này

- Destructuring, Rest parameter, Spread Syntax
- Tham trị và tham chiếu
- Toán tử logic, template string
- ES6 class và this
- Các loại function: arrow function,
  hoc, currying, callback
- Bất đồng bộ với Promise, async await
- ES6 module
- DOM
- Storage (Local Storage, Cookie, Session Storage)

### Ôn tập Destructuring-Spread Operation-Rest Parameter

#### Destructuring

##### Destructuring với object

```javascript
const user = {
  name: "HongGam",
  age: 21,
  sex: "female",
};

const name = user.name;
const age = user.age;
const sex = user.sex;

//------------------------------

const { name, age: Userage, sex } = user;
console.log(name, age, sex);
```

##### Destructuring với array

```javascript
const list = [
  1,
  function (a, b) {
    return a + b;
  },
];
const [value, sum] = list;
console.log(value, sum(1, 2));
```

---

#### Spread Operation

```javascript
const user = {
  name: "HongGam",
  age: 21,
  ability: ["coding"],
};

const cloneUser = user;
// cloneUser = user vì nó so sánh trên địa chỉ --> 2 chàng trỏ 1 nàng
console.log(cloneUser === user); //true

const cloneUser1 = { ...user };
//shadow copy
console.log(cloneUser1 === user); //false

//nhưng shadow copy này chỉ clone bên ngoài object mà thôi , đối với các thuộc tính obejct của object thì nó vẫn copy dựa trên địa chỉ nên
console.log(cloneUser1.ability === user.ability); //true
```

---

#### Rest Parameter

những tham số còn lại

```javascript
const handle = (a, b, ...c) =>{
    return c
}
consst value = handle(1,2,3,4,5,6)

console.log(value) // [3,4,5,6]
```

---

Sử dụng Rest Parameter kết hợp với Destructuring
phân rã là bỏ đi ngoặc nhọn , chỉ còn biến bên trong

```javascript
const handle = ({ a, b, ...c }) => {
  return c;
};

const value = handle({ a: 3, b: 4, c: 5, d: 6, e: 7 });

console.log(value); // { c: 5, d: 6, e: 7 }  c: 5, d: 6, e: 7
```
