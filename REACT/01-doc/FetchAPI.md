# Bài 21: Fetch API - Data Fetching trong React

## 📋 Mục tiêu bài học

Sau bài học này, bạn sẽ:

-   ✅ Hiểu rõ Fetch API là gì và cách hoạt động
-   ✅ Biết cách thực hiện các HTTP requests (GET, POST, PUT, DELETE)
-   ✅ Xử lý responses và errors một cách chuyên nghiệp
-   ✅ Quản lý loading states và error states
-   ✅ Sử dụng AbortController để cancel requests
-   ✅ Áp dụng best practices khi fetch data trong React

---

## 1️⃣ Fetch API là gì?

### Khái niệm

**Fetch API** là một interface hiện đại của JavaScript để thực hiện HTTP requests. Nó được built-in trong browser và trả về **Promises**, giúp code dễ đọc và dễ maintain hơn so với XMLHttpRequest cũ.

### Tại sao dùng Fetch API?

✅ **Promise-based**: Dễ dàng sử dụng với async/await  
✅ **Clean syntax**: Code ngắn gọn, dễ đọc  
✅ **Built-in**: Không cần cài thêm library  
✅ **Flexible**: Hỗ trợ đầy đủ HTTP methods  
✅ **Stream support**: Có thể xử lý streaming data

### Khi nào dùng Fetch API?

-   ✅ Ứng dụng đơn giản, không cần nhiều features phức tạp
-   ✅ Muốn giảm bundle size (không cần thêm library)
-   ✅ Làm việc với modern browsers
-   ❌ Cần interceptors → Dùng Axios
-   ❌ Cần automatic retry → Dùng Axios hoặc React Query
-   ❌ Cần upload progress → Dùng Axios

---

## 2️⃣ Cú pháp cơ bản

### Syntax

```javascript
fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
```

### Parameters

**1. `url`** (required): String - URL của resource cần fetch

**2. `options`** (optional): Object - Configuration cho request

```javascript
{
  method: 'GET',        // GET, POST, PUT, DELETE, PATCH
  headers: {            // Request headers
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token'
  },
  body: JSON.stringify(data), // Request body (không dùng với GET)
  mode: 'cors',         // cors, no-cors, same-origin
  credentials: 'same-origin', // include, same-origin, omit
  cache: 'default',     // default, no-cache, reload, force-cache
  redirect: 'follow',   // follow, error, manual
  signal: abortController.signal // Để cancel request
}
```

---

## 3️⃣ GET Request - Lấy dữ liệu

### Basic GET Request

```javascript
import { useState, useEffect } from 'react'

function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                // Kiểm tra response có OK không (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                return response.json()
            })
            .then(data => {
                setUsers(data)
                setLoading(false)
            })
            .catch(error => {
                setError(error.message)
                setLoading(false)
            })
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>

    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    )
}
```

### GET Request với Async/Await (Recommended)

```javascript
function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch(
                    'https://jsonplaceholder.typicode.com/users'
                )

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setUsers(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // ... render logic
}
```

### ⚠️ LƯU Ý QUAN TRỌNG

> **Fetch API không tự động throw error cho HTTP errors!**
>
> Fetch chỉ reject promise khi có **network error** (mất mạng, DNS fail, etc.)
>
> Với HTTP errors (404, 500, etc.), fetch vẫn resolve promise nhưng `response.ok` sẽ là `false`
>
> ➡️ **Luôn kiểm tra `response.ok` trước khi parse data!**

```javascript
// ❌ SAI - Không kiểm tra response.ok
const data = await response.json() // Có thể parse error HTML thành JSON → crash!

// ✅ ĐÚNG - Kiểm tra response.ok
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()
```

---

## 4️⃣ POST Request - Tạo dữ liệu mới

### Basic POST Request

```javascript
function CreateUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        email,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data = await response.json()
            console.log('Created user:', data)
            setSuccess(true)
            setName('')
            setEmail('')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create User'}
            </button>
            {error && <div className="error">{error}</div>}
            {success && (
                <div className="success">User created successfully!</div>
            )}
        </form>
    )
}
```

### POST với FormData (Upload files)

