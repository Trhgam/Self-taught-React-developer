# Hướng Dẫn Setup React Project Chuẩn Enterprise (Jira Integration & Quality Control)

Tài liệu này hướng dẫn chi tiết cách khởi tạo một dự án React (sử dụng Vite + TypeScript) được tích hợp sẵn các công cụ kiểm soát chất lượng code (ESLint, Prettier) và quy trình commit chặt chẽ (Husky, Commitlint) theo chuẩn Jira (Mã TAS).

## Mục Tiêu

- **Tự động kiểm tra chất lượng code**: Code phải sạch (Prettier) và đúng chuẩn (ESLint/TypeScript) trước khi chạy `dev` hoặc `commit`.
- **Quản lý Commit theo Jira**: Commit message bắt buộc phải có mã TAS (VD: `TAS-01 feat: ...`).
- **Workflow chặt chẽ**: Không cho phép chạy ứng dụng nếu chưa validate thành công.

---

## Phần 1: Khởi Tạo Dự Án & Cài Đặt

### 1.1 Khởi tạo dự án Vite
```bash
npm create vite@latest my-awesome-project -- --template react-ts
cd my-awesome-project
npm install
```

### 1.2 Cài đặt các thư viện cần thiết
```bash
# Linting & Formatting
npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier eslint-plugin-react-hooks eslint-plugin-react-refresh @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Git Hooks & Commit Linting
npm install -D husky lint-staged @commitlint/cli @commitlint/config-conventional

# Tien ich
npm install -D chalk # Để console log có màu (cho script custom)
```

---

## Phần 2: Cấu Hình Công Cụ (Configuration)

### 2.1 Cấu hình Prettier (`.prettierrc`)
*Tạo file `.prettierrc` tại thư mục gốc:*
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "endOfLine": "auto"
}
```

### 2.2 Cấu hình ESLint (`.eslintrc.cjs` hoặc `eslint.config.js`)
*Nếu dùng Vite mới nhất (ESM), sửa file `eslint.config.js` hoặc `.eslintrc.cjs` để tích hợp Prettier:*
```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // Thêm dòng này cuối cùng
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': 'error' // Báo lỗi nếu format sai
  },
}
```

### 2.3 Cấu hình Commitlint (`commitlint.config.js`)
*Tạo file `commitlint.config.js` tại thư mục gốc để bắt buộc format `TAS-XXX <type>: <msg>`*
```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(TAS-\d+) (\w+): (.*)$/,
      headerCorrespondence: ['ticket', 'type', 'subject'],
    },
  },
  plugins: [
    {
      rules: {
        'ticket-exist': (parsed) => {
          const { ticket } = parsed;
          if (!ticket) return [false, 'Commit must start with ticket ID (e.g., TAS-01)'];
          return [true];
        },
      },
    },
  ],
  rules: {
    'ticket-exist': [2, 'always'],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'revert'],
    ],
  },
};
```

---

## Phần 3: Custom Validation Scripts

Tạo thư mục `scripts` tại gốc dự án và thêm 2 file sau (Node.js script để chạy các lệnh kiểm tra đẹp mắt như yêu cầu).

### 3.1 Script Validate (`scripts/validate.js`)
*Script này sẽ chạy TypeScript check, ESLint và Prettier check.*

```javascript
/* scripts/validate.js */
import { execSync } from 'child_process'

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
}

const log = {
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.cyan}ℹ ${msg}${colors.reset}`),
}

function runCommand(name, command) {
  log.title(`[${name}]`)
  try {
    execSync(command, { stdio: 'pipe', encoding: 'utf8' })
    log.success(`${name} passed!`)
    return true
  } catch (error) {
    log.error(`${name} failed!`)
    
    const output = error.stdout || error.stderr || ''
    const lines = output.split('\n').filter(line => line.trim())
    
    lines.forEach(line => {
      if (line.includes('error') || line.includes('Error')) {
        console.log(`  ${colors.red}${line}${colors.reset}`)
      } else if (line.includes('warning') || line.includes('warn')) {
        console.log(`  ${colors.yellow}${line}${colors.reset}`)
      }
    })
    
    return false
  }
}

console.log('')
console.log('╔═══════════════════════════════════════════════════════╗')
console.log('║              🔍 RUNNING VALIDATION                    ║')
console.log('╚═══════════════════════════════════════════════════════╝')

const results = {
  typeCheck: runCommand('TypeScript', 'npx tsc --noEmit'),
  lint: runCommand('ESLint', 'npx eslint src --ext .ts,.tsx --quiet'),
  format: runCommand('Prettier', 'npx prettier --check "src/**/*.{ts,tsx,css,json}"'),
}

console.log('')
const allPassed = Object.values(results).every(Boolean)

if (allPassed) {
  log.success('All checks passed! System ready. ✨')
} else {
  log.error('Validation failed!')
  log.info('Run "npm run validate:fix" to auto-fix issues.')
  process.exit(1) // Exit with error code to block next steps
}
```

