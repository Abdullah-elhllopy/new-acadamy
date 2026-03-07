Frontend Architecture Modules
Module 0 — Foundation Setup

This module establishes the technical foundation of the project.

What you will handle

Project scaffolding (Vite + React 18 + TypeScript)

Feature-based folder structure

Global providers setup

React Router v6 routing structure

React Query (TanStack) configuration

Zustand global state stores

Axios API client + interceptors

Internationalization (react-i18next)

RTL / LTR switching

Environment variables configuration

MSW API mocking for development

Error boundaries

Global toast notification system

Deliverables

Stable application foundation

Router skeleton

Global providers

API client ready

State management ready

Module 1 — Role-Based Access Control (RBAC)

This module controls who can access what in the system.

Roles
visitor
trainee
trainer_applicant
corporate
staff
admin
What you will handle

Authentication state management

Role detection

Permission-based UI rendering

Protected routes

Token storage

Token refresh handling

Login redirects based on role

Admin 2FA flow

UI elements visibility by role

Permission matrix logic

RBAC system structure
rbac/
├── hooks/
│   ├── useAuth
│   ├── useRole
│   └── usePermissions
│
├── components/
│   ├── ProtectedRoute
│   ├── RoleGuard
│   └── PermissionGuard
│
├── store/
│   └── authStore
│
└── types/
    ├── roles
    └── permissions

Example permission matrix:

admin     → all permissions
staff     → bookings.view, bookings.edit, content.manage
corporate → team.register, reports.view
trainee   → booking.create, certificate.download
visitor   → programs.view
Module 2 — Shared Layout & Design System

This module builds the visual framework of the entire application.

What you will handle

Responsive layout system

Dashboard layouts

Navigation systems

RTL / LTR UI handling

Design system consistency

Accessibility

Skeleton loaders

Error UI states

Toast notifications

Layouts
PublicLayout
DashboardLayout
CorporateLayout
AdminLayout
Module 3 — Marketing Pages

These pages are SEO-focused public pages.

What you will handle

SEO meta tags

Lazy loading images

Animated counters

Testimonials carousel

Announcement banners

Embedded videos

Google Maps

Contact form submission

Social sharing

PDF downloads

Pages
HomePage
AboutPage
ServicesPage
FAQPage
ContactPage
Module 4 — Programs Portal

This is the most important revenue module.

What you will handle

Multi-filter system

URL-based filters

Sorting

Pagination

Program detail pages

Multiple sessions per program

Dynamic seat calculation

Real-time seat availability

Polling updates

Trainer information

Attachments

Social sharing

Reviews

SEO per program

Sessions handling

Each program can contain multiple sessions (batches).

Example session data:

Session
- startDate
- endDate
- location
- totalSeats
- confirmedBookings
Dynamic seat calculation
remainingSeats = totalSeats - confirmedBookings
Session status logic
Open
Limited seats (<20%)
Full
Upcoming
Closed
Polling strategy

Update session availability every 30 seconds.

Pages
ProgramsListPage
ProgramDetailPage
Module 5 — Booking & Payment Flow

This module is the most complex user interaction flow.

What you will handle

Multi-step booking form

Form validation (Zod)

Form state persistence

Session selection

Booking confirmation

File uploads (bank transfer receipts)

Payment gateway integration

Payment status handling

Race condition handling (seat availability)

Invoice display

Booking status updates

Multi-step flow
Step 1 — Personal Information
Step 2 — Session Selection
Step 3 — Payment Method
Step 4 — Booking Summary
Step 5 — Confirmation
Payment methods
Online payment (Paymob)
Bank transfer
Pay at center
Booking states
pending
awaiting_payment
confirmed
rejected
cancelled
refunded
Module 6 — User Dashboard

Dashboard for trainees.

What you will handle

User bookings overview

Payment status display

Certificate downloads

Profile information

Notifications

Upcoming sessions display

Pages
TraineeDashboard
MyBookings
MyCertificates
ProfileSettings
Module 7 — Trainers Portal

Public trainer directory and application system.

What you will handle

Trainer listing

Trainer profile pages

Trainer videos

Trainer reviews

Trainer program associations

Trainer application form

File uploads (CV)

Video introduction upload

Pages
TrainersListPage
TrainerProfilePage
TrainerApplicationForm
Module 8 — Knowledge Center

Content hub for articles and educational material.

What you will handle

Article listing

Article search

Article filtering

Article detail pages

Author information

Social sharing

Comment submission

Article rating

PDF export with watermark

Pages
ArticlesListPage
ArticleDetailPage
Module 9 — Admin Panel

Full administrative control panel.

What you will handle

Data tables

Filtering and sorting

CRUD operations

Booking management

Trainer management

Program management

CMS page editing

Role management

Data exports

Admin sections
Dashboard
Programs Management
Sessions Management
Bookings Management
Trainers Management
CMS Pages
Users & Roles
Reports
Module 10 — Corporate B2B Portal

Portal for companies registering multiple employees.

What you will handle

Corporate authentication

Bulk employee registration

CSV/XLSX upload

File validation

Error preview before submission

Registration status tracking

Reports dashboard

Pages
CorporateDashboard
BulkRegistration
RegistrationStatus
CorporateReports
Module 11 — Consulting Portal

Handles consulting service requests.

What you will handle

Service listings

Case studies

Consultation request forms

File uploads (RFP)

Project details submission

Budget / timeline submission

Pages
ConsultingServicesPage
CaseStudiesPage
ConsultationRequestForm
Common Components (Must Be Built Early)

These components will be shared across most modules.

UI Components
Button
Input
Textarea
Select
Checkbox
Radio
Badge
Avatar
Tabs
Accordion
Dialog
Tooltip
Form Components
FormField
FormError
PhoneInput
FileUploader
OTPInput
MultiStepFormWrapper
Data Display Components
DataTable
Pagination
FilterBar
SortDropdown
EmptyState
LoadingSpinner
SkeletonLoader
Business Components
ProgramCard
SessionCard
TrainerCard
BookingSummary
PaymentStatusBadge
CertificateBadge
ReviewCard
Layout Components
Header
Footer
Sidebar
MobileMenu
Breadcrumb
PageContainer
SectionTitle
Feedback Components
Toast
Alert
ConfirmationModal
ErrorBoundary
Components That Should Be Built First

Before starting modules, build these:

Button
Input
Select
Modal
FormField
ProgramCard
SessionCard
TrainerCard
Pagination
LoadingSpinner
EmptyState
Toast

These components will be reused in 70% of the project.