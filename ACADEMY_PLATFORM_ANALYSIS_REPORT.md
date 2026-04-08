# 📊 COMPREHENSIVE ACADEMY PLATFORM ANALYSIS REPORT

---

## STEP 1 — PHASE 1 FEATURES BREAKDOWN

### **Module 1: Homepage**
- Academy introduction & statistics
- Profile/training plan download with data capture
- Introductory video
- Training course categories display
- Featured programs
- Scrolling banner for upcoming programs
- Quick links, social media, WhatsApp chat
- Job vacancies
- Search & advanced search
- FAQs, Privacy Policy, Terms
- Location map & contact

### **Module 2: About Us Pages**
- About Us, Vision, Mission, Methodology
- Consulting Services
- Fields of Work
- Academy Leadership
- Team & Advisory Board (with photos, bios, LinkedIn, Knowledge Center articles)
- FAQs

### **Module 3: Knowledge Center (CMS)**
- SEO-optimized articles
- Case studies
- Recorded webinars
- Greeting cards generator (PDF download)
- Trainer business cards generator
- Comments system (moderated)
- Article ratings
- Categories by training fields
- Author profiles
- Social media sharing
- PDF export with branding

### **Module 4: Training Programs Portal**
- Programs classified by paths
- Filtering: fields, audience, location, dates, language, trainers, course type
- Course cards with image, title, summary, price
- Program file download (PDF) with data capture
- Social media sharing
- Detailed program page with:
  - Description, objectives, target audience
  - Duration, dates, certificate type
  - Available sessions with registration status
  - Trainer info & video
  - Course type, venue with map
  - Remaining seats (auto-calculated)
  - Price with tax/discount
  - Attachments, videos, PDFs
  - Ratings, reviews, comments
  - "Book Now" button

### **Module 5: Booking Flow**
- Program selection with basic data entry
- OTP verification (optional)
- Session/batch selection
- Auto-save & resume later
- Payment method selection:
  - Bank transfer with receipt upload
  - Electronic payment gateway (Paymob)
  - Center payment (offline)
- Booking confirmation with summary
- Post-booking: success message, booking number, email/SMS/WhatsApp notifications

### **Module 6: Bulk Trainee Registration (B2B/G2B)**
- Institutional training manager account
- Individual or bulk registration (XLSX/CSV upload)
- Form fields: name, email, mobile, department, job title, specializations, experience, CV, accreditation letter
- Automated verification & duplicate check
- Status tracking: sent → under review → accepted/rejected
- Batch status report (PDF/CSV export)

### **Module 7: Custom Training Program Design Request**
- Request form with organization data
- Project objectives & expected outputs
- Beneficiary scope & level
- Preferred content & implementation type
- Time & logistical constraints
- Budget & payment terms
- RFP file upload
- Workflow: acknowledgment → initial review → diagnostic meeting → proposal → contracting

### **Module 8: Trainers Portal**
- Trainer CV display with profile photo, bio, qualifications
- Related training programs (read-only)
- Video gallery with CDN/HLS support
- Contact trainer form
- Trainer blog with comments & ratings
- Trainer application form with CV upload
- Application workflow: submit → review → accepted/rejected

### **Module 9: Consulting Services Portal**
- Services page listing
- Consultation request form
- Client profiles & case studies

### **Module 10: User System**
- Registration with verification
- Login/Logout/Password recovery
- User dashboard: account status, enrolled courses, certificates, booking/payment tracking
- Institutional profiles for B2B/G2B

### **Module 11: Admin Dashboard**
- Secure login with 2FA
- Homepage management
- Course CRUD with SEO meta
- Sessions management with auto-close
- Bookings management with status workflow
- Trainer applications management
- CMS for internal pages
- System settings (contact, social, email, payment, SMS/WhatsApp)
- User & permissions management (RBAC)
- Reporting: bookings, revenue, trainer performance, B2B/G2B, conversion rates
- Export: PDF/CSV

### **Module 12: Digital Certificate System**
- Electronic certificate issuance
- Verification system
- PDF generation with branding

### **Module 13: SEO + AI SEO**
- Search-engine-optimized structure
- AI-assisted content tagging
- Schema.org markup
- Dynamic sitemap