### 3.2 Script Fix (`scripts/fix.js`)
*Script này tự động sửa lỗi ESLint và Prettier.*

```javascript
/* scripts/fix.js */
import { execSync } from 'child_process'

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  bold: '\x1b[1m',
}

const log = {
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
}

function runFix(name, command) {
  log.title(`[${name}]`)
  try {
    execSync(command, { stdio: 'inherit' }) // stdio inherit để thấy output trực tiếp
    log.success(`${name} completed!`)
  } catch (error) {
    log.error(`${name} failed!`)
  }
}

console.log('╔═══════════════════════════════════════════════════════╗')
console.log('║              🔧 AUTO-FIXING CODE                      ║')
console.log('╚═══════════════════════════════════════════════════════╝')

runFix('ESLint Fix', 'npx eslint src --ext .ts,.tsx --fix --quiet')
runFix('Prettier Format', 'npx prettier --write "src/**/*.{ts,tsx,css,json}"')

console.log('\n✨ Auto-fix completed! Run "npm run validate" to verify.')
```

---

## Phần 4: Thiết Lập Husky & Git Hooks

### 4.1 Khởi tạo Husky
```bash
npx husky init
```
Lệnh này sẽ tạo thư mục `.husky` và sửa `package.json`.

### 4.2 Cấu hình `pre-commit` hook
*Chỉ cho phép commit nếu validation script chạy thành công.*
Sửa file `.husky/pre-commit`:
```bash
node scripts/validate.js
```

### 4.3 Cấu hình `commit-msg` hook
*Kiểm tra định dạng commit message (TAS-XXX ...).*
Tạo file `.husky/commit-msg`:
```bash
npx --no -- commitlint --edit "${1}"
```

---

## Phần 5: Cập Nhật `package.json`

Sửa phần `scripts` trong `package.json` để tích hợp quy trình chặt chẽ:

```json
"scripts": {
  "dev": "node scripts/validate.js && vite",
  "build": "node scripts/validate.js && tsc && vite build",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "preview": "vite preview",
  "validate": "node scripts/validate.js",
  "validate:fix": "node scripts/fix.js",
  "prepare": "husky"
},
"type": "module" 
// Lưu ý: Đảm bảo project là module để chạy được file .js import/export
```

**Giải thích:**
- **npm run dev**: Sẽ chạy `validate.js` trước. Nếu thất bại, lệnh `vite` (khởi động server) sẽ KHÔNG ĐƯỢC CHẠY. Developer bắt buộc phải sửa lỗi.
- **npm run validate:fix**: Lệnh tắt để tự động sửa lỗi nhanh.

---

## Phần 6: Hướng Dẫn Sử Dụng (Cho Dev Team)

### Quy trình làm việc hàng ngày
1.  **Code**: Viết code tính năng mới.
2.  **Khởi động Dev Server**: Chạy `npm run dev`.
    - Hệ thống sẽ tự động kiểm tra code.
    - Nếu có lỗi lint/format -> Server không khởi động, hiện thông báo lỗi.
    - Chạy `npm run validate:fix` để sửa tự động các lỗi cơ bản.
3.  **Commit Code**:
    - `git add .`
    - `git commit -m "TAS-01 feat: setup project structure"`
    - Nếu message không đúng format (thiếu TAS-XXX), commit sẽ bị chặn.
4.  **Push**: Đẩy code lên branch.

### Ví Dụ Commit Hợp Lệ
- `TAS-01 feat: add user login` ✅
- `TAS-102 fix: correct layout responsive` ✅
- `TAS-05 docs: update readme` ✅

### Ví Dụ Commit Không Hợp Lệ
- `feat: add user login` ❌ (Thiếu Ticket ID)
- `TAS-01: add login` ❌ (Sai type)
- `update login logic` ❌ (Sai format hoàn toàn)

---
*Tài liệu này dùng để thiết lập chuẩn cho dự án React Enterprise mới.*
