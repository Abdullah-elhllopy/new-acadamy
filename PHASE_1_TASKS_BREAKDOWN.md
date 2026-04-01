# 🎯 PHASE 1 - DETAILED TASKS BREAKDOWN & PRIORITIZATION

**Based on:** api.json Swagger specification + Codebase analysis  
**Date:** January 2025  
**Focus:** Completing Phase 1 MVP with prioritized task list

---

## 📋 TASK PRIORITY MATRIX

### CRITICAL PATH (Must Complete First)
These tasks block other features and are essential for MVP:

1. **Payment System Integration** (Blocks: Booking, Revenue)
2. **Certificate Generation** (Blocks: Course Completion, User Satisfaction)
3. **Notification System** (Blocks: User Communication, Confirmations)
4. **Booking System Completion** (Blocks: Revenue, User Engagement)
5. **Admin Dashboard CRUD** (Blocks: Content Management, Operations)

---

## 🔴 PRIORITY 1: CRITICAL TASKS (Weeks 1-4)

### TASK 1.1: Payment System Integration
**Status:** ❌ Not Started  
**Effort:** 3-4 weeks  
**Team:** 1 Backend Dev + 1 Frontend Dev  
**Blocking:** Revenue, Booking confirmation, Invoice generation

#### Subtasks:
- [ ] **1.1.1 - Paymob API Integration**
  - Setup Paymob merchant account
  - Implement payment request creation
  - Handle payment response
  - Implement payment verification
  - Estimated: 1 week

- [ ] **1.1.2 - Payment Webhook Handler**
  - Create webhook endpoint
  - Verify webhook signature
  - Update booking status
  - Trigger notifications
  - Estimated: 3-4 days

- [ ] **1.1.3 - Invoice Generation**
  - Setup PDF generation library (PDFKit)
  - Design invoice template
  - Implement invoice creation
  - Add invoice download
  - Estimated: 1 week

- [ ] **1.1.4 - Payment Confirmation Flow**
  - Create confirmation page
  - Send confirmation email
  - Update user dashboard
  - Add payment history
  - Estimated: 3-4 days

- [ ] **1.1.5 - Refund System**
  - Implement refund logic
  - Create refund request form
  - Add refund status tracking
  - Send refund notifications
  - Estimated: 1 week

#### API Endpoints to Implement:
```
POST /api/Payment/Process-Payment
POST /api/Payment/Webhook
GET /api/Payment/History/{userId}
POST /api/Payment/Refund
GET /api/Payment/Status/{paymentId}
```

#### Frontend Changes:
- Update `app/payment/[id]/page.tsx` with actual payment processing
- Create payment confirmation page
- Add payment history to dashboard
- Implement refund request form

---

### TASK 1.2: Certificate Generation System
**Status:** ❌ Not Started  
**Effort:** 2-3 weeks  
**Team:** 1 Backend Dev + 1 Frontend Dev  
**Blocking:** Course completion, User satisfaction

#### Subtasks:
- [ ] **1.2.1 - PDF Generation Setup**
  - Install PDFKit or similar library
  - Create certificate template
  - Implement dynamic data insertion
  - Test PDF generation
  - Estimated: 3-4 days

- [ ] **1.2.2 - QR Code Implementation**
  - Generate QR codes for certificates
  - Embed QR in PDF
  - Create verification endpoint
  - Test QR scanning
  - Estimated: 3-4 days

- [ ] **1.2.3 - Digital Signature**
  - Implement digital signature
  - Add signature to certificate
  - Create signature verification
  - Test signature validation
  - Estimated: 1 week

- [ ] **1.2.4 - Automatic Issuance**
  - Create trigger for course completion
  - Implement certificate generation job
  - Add certificate to user account
  - Send certificate email
  - Estimated: 3-4 days

- [ ] **1.2.5 - Certificate Verification System**
  - Create verification page
  - Implement QR code verification
  - Add certificate lookup
  - Display certificate details
  - Estimated: 3-4 days