---

## STEP 2 — AVAILABLE API ENDPOINTS SUMMARY

| API Tag | Coverage Summary |
|---------|------------------|
| **AboutUs** | GET about us data, Add/Update about us info with images/PDFs, add values |
| **Course** | Full CRUD, filter by name/category/bool flags, get by ID/name, add WWWL content, get courses by user ID (various statuses), reserve course (payment), add/remove users & lectures & instructors |
| **Image** | CRUD for images, get by group ID |
| **ImageGroup** | CRUD for image groups, get by name |
| **Instructor** | CRUD for instructors, find by name, includes social links & PDF CV |
| **Lecture** | CRUD for lectures with video upload |
| **Login** | Basic login endpoint |
| **MainDepartment** | CRUD for main departments (categories) |
| **SubDepartment** | CRUD for sub-departments, get by main department |
| **Member** | CRUD for team members with photos, PDFs, social links |
| **Partner** | CRUD for partners with images, PDFs, descriptions |
| **Slider** | CRUD for homepage slides |
| **Subscribe** | Get all subscribers, delete, check email |
| **Message** | CRUD for contact messages |
| **Package** | CRUD for course packages |
| **Training** | CRUD for custom training requests (B2B/G2B), get by user ID |
| **User** | Register, login, password recovery (forget/check code/reset), update password, get all users, edit user, check email, get users by course ID |
| **WeatherForecast** | ⚠️ **SUSPICIOUS** — Default template endpoint, should be removed |

---

## STEP 3 — GAP ANALYSIS (CRITICAL SECTION)

### ✅ **Module 1: Homepage**
**Status:** ✅ DONE (mostly)  
**API Available:** Slider (GET/POST/PUT/DELETE), AboutUs (GET), Course (filter, get all)  
**Gap:** No dedicated API for "Academy statistics", "Job vacancies", "FAQs", "Privacy Policy", "Terms". These might be hardcoded or need CMS endpoints.  
**Frontend Blocked?** NO — Can build with available APIs + mock data for missing sections.

---

### ✅ **Module 2: About Us Pages**
**Status:** ✅ DONE  
**API Available:** AboutUs (GET, Add, Update with OurVision, OurMessage, OurValues), Member (CRUD for team), Partner (CRUD)  
**Gap:** None — API covers vision, mission, values, team, partners.  
**Frontend Blocked?** NO

---

### ⚠️ **Module 3: Knowledge Center (CMS)**
**Status:** ❌ MISSING (90%)  
**API Available:** Image/ImageGroup (for media management)  
**Gap:**  
- ❌ No API for **articles** (CRUD, categories, author profiles, comments, ratings)
- ❌ No API for **case studies**
- ❌ No API for **webinars/videos** (separate from courses)
- ❌ No API for **greeting cards generator**
- ❌ No API for **trainer business cards generator**
- ❌ No API for **comments system** (moderation, approval)
- ❌ No API for **social media sharing** (might be frontend-only)
- ❌ No API for **PDF export** of articles  
**Frontend Blocked?** YES — Cannot build articles, comments, ratings without backend.

---

### ✅ **Module 4: Training Programs Portal**
**Status:** ✅ DONE (80%)  
**API Available:** Course (CRUD, filter by category/name/bool, get by ID), Instructor (CRUD), MainDepartment/SubDepartment (CRUD)  
**Gap:**  
- ⚠️ No explicit **"sessions/batches"** management API (might be embedded in Course model)
- ⚠️ No **"remaining seats"** calculation endpoint (might be computed from Course data)
- ⚠️ No **"ratings & reviews"** API for courses
- ⚠️ No **"comments"** API for courses
- ⚠️ No **"program file download with data capture"** (might need separate endpoint to log downloads)  
**Frontend Blocked?** NO — Can build with existing Course API, but ratings/reviews/comments need mocking.

---