```javascript
function UploadAvatar() {
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleSubmit = async e => {
        e.preventDefault()
        if (!file) return

        const formData = new FormData()
        formData.append('avatar', file)
        formData.append('userId', '123')

        setUploading(true)
        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                // ⚠️ KHÔNG set Content-Type khi dùng FormData
                // Browser sẽ tự động set với boundary
                body: formData,
            })

            if (!response.ok) throw new Error('Upload failed')

            const data = await response.json()
            console.log('Upload success:', data)
        } catch (error) {
            console.error('Upload error:', error)
        } finally {
            setUploading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                onChange={e => setFile(e.target.files[0])}
                accept="image/*"
            />
            <button type="submit" disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload'}
            </button>
        </form>
    )
}
```

---

## 5️⃣ PUT Request - Cập nhật dữ liệu

### Full Update với PUT

```javascript
function UpdateUser({ userId }) {
    const [user, setUser] = useState({ name: '', email: '' })
    const [loading, setLoading] = useState(false)

    const handleUpdate = async () => {
        setLoading(true)
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(user),
                }
            )

            if (!response.ok) throw new Error('Update failed')

            const updatedUser = await response.json()
            console.log('Updated:', updatedUser)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <input
                value={user.name}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <input
                value={user.email}
                onChange={e => setUser({ ...user, email: e.target.value })}
            />
            <button onClick={handleUpdate} disabled={loading}>
                Update
            </button>
        </div>
    )
}
```

### Partial Update với PATCH

```javascript
// PATCH chỉ update các fields được gửi lên
const handlePartialUpdate = async () => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: 'New Name', // Chỉ update name, giữ nguyên các fields khác
        }),
    })

    const data = await response.json()
}
```

---

## 6️⃣ DELETE Request - Xóa dữ liệu

```javascript
function DeleteUser({ userId, onDelete }) {
    const [deleting, setDeleting] = useState(false)

    const handleDelete = async () => {
        if (!window.confirm('Are you sure?')) return

        setDeleting(true)
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${userId}`,
                {
                    method: 'DELETE',
                }
            )

            if (!response.ok) throw new Error('Delete failed')

            // DELETE thường trả về 204 No Content hoặc 200 với message
            if (response.status === 204) {
                console.log('Deleted successfully')
            } else {
                const data = await response.json()
                console.log(data)
            }

            onDelete(userId) // Callback để update UI
        } catch (error) {
            console.error(error)
        } finally {
            setDeleting(false)
        }
    }

    return (
        <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
        </button>
    )
}
```

---

## 7️⃣ Headers - Làm việc với Request Headers

### Common Headers

```javascript
const response = await fetch('/api/data', {
    headers: {
        // Content type
        'Content-Type': 'application/json',

        // Authentication
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',

        // API Key
        'X-API-Key': 'your-api-key',

        // Custom headers
        'X-Custom-Header': 'custom-value',

        // Accept
        Accept: 'application/json',

        // Language
        'Accept-Language': 'en-US,en;q=0.9',
    },
})
```

### Dynamic Headers

```javascript
function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token')

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
    })
}

// Usage
const response = await fetchWithAuth('/api/protected-route')
```

---

## 8️⃣ Response Object - Xử lý Response

### Response Properties

```javascript
const response = await fetch('/api/data')

console.log(response.ok) // true nếu status 200-299
console.log(response.status) // 200, 404, 500, etc.
console.log(response.statusText) // "OK", "Not Found", etc.
console.log(response.headers) // Headers object
console.log(response.url) // Final URL (sau redirects)
console.log(response.redirected) // true nếu có redirect
console.log(response.type) // "basic", "cors", "error", etc.
```

### Response Methods

```javascript
// Parse JSON
const data = await response.json()

// Parse text
const text = await response.text()

// Parse blob (images, files)
const blob = await response.blob()

// Parse FormData
const formData = await response.formData()

// Parse ArrayBuffer
const buffer = await response.arrayBuffer()

// Clone response (vì response chỉ đọc được 1 lần)
const clone = response.clone()
```

### Reading Response Headers

```javascript
const response = await fetch('/api/data')

// Get single header
const contentType = response.headers.get('Content-Type')

// Check if header exists
const hasAuth = response.headers.has('Authorization')