#### API Endpoints to Implement:
```
POST /api/Certificate/Generate
GET /api/Certificate/{certificateId}
POST /api/Certificate/Verify
GET /api/Certificate/User/{userId}
GET /api/Certificate/Verify-QR/{qrCode}
```

#### Frontend Changes:
- Update `app/my-certificates/page.tsx` with actual certificates
- Create certificate download functionality
- Add certificate verification page
- Implement QR code display

---

### TASK 1.3: Notification System Setup
**Status:** ❌ Not Started  
**Effort:** 2-3 weeks  
**Team:** 1 Backend Dev  
**Blocking:** User communication, Confirmations

#### Subtasks:
- [ ] **1.3.1 - Email Service Setup**
  - Configure SMTP (SendGrid/AWS SES)
  - Create email templates
  - Implement email sending
  - Add email queue
  - Estimated: 1 week

- [ ] **1.3.2 - SMS Gateway Integration**
  - Setup Twilio or similar
  - Create SMS templates
  - Implement SMS sending
  - Add SMS queue
  - Estimated: 3-4 days

- [ ] **1.3.3 - WhatsApp Business API**
  - Setup WhatsApp Business account
  - Create WhatsApp templates
  - Implement WhatsApp sending
  - Add WhatsApp queue
  - Estimated: 1 week

- [ ] **1.3.4 - Notification Templates**
  - Booking confirmation email
  - Payment confirmation email
  - Certificate issuance email
  - Course start reminder
  - Trainer application status
  - Contact form response
  - Estimated: 3-4 days

- [ ] **1.3.5 - Notification Preferences**
  - Create notification settings page
  - Implement preference storage
  - Add preference validation
  - Test preference logic
  - Estimated: 3-4 days

#### API Endpoints to Implement:
```
POST /api/Notification/Send-Email
POST /api/Notification/Send-SMS
POST /api/Notification/Send-WhatsApp
GET /api/Notification/History
PUT /api/Notification/Preferences
```

#### Frontend Changes:
- Create notification preferences page
- Add notification history display
- Implement notification center

---

### TASK 1.4: Complete Booking System Integration
**Status:** ⚠️ 50% Complete (UI done, backend incomplete)  
**Effort:** 2 weeks  
**Team:** 1 Backend Dev + 1 Frontend Dev  
**Blocking:** Revenue, User engagement

#### Subtasks:
- [ ] **1.4.1 - Session Selection API**
  - Connect to session API
  - Implement seat availability check
  - Add real-time seat updates
  - Handle race conditions
  - Estimated: 3-4 days

- [ ] **1.4.2 - Booking Submission**
  - Implement booking creation
  - Add booking validation
  - Create booking confirmation
  - Generate booking reference
  - Estimated: 3-4 days

- [ ] **1.4.3 - OTP Verification**
  - Generate OTP
  - Send OTP via SMS
  - Implement OTP verification
  - Add OTP expiration
  - Estimated: 3-4 days

- [ ] **1.4.4 - Booking Status Tracking**
  - Create booking status page
  - Implement status updates
  - Add booking history
  - Create booking cancellation
  - Estimated: 3-4 days

- [ ] **1.4.5 - Bank Transfer Verification**
  - Create receipt upload handler
  - Implement receipt verification
  - Add manual approval workflow
  - Send verification notifications
  - Estimated: 1 week

#### API Endpoints to Implement:
```
POST /api/Booking/Create
GET /api/Booking/{bookingId}
PUT /api/Booking/{bookingId}/Status
DELETE /api/Booking/{bookingId}
POST /api/Booking/Verify-OTP
POST /api/Booking/Upload-Receipt
GET /api/Booking/User/{userId}
```

#### Frontend Changes:
- Update `app/booking/[courseId]/page.tsx` with API integration
- Create booking confirmation page
- Add booking history to dashboard
- Implement booking cancellation