### ⚠️ **Module 5: Booking Flow**
**Status:** ⚠️ PARTIAL (40%)  
**API Available:** Course/Reserve-Course (Stripe payment), Course/Add-Courses-To-User  
**Gap:**  
- ❌ No **OTP verification** API
- ❌ No **"auto-save & resume later"** API for incomplete bookings
- ❌ No **bank transfer receipt upload** API
- ❌ No **Paymob payment gateway** integration (only Stripe in Reserve-Course)
- ❌ No **booking status tracking** API (new, pending, confirmed, rejected, cancelled)
- ❌ No **notification API** (email/SMS/WhatsApp)
- ⚠️ Reserve-Course uses Stripe, not Paymob as specified in PROJECT.md  
**Frontend Blocked?** PARTIALLY — Can build basic booking UI, but payment & notifications are blocked.

---

### ❌ **Module 6: Bulk Trainee Registration**
**Status:** ❌ MISSING (100%)  
**API Available:** None  
**Gap:**  
- ❌ No API for **institutional training manager accounts**
- ❌ No API for **bulk upload** (XLSX/CSV)
- ❌ No API for **trainee registration** (individual or bulk)
- ❌ No API for **status tracking** (sent, under review, accepted, rejected)
- ❌ No API for **batch status report** export  
**Frontend Blocked?** YES — Completely blocked.

---

### ⚠️ **Module 7: Custom Training Program Design Request**
**Status:** ⚠️ PARTIAL (60%)  
**API Available:** Training (CRUD for custom training requests)  
**Gap:**  
- ✅ Training/Add-Training covers most fields (Name, Email, PhoneNumber, WorkInstitution, JobDescription, SuggestedDate, Language, TraineesNumber, Details, CourseId, InstructorId, UserId)
- ❌ No **RFP file upload** field in Training API
- ❌ No **workflow status tracking** (acknowledgment, initial review, diagnostic meeting, proposal, contracting)
- ❌ No **proposal generation** API  
**Frontend Blocked?** NO — Can build form, but workflow tracking needs backend support.

---

### ⚠️ **Module 8: Trainers Portal**
**Status:** ⚠️ PARTIAL (50%)  
**API Available:** Instructor (CRUD with Name, Job, About, Image, LinkedIn, Facebook, Instagram, Twitter, PDF CV)  
**Gap:**  
- ❌ No **trainer application form** API (separate from Instructor CRUD)
- ❌ No **application workflow** API (submit, review, accepted/rejected)
- ❌ No **trainer blog/articles** API (part of Knowledge Center gap)
- ❌ No **comments & ratings** API for trainers
- ❌ No **video gallery** API (Instructor has no video field)
- ❌ No **contact trainer** API (message form)  
**Frontend Blocked?** PARTIALLY — Can display trainer profiles, but application form & blog are blocked.

---

### ⚠️ **Module 9: Consulting Services Portal**
**Status:** ⚠️ PARTIAL (40%)  
**API Available:** Training (can be repurposed for consultation requests), Partner (for case studies)  
**Gap:**  
- ❌ No dedicated **consultation request** API (Training API is close but not exact match)
- ❌ No **case studies** API (Partner API is for partners, not case studies)  
**Frontend Blocked?** NO — Can build with Training API, but case studies need backend.

---

### ✅ **Module 10: User System**
**Status:** ✅ DONE (90%)  
**API Available:** User (Register, Login, Forget-Password, Check-Code, Reset-Password, Update-Password, GetAllUsers, Edit-User, Check-Mail, Get-by-CourseId), Course/GetCoursesByUserId (various statuses)  
**Gap:**  
- ❌ No **certificate download** API (Module 12 gap)
- ❌ No **booking/payment tracking** API (Module 5 gap)
- ⚠️ No explicit **institutional profile** fields in User API (might need separate entity)  
**Frontend Blocked?** NO — Can build user dashboard with existing APIs, mock certificates & booking tracking.

---

