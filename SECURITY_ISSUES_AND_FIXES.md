# 🔒 SECURITY ISSUES & FIXES - PHASE 1

**Date:** January 2025  
**Severity Level:** HIGH  
**Status:** ⚠️ REQUIRES IMMEDIATE ATTENTION

---

## 🚨 CRITICAL SECURITY FINDINGS

### Issue 1: CWE-117 - Log Injection (HIGH SEVERITY)

**Affected Files:**
1. `app/apply-for-program/[id]/_hooks/use-team-application.ts` (Line 51-52)
2. `app/my-certificates/page.tsx` (Line 37-38, 41-42)
3. `components/error-boundary.tsx` (Line 27-28)
4. `hooks/use-booking.ts` (Line 76-77)
5. `app/booking/_hooks/use-booking.ts` (Line 76-77)
6. `app/payment/[id]/_components/payment-form.tsx` (Line 79-80)

**Description:**
User-provided inputs are being logged directly without sanitization. An attacker can use unsanitized input to:
- Break log integrity
- Forge log entries
- Bypass log monitors
- Inject malicious code into logs

**Example Vulnerable Code:**
```typescript
console.log('Error:', error.message) // ❌ VULNERABLE
console.log(`User input: ${userInput}`) // ❌ VULNERABLE
```

**Fix - Sanitize Before Logging:**
```typescript
// ✅ SAFE - Sanitize newlines and special characters
const sanitizeLog = (input: string): string => {
  return input
    .replace(/[\r\n]/g, ' ')
    .replace(/[\x00-\x1F\x7F]/g, '')
    .substring(0, 1000) // Limit length
}

console.log('Error:', sanitizeLog(error.message))
console.log(`User input: ${sanitizeLog(userInput)}`)
```

**Affected Code Locations & Fixes:**

#### 1. `app/apply-for-program/[id]/_hooks/use-team-application.ts`
```typescript
// ❌ BEFORE (Line 51-52)
console.log('Error submitting team application:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = String(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.log('Error submitting team application:', sanitizeLog(error))
```

#### 2. `app/my-certificates/page.tsx`
```typescript
// ❌ BEFORE (Line 37-38, 41-42)
console.log('Certificates:', certificates)
console.log('Error loading certificates:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = JSON.stringify(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.log('Certificates:', sanitizeLog(certificates))
console.log('Error loading certificates:', sanitizeLog(error))
```

#### 3. `components/error-boundary.tsx`
```typescript
// ❌ BEFORE (Line 27-28)
console.error('Error caught by boundary:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = String(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.error('Error caught by boundary:', sanitizeLog(error))
```

#### 4. `hooks/use-booking.ts`
```typescript
// ❌ BEFORE (Line 76-77)
console.log('Booking error:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = String(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.log('Booking error:', sanitizeLog(error))
```

#### 5. `app/booking/_hooks/use-booking.ts`
```typescript
// ❌ BEFORE (Line 76-77)
console.log('Booking error:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = String(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.log('Booking error:', sanitizeLog(error))
```

#### 6. `app/payment/[id]/_components/payment-form.tsx`
```typescript
// ❌ BEFORE (Line 79-80)
console.log('Payment error:', error)

// ✅ AFTER
const sanitizeLog = (input: any): string => {
  const str = String(input)
  return str.replace(/[\r\n]/g, ' ').replace(/[\x00-\x1F\x7F]/g, '').substring(0, 1000)
}
console.log('Payment error:', sanitizeLog(error))
```

**Best Practice - Create Utility Function:**

Create `lib/logger.ts`:
```typescript
/**
 * Sanitizes input before logging to prevent log injection attacks
 * @param input - The input to sanitize
 * @param maxLength - Maximum length of the log message (default: 1000)
 * @returns Sanitized string safe for logging
 */
export const sanitizeLog = (input: any, maxLength: number = 1000): string => {
  try {
    const str = typeof input === 'string' ? input : JSON.stringify(input)
    return str
      .replace(/[\r\n]/g, ' ') // Remove newlines
      .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
      .substring(0, maxLength) // Limit length
  } catch {
    return '[Unable to sanitize log]'
  }
}

/**
 * Safe console logging with sanitization
 */
export const safeLog = {
  log: (message: string, data?: any) => {
    console.log(message, data ? sanitizeLog(data) : '')
  },
  error: (message: string, error?: any) => {
    console.error(message, error ? sanitizeLog(error) : '')
  },
  warn: (message: string, data?: any) => {
    console.warn(message, data ? sanitizeLog(data) : '')
  },
  info: (message: string, data?: any) => {
    console.info(message, data ? sanitizeLog(data) : '')
  },
}
```

Then use throughout the app:
```typescript
import { safeLog } from '@/lib/logger'

// Usage
safeLog.error('Error submitting form:', error)
safeLog.log('User data:', userData)
```

---

### Issue 2: CWE-79,80 - Cross-Site Scripting (XSS) (HIGH SEVERITY)

**Affected File:**
- `components/ui/chart.tsx` (Line 83-99)

**Description:**
User-controllable input is being included in HTML output without proper sanitization. This can lead to:
- Session hijacking
- Malware installation
- Phishing attacks
- Data theft

**Vulnerable Code Pattern:**
```typescript
// ❌ VULNERABLE
const html = `<div>${userInput}</div>` // Direct string interpolation
dangerouslySetInnerHTML={{ __html: userInput }} // Direct HTML injection
```