---

### TASK 1.5: Admin Dashboard CRUD Operations
**Status:** ❌ 20% Complete (Layout only)  
**Effort:** 3-4 weeks  
**Team:** 2 Frontend Devs + 1 Backend Dev  
**Blocking:** Content management, Operations

#### Subtasks:
- [ ] **1.5.1 - Course Management**
  - Create course list page
  - Implement course creation form
  - Add course edit functionality
  - Implement course deletion
  - Add course status management
  - Estimated: 1 week

- [ ] **1.5.2 - Booking Management**
  - Create booking list page
  - Implement booking status updates
  - Add booking details view
  - Implement booking cancellation
  - Add booking export
  - Estimated: 1 week

- [ ] **1.5.3 - Trainer Approval Workflow**
  - Create trainer requests list
  - Implement approval/rejection
  - Add trainer profile review
  - Send approval notifications
  - Add trainer management
  - Estimated: 1 week

- [ ] **1.5.4 - User Management**
  - Create user list page
  - Implement user role management
  - Add user status management
  - Implement user deletion
  - Add user search/filter
  - Estimated: 3-4 days

- [ ] **1.5.5 - Reports & Analytics**
  - Create dashboard statistics
  - Implement revenue reports
  - Add enrollment reports
  - Create trainer performance reports
  - Implement data export (CSV/PDF)
  - Estimated: 1 week

#### API Endpoints to Implement:
```
GET /api/Admin/Courses
POST /api/Admin/Courses
PUT /api/Admin/Courses/{id}
DELETE /api/Admin/Courses/{id}

GET /api/Admin/Bookings
PUT /api/Admin/Bookings/{id}/Status
DELETE /api/Admin/Bookings/{id}

GET /api/Admin/Trainer-Requests
PUT /api/Admin/Trainer-Requests/{id}/Status

GET /api/Admin/Users
PUT /api/Admin/Users/{id}/Role
DELETE /api/Admin/Users/{id}

GET /api/Admin/Reports
POST /api/Admin/Export
```

#### Frontend Changes:
- Create admin course management pages
- Create admin booking management pages
- Create admin trainer approval pages
- Create admin user management pages
- Create admin reports pages

---

## 🟡 PRIORITY 2: IMPORTANT TASKS (Weeks 5-8)

### TASK 2.1: Complete Trainer Portal
**Status:** ⚠️ 60% Complete  
**Effort:** 2 weeks  
**Team:** 1 Frontend Dev + 1 Backend Dev

#### Subtasks:
- [ ] **2.1.1 - Trainer Profile Completion**
  - Add trainer bio
  - Add trainer qualifications
  - Add trainer experience
  - Add trainer specializations
  - Estimated: 3-4 days

- [ ] **2.1.2 - Video Upload & Management**
  - Implement video upload
  - Add video processing
  - Create video gallery
  - Implement video deletion
  - Estimated: 1 week

- [ ] **2.1.3 - Trainer Blog/Articles**
  - Create article creation form
  - Implement article publishing
  - Add article editing
  - Create article deletion
  - Estimated: 1 week

- [ ] **2.1.4 - Review & Rating System**
  - Create review display
  - Implement rating calculation
  - Add review moderation
  - Create review response
  - Estimated: 3-4 days

#### API Endpoints to Implement:
```
PUT /api/Trainer/{id}/Profile
POST /api/Trainer/{id}/Upload-Video
GET /api/Trainer/{id}/Videos
DELETE /api/Trainer/{id}/Videos/{videoId}

POST /api/Trainer/{id}/Articles
GET /api/Trainer/{id}/Articles
PUT /api/Trainer/{id}/Articles/{articleId}
DELETE /api/Trainer/{id}/Articles/{articleId}

GET /api/Trainer/{id}/Reviews
POST /api/Trainer/{id}/Reviews
```

---