// Iterate all headers
response.headers.forEach((value, key) => {
    console.log(`${key}: ${value}`)
})
```

---

## 9️⃣ Error Handling - Xử lý lỗi chuyên nghiệp

### Complete Error Handling Pattern

```javascript
function useFetch(url) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true

        async function fetchData() {
            try {
                const response = await fetch(url)

                // 1. Kiểm tra HTTP errors
                if (!response.ok) {
                    // Parse error message từ server nếu có
                    let errorMessage = `HTTP error! status: ${response.status}`

                    try {
                        const errorData = await response.json()
                        errorMessage = errorData.message || errorMessage
                    } catch {
                        // Server không trả về JSON, dùng default message
                    }

                    throw new Error(errorMessage)
                }

                // 2. Parse response
                const data = await response.json()

                // 3. Update state chỉ khi component còn mounted
                if (isMounted) {
                    setData(data)
                    setError(null)
                }
            } catch (error) {
                if (isMounted) {
                    // Phân loại error
                    if (error.name === 'AbortError') {
                        console.log('Fetch aborted')
                    } else if (error.message.includes('Failed to fetch')) {
                        setError('Network error. Please check your connection.')
                    } else {
                        setError(error.message)
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        // Cleanup
        return () => {
            isMounted = false
        }
    }, [url])

    return { data, loading, error }
}
```

### Error Types

```javascript
try {
    const response = await fetch(url)
} catch (error) {
    // 1. Network errors (mất mạng, DNS fail)
    if (error.message === 'Failed to fetch') {
        console.log('Network error')
    }

    // 2. CORS errors
    if (error.message.includes('CORS')) {
        console.log('CORS error')
    }

    // 3. Timeout (với AbortController)
    if (error.name === 'AbortError') {
        console.log('Request timeout')
    }

    // 4. Parse errors
    if (error instanceof SyntaxError) {
        console.log('Invalid JSON')
    }
}
```

---

## 🔟 AbortController - Cancel Requests

### Tại sao cần cancel requests?

-   ✅ User navigate đi trang khác trước khi request hoàn thành
-   ✅ User gõ search nhanh → cancel requests cũ
-   ✅ Timeout requests chậm quá
-   ✅ Tránh memory leaks

### Basic Usage

```javascript
function SearchUsers() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])

    useEffect(() => {
        // Tạo AbortController
        const controller = new AbortController()

        async function search() {
            try {
                const response = await fetch(`/api/search?q=${query}`, {
                    signal: controller.signal, // Pass signal vào fetch
                })

                if (!response.ok) throw new Error('Search failed')

                const data = await response.json()
                setResults(data)
            } catch (error) {
                if (error.name === 'AbortError') {
                    console.log('Search cancelled')
                } else {
                    console.error(error)
                }
            }
        }

        if (query) {
            search()
        }

        // Cleanup: cancel request khi component unmount hoặc query thay đổi
        return () => {
            controller.abort()
        }
    }, [query])

    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <ul>
                {results.map(item => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}
```

### Timeout với AbortController

```javascript
async function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController()

    // Set timeout
    const timeoutId = setTimeout(() => {
        controller.abort()
    }, timeout)

    try {
        const response = await fetch(url, {
            signal: controller.signal,
        })

        clearTimeout(timeoutId) // Clear timeout nếu request thành công
        return await response.json()
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout')
        }
        throw error
    }
}

// Usage
try {
    const data = await fetchWithTimeout('/api/slow-endpoint', 3000)
} catch (error) {
    console.error(error.message) // "Request timeout"
}
```

---

## 1️⃣1️⃣ Custom Hooks - Tái sử dụng logic

### useFetch Hook

```javascript
function useFetch(url, options = {}) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        async function fetchData() {
            setLoading(true)
            setError(null)

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const data = await response.json()
                setData(data)
            } catch (error) {
                if (error.name !== 'AbortError') {
                    setError(error.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        return () => controller.abort()
    }, [url])

    return { data, loading, error }
}

// Usage
function UserProfile({ userId }) {
    const { data: user, loading, error } = useFetch(`/api/users/${userId}`)

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!user) return <div>No user found</div>

    return <div>{user.name}</div>
}
```

### usePost Hook

```javascript
function usePost(url) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)

    const post = async body => {
        setLoading(true)
        setError(null)

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })

            if (!response.ok) throw new Error('POST failed')

            const data = await response.json()
            setData(data)
            return data
        } catch (error) {
            setError(error.message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return { post, loading, error, data }
}

// Usage
function CreatePost() {
    const { post, loading, error } = usePost('/api/posts')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await post({ title: 'New Post', content: 'Content here' })
            alert('Post created!')
        } catch (error) {
            // Error already handled by hook
        }
    }

    return <form onSubmit={handleSubmit}>...</form>
}
```

---

## 1️⃣2️⃣ Best Practices

### ✅ DO - Nên làm

```javascript
// 1. Luôn kiểm tra response.ok
if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
}

