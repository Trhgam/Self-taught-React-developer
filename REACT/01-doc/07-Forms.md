
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

Chuyển sang **Bài 08**!