### TASK 2.2: Knowledge Center Implementation
**Status:** ⚠️ 30% Complete (Images only)  
**Effort:** 2-3 weeks  
**Team:** 1 Backend Dev + 1 Frontend Dev

#### Subtasks:
- [ ] **2.2.1 - Article Management System**
  - Create article CRUD
  - Implement article categories
  - Add article search
  - Create article filtering
  - Estimated: 1 week

- [ ] **2.2.2 - SEO-Optimized Articles**
  - Add article meta tags
  - Implement article schema
  - Add article sitemap
  - Create article breadcrumbs
  - Estimated: 3-4 days

- [ ] **2.2.3 - Case Studies Section**
  - Create case study template
  - Implement case study CRUD
  - Add case study filtering
  - Create case study display
  - Estimated: 1 week

- [ ] **2.2.4 - Comments & Ratings**
  - Implement comment system
  - Add comment moderation
  - Create rating system
  - Add rating display
  - Estimated: 1 week

#### API Endpoints to Implement:
```
CRUD /api/Article
CRUD /api/Article-Category
POST /api/Article/{id}/Comments
GET /api/Article/{id}/Comments
POST /api/Article/{id}/Rate
```

---

### TASK 2.3: Bulk Registration Implementation
**Status:** ⚠️ 40% Complete (UI only)  
**Effort:** 1-2 weeks  
**Team:** 1 Backend Dev + 1 Frontend Dev

#### Subtasks:
- [ ] **2.3.1 - CSV/Excel Upload**
  - Implement file upload
  - Add file validation
  - Parse CSV/Excel
  - Estimated: 3-4 days

- [ ] **2.3.2 - Data Validation**
  - Validate email format
  - Check for duplicates
  - Validate phone numbers
  - Create error report
  - Estimated: 3-4 days

- [ ] **2.3.3 - Batch Processing**
  - Implement batch creation
  - Add progress tracking
  - Create error handling
  - Send batch confirmation
  - Estimated: 1 week

#### API Endpoints to Implement:
```
POST /api/Bulk-Registration/Upload
GET /api/Bulk-Registration/Status/{batchId}
GET /api/Bulk-Registration/Errors/{batchId}
```

---

### TASK 2.4: SEO Optimization
**Status:** ⚠️ 50% Complete  
**Effort:** 1-2 weeks  
**Team:** 1 Frontend Dev

#### Subtasks:
- [ ] **2.4.1 - Schema.org Markup**
  - Add course schema
  - Add trainer schema
  - Add organization schema
  - Add breadcrumb schema
  - Estimated: 3-4 days

- [ ] **2.4.2 - Dynamic Sitemap**
  - Generate course sitemap
  - Generate trainer sitemap
  - Generate article sitemap
  - Create sitemap index
  - Estimated: 3-4 days

- [ ] **2.4.3 - AI-Generated Descriptions**
  - Integrate AI API
  - Generate course descriptions
  - Generate trainer bios
  - Create description templates
  - Estimated: 1 week

---

## 🟢 PRIORITY 3: ENHANCEMENT TASKS (Weeks 9-12)

### TASK 3.1: Custom Program Request
**Status:** ❌ Not Started  
**Effort:** 1-2 weeks  
**Team:** 1 Frontend Dev + 1 Backend Dev

- [ ] Create request form
- [ ] Implement RFP upload
- [ ] Add status tracking
- [ ] Create client dashboard

---

### TASK 3.2: Consulting Portal
**Status:** ❌ Not Started  
**Effort:** 1-2 weeks  
**Team:** 1 Frontend Dev + 1 Backend Dev

- [ ] Create services page
- [ ] Add case studies
- [ ] Implement consultation request form
- [ ] Create consultation tracking

---

### TASK 3.3: Advanced Features
**Status:** ❌ Not Started  
**Effort:** 2-3 weeks  
**Team:** 1 Frontend Dev + 1 Backend Dev