// 2. Sử dụng async/await thay vì .then()
async function fetchData() {
    const response = await fetch(url)
    const data = await response.json()
}

// 3. Cleanup với AbortController
useEffect(() => {
    const controller = new AbortController()
    fetch(url, { signal: controller.signal })
    return () => controller.abort()
}, [url])

// 4. Tách logic vào custom hooks
const { data, loading, error } = useFetch(url)

// 5. Handle errors properly
try {
    const data = await fetch(url)
} catch (error) {
    setError(error.message)
}

// 6. Set loading states
setLoading(true)
try {
    // fetch...
} finally {
    setLoading(false)
}
```

### ❌ DON'T - Không nên làm

```javascript
// 1. Không kiểm tra response.ok
const data = await response.json() // ❌ Có thể crash nếu response lỗi

// 2. Không cleanup
useEffect(() => {
    fetch(url) // ❌ Memory leak nếu component unmount
}, [url])

// 3. Fetch trong render
function Component() {
    fetch('/api/data') // ❌ Sẽ fetch mỗi lần re-render!
    return <div>...</div>
}

// 4. Không handle errors
await fetch(url) // ❌ App crash nếu có lỗi

// 5. Hardcode URLs
fetch('http://localhost:3000/api/users') // ❌ Không work khi deploy

// Dùng environment variables
fetch(`${process.env.REACT_APP_API_URL}/users`) // ✅
```

---

## 1️⃣3️⃣ Common Patterns

### Pattern 1: Fetch on Mount

```javascript
function Component() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('/api/data')
            .then(res => res.json())
            .then(setData)
    }, []) // Empty deps = chỉ fetch 1 lần khi mount

    return <div>{data}</div>
}
```

### Pattern 2: Fetch on Prop Change

```javascript
function UserProfile({ userId }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch(`/api/users/${userId}`)
            .then(res => res.json())
            .then(setUser)
    }, [userId]) // Fetch lại khi userId thay đổi

    return <div>{user?.name}</div>
}
```

### Pattern 3: Fetch on Button Click

```javascript
function Component() {
    const [data, setData] = useState(null)

    const handleClick = async () => {
        const response = await fetch('/api/data')
        const data = await response.json()
        setData(data)
    }

    return <button onClick={handleClick}>Load Data</button>
}
```

### Pattern 4: Polling (Fetch định kỳ)

```javascript
function LiveData() {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/live-data')
            const data = await response.json()
            setData(data)
        }

        fetchData() // Fetch ngay lập tức

        const interval = setInterval(fetchData, 5000) // Fetch mỗi 5s

        return () => clearInterval(interval) // Cleanup
    }, [])

    return <div>{data}</div>
}
```

---

## 1️⃣4️⃣ So sánh Fetch vs Axios

| Feature             | Fetch API                  | Axios                      |
| ------------------- | -------------------------- | -------------------------- |
| **Built-in**        | ✅ Có sẵn                  | ❌ Cần install             |
| **Bundle size**     | 0KB                        | ~13KB                      |
| **Syntax**          | Dài hơn                    | Ngắn gọn hơn               |
| **JSON parsing**    | Manual                     | Automatic                  |
| **Error handling**  | Manual check `response.ok` | Auto throw cho HTTP errors |
| **Interceptors**    | ❌ Không có                | ✅ Có                      |
| **Progress**        | ❌ Khó                     | ✅ Dễ                      |
| **Timeout**         | Manual với AbortController | Built-in                   |
| **Cancel requests** | AbortController            | CancelToken                |
| **Browser support** | Modern browsers            | IE11+                      |

**Kết luận:**

-   Dùng **Fetch** cho: Simple apps, giảm bundle size
-   Dùng **Axios** cho: Complex apps, cần nhiều features

---

## 📚 Tài liệu tham khảo

-   [MDN - Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
-   [MDN - Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
-   [MDN - AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

---

## 🎯 Tóm tắt

-   ✅ Fetch API là built-in, promise-based, modern
-   ✅ Luôn kiểm tra `response.ok` trước khi parse
-   ✅ Sử dụng async/await cho code dễ đọc
-   ✅ Handle errors với try/catch
-   ✅ Cleanup với AbortController
-   ✅ Tạo custom hooks để reuse logic
-   ✅ Set loading và error states
-   ✅ Dùng Fetch cho simple apps, Axios cho complex apps

**Bài tiếp theo:** Bài 22 - Axios (HTTP Client mạnh mẽ hơn)