**Fix - Proper Sanitization:**

#### Option 1: Use React's Built-in Escaping (Recommended)
```typescript
// ✅ SAFE - React automatically escapes text content
const MyComponent = ({ userInput }: { userInput: string }) => {
  return <div>{userInput}</div> // Automatically escaped
}
```

#### Option 2: Use DOMPurify for HTML Content
```typescript
import DOMPurify from 'dompurify'

// ✅ SAFE - Sanitize HTML before rendering
const MyComponent = ({ htmlContent }: { htmlContent: string }) => {
  const sanitized = DOMPurify.sanitize(htmlContent)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

#### Option 3: Use Sanitization Library
```typescript
import { sanitize } from 'isomorphic-dompurify'

// ✅ SAFE - Sanitize on server and client
const sanitizedContent = sanitize(userInput)
```

**For `components/ui/chart.tsx` (Line 83-99):**

```typescript
// ❌ BEFORE - Vulnerable
const renderChart = (data: any) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: data.html }} />
  )
}

// ✅ AFTER - Safe
import DOMPurify from 'dompurify'

const renderChart = (data: any) => {
  const sanitized = DOMPurify.sanitize(data.html, {
    ALLOWED_TAGS: ['svg', 'g', 'path', 'circle', 'rect', 'text', 'line'],
    ALLOWED_ATTR: ['d', 'cx', 'cy', 'r', 'x', 'y', 'width', 'height', 'fill', 'stroke']
  })
  return (
    <div dangerouslySetInnerHTML={{ __html: sanitized }} />
  )
}
```

**Installation:**
```bash
npm install dompurify
npm install --save-dev @types/dompurify
```

---

## 🛡️ ADDITIONAL SECURITY RECOMMENDATIONS

### 1. Input Validation
**Current Status:** ⚠️ Partial (Zod validation present)

**Recommendations:**
- [ ] Validate all user inputs on both client and server
- [ ] Use Zod schemas for all forms
- [ ] Implement server-side validation
- [ ] Add rate limiting on API endpoints

**Example:**
```typescript
import { z } from 'zod'

const userInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  message: z.string().min(10).max(5000),
})

// Validate before processing
const validated = userInputSchema.parse(userInput)
```

### 2. CSRF Protection
**Current Status:** ❌ Not Implemented

**Recommendations:**
- [ ] Add CSRF tokens to all forms
- [ ] Validate CSRF tokens on server
- [ ] Use SameSite cookie attribute

**Implementation:**
```typescript
// Add to API client
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
if (csrfToken) {
  config.headers['X-CSRF-Token'] = csrfToken
}
```

### 3. Authentication Security
**Current Status:** ⚠️ Partial

**Recommendations:**
- [ ] Implement 2FA for admin accounts
- [ ] Add OTP verification
- [ ] Use secure password hashing (bcrypt)
- [ ] Implement session timeout
- [ ] Add login attempt limiting

### 4. Data Protection
**Current Status:** ⚠️ Partial

**Recommendations:**
- [ ] Encrypt sensitive data at rest
- [ ] Use HTTPS for all communications
- [ ] Implement data masking for PII
- [ ] Add audit logging
- [ ] Implement data retention policies

### 5. API Security
**Current Status:** ⚠️ Partial

**Recommendations:**
- [ ] Add API rate limiting
- [ ] Implement API key rotation
- [ ] Add request signing
- [ ] Validate API responses
- [ ] Implement API versioning

---

## 📋 SECURITY FIXES CHECKLIST

### Immediate (This Week)
- [ ] Fix log injection in all 6 files
- [ ] Fix XSS in chart.tsx
- [ ] Create sanitization utility
- [ ] Add DOMPurify library
- [ ] Test all fixes

### Short Term (This Month)
- [ ] Implement CSRF protection
- [ ] Add input validation on server
- [ ] Implement rate limiting
- [ ] Add audit logging
- [ ] Security testing

### Medium Term (This Quarter)
- [ ] Implement 2FA
- [ ] Add data encryption
- [ ] Implement session management
- [ ] Add security headers
- [ ] Penetration testing

---

## 🔐 SECURITY HEADERS TO ADD

Add to `next.config.mjs`:
```javascript
const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  }
]

export default {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}
```

---

## 📊 SECURITY AUDIT SUMMARY

| Issue | Severity | Files | Status | Fix Time |
|-------|----------|-------|--------|----------|
| Log Injection | HIGH | 6 files | ❌ Not Fixed | 2-3 hours |
| XSS | HIGH | 1 file | ❌ Not Fixed | 1-2 hours |
| CSRF | MEDIUM | All forms | ❌ Not Implemented | 1 day |
| Rate Limiting | MEDIUM | API | ❌ Not Implemented | 1 day |
| 2FA | MEDIUM | Auth | ❌ Not Implemented | 2-3 days |
| Data Encryption | MEDIUM | Database | ❌ Not Implemented | 2-3 days |

**Total Estimated Fix Time:** 1-2 weeks

---

## ✅ NEXT STEPS

1. **Immediate:** Fix log injection and XSS issues
2. **This Week:** Add security headers and CSRF protection
3. **This Month:** Implement rate limiting and audit logging
4. **This Quarter:** Add 2FA and data encryption

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Priority:** 🔴 CRITICAL - Fix before production deployment