### ⚠️ **Module 11: Admin Dashboard**
**Status:** ⚠️ PARTIAL (60%)  
**API Available:** All CRUD endpoints for Course, Instructor, Member, Partner, Slider, MainDepartment, SubDepartment, Image, ImageGroup, Message, Package, Training, User  
**Gap:**  
- ❌ No **2FA** API
- ❌ No **sessions management** API (might be embedded in Course)
- ❌ No **bookings management** API with status workflow
- ❌ No **trainer applications management** API
- ❌ No **CMS** API for FAQs, Privacy Policy, Terms (might be hardcoded)
- ❌ No **system settings** API (contact, social, email, payment, SMS/WhatsApp)
- ❌ No **RBAC** API (roles & permissions)
- ❌ No **reporting** API (bookings, revenue, trainer performance, conversion rates)
- ❌ No **export** API (PDF/CSV)  
**Frontend Blocked?** PARTIALLY — Can build basic CRUD pages, but advanced features (2FA, RBAC, reporting) are blocked.

---

### ❌ **Module 12: Digital Certificate System**
**Status:** ❌ MISSING (100%)  
**API Available:** None  
**Gap:**  
- ❌ No API for **certificate generation**
- ❌ No API for **certificate verification**
- ❌ No API for **certificate download** (PDF)  
**Frontend Blocked?** YES — Completely blocked.

---

### ⚠️ **Module 13: SEO + AI SEO**
**Status:** ⚠️ PARTIAL (30%)  
**API Available:** None (SEO is mostly frontend + backend meta tags)  
**Gap:**  
- ❌ No **Schema.org markup** in API responses
- ❌ No **dynamic sitemap** API
- ❌ No **AI-assisted content tagging** API  
**Frontend Blocked?** NO — Can implement frontend SEO, but dynamic sitemap needs backend.

---

## STEP 4 — FRONTEND TASK LIST (NEXT SPRINT)

### 🟢 **CAN BUILD NOW (API Ready)**

#### **Task 1: Homepage**
**API Used:** Slider (GET), AboutUs (GET), Course (GET All-Courses, Filter-Courses-by-bool for featured)  
**Key Things to Implement:**
- Hero slider with Slider API
- Academy intro from AboutUs API
- Featured courses from Course API (filter by `MostSellenig`, `Recommended`, `Now`)
- Course categories from MainDepartment API
- Mock: Statistics, Job vacancies, FAQs (hardcode or wait for CMS API)

---

#### **Task 2: About Us Pages**
**API Used:** AboutUs (GET), Member (GET All-Members), Partner (GET All-Partners)  
**Key Things to Implement:**
- About Us, Vision (OurVision), Mission (OurMessage), Values (OurValues)
- Team & Advisory Board with Member API (photos, bios, social links)
- Partners with Partner API
- Mock: Consulting Services, Fields of Work (hardcode or wait for CMS API)

---

#### **Task 3: Training Programs Portal (Listing & Details)**
**API Used:** Course (GET All-Courses, get-Course/{id}, Filter-Courses-by-category, Filter-Courses-by-bool), Instructor (GET All-Instructors, get-Instructor/{id}), MainDepartment/SubDepartment (GET)  
**Key Things to Implement:**
- Course listing with filters (category, instructor, location, dates, language)
- Course cards with image, title, summary, price
- Course details page with description, objectives, trainer info, price, dates
- Mock: Sessions/batches (use CourseStartDate), remaining seats (hardcode), ratings/reviews/comments

---

#### **Task 4: User Registration & Login**
**API Used:** User (Register, Login, Forget-Password, Check-Code, Reset-Password)  
**Key Things to Implement:**
- Registration form with validation
- Login form
- Password recovery flow (3-step: forget → check code → reset)
- Store JWT token from Login response

---

#### **Task 5: User Dashboard (Basic)**
**API Used:** User (GetAllUsers, Edit-User), Course (GetCoursesByUserId)  
**Key Things to Implement:**
- Display user profile
- List enrolled courses (use GetCoursesByUserId)
- Mock: Certificates, booking/payment tracking (wait for APIs)

---

#### **Task 6: Trainer Profiles (Read-Only)**
**API Used:** Instructor (GET All-Instructors, get-Instructor/{id}), Course (GET courses by instructor)  
**Key Things to Implement:**
- Trainer listing page
- Trainer profile page with photo, bio, qualifications, social links, PDF CV download
- Related courses (filter Course API by InstructorIDs)
- Mock: Video gallery, blog, ratings/reviews

---

