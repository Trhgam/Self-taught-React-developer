
# Bài 07: Forms - Xử lý Form trong React

## 📚 Controlled vs Uncontrolled Components

### Controlled Components
Form được controlled bởi React state:

```javascript
function ControlledForm() {
  const [value, setValue] = useState('')
  
  return (
    <input 
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
```

###  Uncontrolled Components
Form tự quản lý state (dùng refs):

```javascript
function UncontrolledForm() {
  const inputRef = useRef()
  
  const handleSubmit = () => {
    console.log(inputRef.current.value)
  }
  
  return <input ref={inputRef} />
}
```

**Khuyến nghị**: Dùng Controlled Components

---

## 🎯 Form Elements

### Text Input
```javascript
const [name, setName] = useState('')
<input 
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

### Textarea
```javascript
const [message, setMessage] = useState('')
<textarea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
/>
```

### Select
```javascript
const [country, setCountry] = useState('')
<select value={country} onChange={(e) => setCountry(e.target.value)}>
  <option value="">Select</option>
  <option value="vn">Vietnam</option>
  <option value="us">USA</option>
</select>
```

### Checkbox
```javascript
const [agreed, setAgreed] = useState(false)
<input 
  type="checkbox"
  checked={agreed}
  onChange={(e) => setAgreed(e.target.checked)}
/>
```

### Radio
```javascript
const [gender, setGender] = useState('')
<>
  <input type="radio" value="male" checked={gender === 'male'} 
    onChange={(e) => setGender(e.target.value)} />
  <input type="radio" value="female" checked={gender === 'female'}
    onChange={(e) => setGender(e.target.value)} />
</>
```

---

## 📝 Form Validation

```javascript
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}
  if (!name) newErrors.name = 'Name required'
  if (!email.includes('@')) newErrors.email = 'Invalid email'
  if (password.length < 6) newErrors.password = 'Min 6 characters'
  return newErrors
}

const handleSubmit = (e) => {
  e.preventDefault()
  const newErrors = validate()
  if (Object.keys(newErrors).length === 0) {
    // Submit
  } else {
    setErrors(newErrors)
  }
}
```

---

## 💡 Best Practices

1. **Always prevent default**: `e.preventDefault()`
2. **Validate on submit and onChange**
3. **Show error messages clearly**
4. **Disable button while submitting**
5. **Clear form after success**
6. **Use controlled components**
---

### 5. Liên hệ với Formik (Người trợ lý thông minh)
Nếu làm theo cách ở Bài 07 (React thuần), bạn giống như một giáo viên phải tự tay đi thu từng tờ giấy, tự chấm từng lỗi, tự nhắc học sinh viết lại. Khi lớp có 50 học sinh (50 ô input), bạn sẽ kiệt sức.

Formik xuất hiện như một "Lớp trưởng trợ lý":

Quản lý thay bạn: Thay vì bạn phải tạo 50 cái useState, Formik nói: "Thầy/Cô cứ đưa danh sách tên học sinh cho em, em tự quản lý hết đống tủ đồ đó cho".

Chấm bài tự động: Formik kết hợp với một anh bạn tên là Yup. Bạn chỉ cần đưa ra luật (ví dụ: Tên phải trên 5 chữ), Formik và Yup sẽ tự báo lỗi cho học sinh mà bạn không cần viết hàm if/else dài dòng.

Làm hết việc vặt: Những việc như e.preventDefault() hay theo dõi xem học sinh đã chạm vào ô nhập liệu chưa (touched), Formik lo từ A-Z.