- [ ] Social media sharing
- [ ] Google Maps integration
- [ ] Calendar integration
- [ ] Video player with CDN

---

## 📊 IMPLEMENTATION TIMELINE

```
Week 1-2:   Payment System (1.1)
Week 3-4:   Certificate System (1.2)
Week 5-6:   Notifications (1.3) + Booking (1.4)
Week 7-8:   Admin Dashboard (1.5)
Week 9-10:  Trainer Portal (2.1) + Knowledge Center (2.2)
Week 11-12: SEO (2.4) + Polish & Testing
```

---

## 🔗 API ENDPOINTS MAPPING

### From api.json - Already Configured in Code

#### AboutUs Endpoints
```
GET    /api/AboutUs/About-Us
POST   /api/AboutUs/Add-About-Us
POST   /api/AboutUs/Update-About-Us
POST   /api/AboutUs/Add-OneValue
```
**Status:** ✅ Configured | ⚠️ Not fully integrated

#### Course Endpoints
```
GET    /api/Course/All-Courses
GET    /api/Course/get-Course/{id}
GET    /api/Course/Find-Course/{name}
GET    /api/Course/Filter-Courses-by-name
POST   /api/Course/Filter-Courses-by-category
POST   /api/Course/Filter-Courses-by-bool
POST   /api/Course/Create-Course
POST   /api/Course/Update-Course
POST   /api/Course/Add-WWWL
DELETE /api/Course/Delete-Course/{id}
```
**Status:** ✅ Configured | ⚠️ Partially integrated

#### User Endpoints
```
GET    /api/user/GetAllUsers
GET    /api/user/Edit-User?id={id}
POST   /api/user/Register
POST   /api/login/login
POST   /api/user/Update-Password
POST   /api/user/Forget-Password
POST   /api/user/Reset-Password
POST   /api/user/Check-Code
DELETE /api/user/Delete-user{id}
```
**Status:** ✅ Configured | ⚠️ Not integrated

#### Trainer/Instructor Endpoints
```
GET    /api/Instructor/All-Instructors
GET    /api/Instructor/get-Instructor/{id}
POST   /api/Instructor/Create-Instructor
POST   /api/Instructor/Update-Instructor
DELETE /api/Instructor/Delete-Instructor/{id}
```
**Status:** ✅ Configured | ✅ Partially integrated

#### Request Endpoints
```
GET    /api/Request/All-Training-Requests
GET    /api/Request/get-Training-Request/{id}
POST   /api/Request/Create-Training-Request
POST   /api/Request/Update-Training-Request-Status

GET    /api/Request/All-Be-Trainer-Requests
GET    /api/Request/get-Be-Trainer-Request/{id}
POST   /api/Request/Create-Be-Trainer-Request
POST   /api/Request/Update-Be-Trainer-Request-Status
```
**Status:** ✅ Configured | ⚠️ Not integrated

#### Contact & Subscription Endpoints
```
GET    /api/ContactUs/All-Messages
GET    /api/ContactUs/get-Message/{id}
POST   /api/ContactUs/Send-Message

GET    /api/EmailSubscription/All-Subscriptions
POST   /api/EmailSubscription/Subscribe
```
**Status:** ✅ Configured | ⚠️ Not integrated

---

## ✅ COMPLETION CHECKLIST

### Phase 1 MVP Requirements
- [ ] Payment system fully integrated
- [ ] Certificate generation working
- [ ] Notification system operational
- [ ] Booking system complete
- [ ] Admin dashboard functional
- [ ] All security issues fixed
- [ ] Performance optimized
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Ready for production deployment

---

## 📝 NOTES

1. **API Base URL:** `https://idacademy.runasp.net` (from .env)
2. **All endpoints are configured** in `services/api/config.ts`
3. **React Query hooks are ready** in `hooks/api/`
4. **Frontend pages are built** and ready for integration
5. **Security issues need fixing** before production

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**Next Review:** After completing Priority 1 tasks