#### **Task 7: Contact Form**
**API Used:** Message (Add-Message)  
**Key Things to Implement:**
- Contact form with validation (fullName, phone, email, subject, message)
- Success/error messages

---

#### **Task 8: Admin Dashboard (Basic CRUD)**
**API Used:** All CRUD endpoints (Course, Instructor, Member, Partner, Slider, MainDepartment, SubDepartment, Image, ImageGroup, Message, Package, Training, User)  
**Key Things to Implement:**
- Admin login (use Login API, check user type)
- CRUD pages for:
  - Courses (with image/video/PDF upload)
  - Instructors
  - Team Members
  - Partners
  - Sliders
  - Departments (Main & Sub)
  - Images & Image Groups
  - Messages (read-only)
  - Packages
  - Training Requests (read-only)
  - Users
- Mock: 2FA, RBAC, reporting, export

---

### 🟡 **CAN PARTIALLY BUILD (Mock or Partial API)**

#### **Task 9: Booking Flow (Basic)**
**API Used:** Course/Reserve-Course (Stripe payment), Course/Add-Courses-To-User  
**What's Available:** Basic course reservation with Stripe payment  
**What to Mock:**
- OTP verification (frontend validation only)
- Auto-save & resume later (use localStorage)
- Bank transfer receipt upload (mock file upload, no backend)
- Paymob payment gateway (use Stripe for now, note in UI)
- Booking status tracking (hardcode statuses)
- Notifications (show success message, no actual email/SMS)  
**Risk:** Payment integration is incomplete (Stripe vs Paymob), booking workflow is simplified.

---

#### **Task 10: Custom Training Program Design Request**
**API Used:** Training (Add-Training)  
**What's Available:** Form submission with most fields  
**What to Mock:**
- RFP file upload (mock file upload, no backend)
- Workflow status tracking (hardcode statuses)
- Proposal generation (no backend)  
**Risk:** Workflow tracking is missing, RFP upload won't work.

---

#### **Task 11: Trainer Application Form**
**API Used:** Instructor (Create-Instructor) — repurpose for applications  
**What's Available:** Can submit trainer data with CV upload  
**What to Mock:**
- Application workflow (submit → review → accepted/rejected) — hardcode statuses
- Admin approval interface (build in admin dashboard, but no dedicated API)  
**Risk:** No dedicated application API, using Instructor CRUD as workaround.

---

#### **Task 12: Knowledge Center (Images Only)**
**API Used:** Image (CRUD), ImageGroup (CRUD)  
**What's Available:** Image gallery with groups  
**What to Mock:**
- Articles, case studies, webinars (wait for CMS API)
- Comments, ratings (wait for API)
- PDF export, social sharing (frontend-only)  
**Risk:** 90% of Knowledge Center is blocked.

---

### 🔴 **BLOCKED (API Missing — Needs Backend First)**

#### **Task 13: Knowledge Center (Articles, Comments, Ratings)**
**What API is Missing:**
- `POST /api/Article/Create` (title, content, author, category, tags, SEO meta)
- `GET /api/Article/All` (with pagination, filters)
- `GET /api/Article/{id}`
- `PUT /api/Article/{id}`
- `DELETE /api/Article/{id}`
- `POST /api/Article/{id}/Comment` (user, content, parent comment ID)
- `GET /api/Article/{id}/Comments` (with moderation status)
- `POST /api/Article/{id}/Rate` (user, rating 1-5)
- `GET /api/Article/{id}/Ratings` (average, count)
- `GET /api/Article/Category/{categoryId}`
- `GET /api/Article/Author/{authorId}`
- `POST /api/Article/{id}/Export-PDF`

---

#### **Task 14: Bulk Trainee Registration (B2B/G2B)**
**What API is Missing:**
- `POST /api/BulkRegistration/Upload` (XLSX/CSV file, institutional manager ID)
- `GET /api/BulkRegistration/Batch/{batchId}` (status, errors, preview)
- `POST /api/BulkRegistration/Submit/{batchId}` (send to Academy for review)
- `GET /api/BulkRegistration/Status/{batchId}` (tracking)
- `GET /api/BulkRegistration/Export/{batchId}` (PDF/CSV report)

---

#### **Task 15: Digital Certificate System**
**What API is Missing:**
- `POST /api/Certificate/Generate` (user ID, course ID, completion date)
- `GET /api/Certificate/{certificateId}` (PDF download)
- `POST /api/Certificate/Verify` (certificate number or QR code)
- `GET /api/Certificate/User/{userId}` (list all certificates)

---

#### **Task 16: Booking Management (Admin)**
**What API is Missing:**
- `GET /api/Booking/All` (with filters: status, course, date range)
- `GET /api/Booking/{bookingId}`
- `PUT /api/Booking/{bookingId}/Status` (new, pending, confirmed, rejected, cancelled)
- `POST /api/Booking/{bookingId}/Receipt-Upload` (bank transfer receipt)
- `POST /api/Booking/{bookingId}/Verify-Payment` (manual verification)

---

#### **Task 17: Notification System**
**What API is Missing:**
- `POST /api/Notification/Send-Email` (to, subject, body, template)
- `POST /api/Notification/Send-SMS` (to, message)
- `POST /api/Notification/Send-WhatsApp` (to, message)
- `GET /api/Notification/History/{userId}`

---

#### **Task 18: Admin Dashboard (Advanced Features)**
**What API is Missing:**
- `POST /api/Auth/Enable-2FA` (user ID)
- `POST /api/Auth/Verify-2FA` (user ID, code)
- `GET /api/Admin/Roles` (list all roles)
- `POST /api/Admin/Role` (create role with permissions)
- `PUT /api/Admin/User/{userId}/Role` (assign role)
- `GET /api/Admin/Reports/Bookings` (filters: date range, course, status)
- `GET /api/Admin/Reports/Revenue` (filters: date range, course)
- `GET /api/Admin/Reports/Trainer-Performance` (filters: trainer, date range)
- `GET /api/Admin/Reports/Conversion` (visit-to-registration rate)
- `POST /api/Admin/Export` (report type, format: PDF/CSV)
- `GET /api/Settings` (contact, social, email, payment, SMS/WhatsApp)
- `PUT /api/Settings` (update settings)

---

#### **Task 19: SEO (Dynamic Sitemap)**
**What API is Missing:**
- `GET /api/Sitemap.xml` (dynamic sitemap generation)
- `GET /api/Schema/{entityType}/{entityId}` (Schema.org markup for courses, trainers, articles)

---

## STEP 5 — SUMMARY TABLE

| Module | Status | Frontend Tasks | API Gaps |
|--------|--------|----------------|----------|
| **Homepage** | ✅ 90% | Build with Slider, AboutUs, Course APIs | Statistics, Job vacancies, FAQs (CMS) |
| **About Us** | ✅ 100% | Build with AboutUs, Member, Partner APIs | None |
| **Knowledge Center** | ❌ 10% | Images only (Image/ImageGroup APIs) | Articles, Comments, Ratings, Case Studies, Webinars, PDF Export |
| **Training Programs Portal** | ✅ 80% | Build with Course, Instructor, Department APIs | Sessions/Batches, Ratings/Reviews, Comments, Download Tracking |
| **Booking Flow** | ⚠️ 40% | Basic booking with Reserve-Course API | OTP, Auto-save, Bank Transfer Upload, Paymob, Booking Status, Notifications |
| **Bulk Registration** | ❌ 0% | Cannot build | Entire module missing |
| **Custom Training Request** | ⚠️ 60% | Build with Training API | RFP Upload, Workflow Tracking, Proposal Generation |
| **Trainers Portal** | ⚠️ 50% | Build with Instructor API | Application Form, Workflow, Blog, Comments/Ratings, Video Gallery, Contact Form |
| **Consulting Services** | ⚠️ 40% | Build with Training API | Dedicated Consultation API, Case Studies |
| **User System** | ✅ 90% | Build with User, Course APIs | Certificates, Booking/Payment Tracking, Institutional Profiles |
| **Admin Dashboard** | ⚠️ 60% | Build CRUD pages with existing APIs | 2FA, Sessions, Bookings, Trainer Applications, CMS, Settings, RBAC, Reporting, Export |
| **Digital Certificates** | ❌ 0% | Cannot build | Entire module missing |
| **SEO** | ⚠️ 30% | Frontend SEO implementation | Dynamic Sitemap, Schema.org API |

---

## STEP 6 — RECOMMENDED 2-WEEK SPRINT PLAN

### **Week 1: Foundation & Core Pages**

**Day 1-2: Project Setup & Homepage**
- Setup Vue.js project with Tailwind CSS
- Configure bilingual support (AR/EN) with RTL/LTR
- Build Homepage:
  - Hero slider (Slider API)
  - Academy intro (AboutUs API)
  - Featured courses (Course API)
  - Course categories (MainDepartment API)
  - Mock: Statistics, Job vacancies

**Day 3-4: About Us & Training Programs Listing**
- Build About Us pages (AboutUs, Member, Partner APIs)
- Build Training Programs listing page:
  - Course cards
  - Filters (category, instructor, location, dates, language)
  - Pagination

**Day 5: Training Program Details Page**
- Build Course details page:
  - Description, objectives, trainer info
  - Price, dates, location
  - Mock: Sessions, remaining seats, ratings/reviews

---

### **Week 2: User System & Admin Dashboard**

**Day 6-7: User Registration & Login**
- Build registration form (User/Register API)
- Build login form (Login API)
- Build password recovery flow (Forget-Password, Check-Code, Reset-Password APIs)
- Implement JWT token storage & authentication

**Day 8-9: User Dashboard & Trainer Profiles**
- Build user dashboard:
  - Profile display
  - Enrolled courses (GetCoursesByUserId API)
  - Mock: Certificates, booking tracking
- Build trainer profiles (Instructor API)
  - Listing page
  - Profile page with CV download
  - Related courses

**Day 10-11: Admin Dashboard (CRUD Pages)**
- Build admin login
- Build CRUD pages for:
  - Courses (with file uploads)
  - Instructors
  - Team Members
  - Sliders
  - Departments

**Day 12: Contact Form & Image Gallery**
- Build contact form (Message API)
- Build image gallery (Image/ImageGroup APIs)

**Day 13-14: Testing, Bug Fixes & Documentation**
- Test all pages on desktop/mobile
- Test bilingual support (AR/EN, RTL/LTR)
- Fix bugs
- Document API integration
- Prepare demo for stakeholders

---

## 🚨 CRITICAL NOTES

1. **WeatherForecast API** — This is a default ASP.NET template endpoint. It should be removed from production.

2. **Payment Gateway Mismatch** — PROJECT.md specifies **Paymob**, but swagger.json shows **Stripe** (Reserve-Course endpoint). Clarify with backend team.

3. **Missing Critical APIs:**
   - **Certificates** (100% blocked)
   - **Bulk Registration** (100% blocked)
   - **Knowledge Center Articles** (90% blocked)
   - **Booking Management** (80% blocked)
   - **Notifications** (100% blocked)
   - **Reporting & Export** (100% blocked)

4. **Sessions/Batches** — Not clear if this is embedded in Course model or needs separate API. Check with backend team.

5. **RBAC** — No roles/permissions API. Admin dashboard will have no access control.

6. **2FA** — No 2FA API. Admin accounts will not have two-factor authentication.

7. **Institutional Profiles** — User API has no fields for B2B/G2B accounts (organization name, bulk registration permissions, etc.).

8. **OTP Verification** — No OTP API for booking flow.

9. **File Upload Tracking** — No API to log when users download program files (for lead generation).

10. **Comments & Ratings** — No API for course/trainer/article comments and ratings.

---

## 📋 RECOMMENDED NEXT STEPS

1. **Prioritize Missing APIs** (Request from backend team):
   - Certificates (critical for MVP)
   - Booking Management with status workflow
   - Notifications (email/SMS/WhatsApp)
   - Knowledge Center Articles (CMS)
   - Reporting & Export

2. **Clarify Payment Gateway** — Paymob vs Stripe

3. **Clarify Sessions/Batches** — Separate API or embedded in Course?

4. **Start Frontend Development** — Follow 2-week sprint plan above

5. **Weekly Sync with Backend Team** — Review API gaps and prioritize development

---

**End of Report**
