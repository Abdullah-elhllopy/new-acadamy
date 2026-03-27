# 🏗️ API Integration Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 16)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    COMPONENTS LAYER                         │ │
│  │  (UI Components - Pages, Forms, Lists, Cards)              │ │
│  │                                                             │ │
│  │  - CoursesList.tsx                                         │ │
│  │  - TrainerProfile.tsx                                      │ │
│  │  - ContactForm.tsx                                         │ │
│  │  - etc...                                                  │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓ ↑                                   │
│                    (uses hooks)                                  │
│                            ↓ ↑                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                 REACT QUERY HOOKS LAYER                     │ │
│  │  (Data Fetching, Caching, State Management)                │ │
│  │                                                             │ │
│  │  hooks/api/                                                │ │
│  │  ├── use-courses.ts      (9 hooks)                        │ │
│  │  ├── use-trainers.ts     (5 hooks)                        │ │
│  │  ├── use-departments.ts  (10 hooks)                       │ │
│  │  ├── use-requests.ts     (14 hooks)                       │ │
│  │  ├── use-common.ts       (24 hooks)                       │ │
│  │  └── use-about-us.ts     (3 hooks)                        │ │
│  │                                                             │ │
│  │  Features:                                                 │ │
│  │  ✓ Automatic caching                                      │ │
│  │  ✓ Loading/error states                                   │ │
│  │  ✓ Cache invalidation                                     │ │
│  │  ✓ Toast notifications                                    │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓ ↑                                   │
│                    (calls services)                              │
│                            ↓ ↑                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    SERVICES LAYER                           │ │
│  │  (Business Logic, Data Transformation)                     │ │
│  │                                                             │ │
│  │  services/api/                                             │ │
│  │  ├── course.service.ts      (Course operations)           │ │
│  │  ├── trainer.service.ts     (Trainer operations)          │ │
│  │  ├── department.service.ts  (Department operations)       │ │
│  │  ├── request.service.ts     (Request operations)          │ │
│  │  ├── about-us.service.ts    (About Us operations)         │ │
│  │  ├── common.service.ts      (Common operations)           │ │
│  │  └── user.service.ts        (Auth & User operations)      │ │
│  │                                                             │ │
│  │  Each service:                                             │ │
│  │  ✓ Single responsibility                                  │ │
│  │  ✓ Type-safe methods                                      │ │
│  │  ✓ Clean API                                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓ ↑                                   │
│                    (uses HTTP client)                            │
│                            ↓ ↑                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                   HTTP CLIENT LAYER                         │ │
│  │  (Axios with Interceptors)                                 │ │
│  │                                                             │ │
│  │  services/api/client.ts                                    │ │
│  │                                                             │ │
│  │  Features:                                                 │ │
│  │  ✓ Request interceptor (add JWT token)                    │ │
│  │  ✓ Response interceptor (handle 401)                      │ │
│  │  ✓ Base URL configuration                                 │ │
│  │  ✓ Timeout handling                                       │ │
│  │  ✓ FormData support                                       │ │
│  └────────────────────────────────────────────────────────────┘ │
│                            ↓ ↑                                   │
│                    (HTTP requests)                               │
│                            ↓ ↑                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  CONFIGURATION LAYER                        │ │
│  │                                                             │ │
│  │  services/api/config.ts                                    │ │
│  │                                                             │ │
│  │  - API_BASE_URL (from .env.local)                         │ │
│  │  - 72 API endpoints mapped                                │ │
│  │  - Type-safe endpoint functions                           │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓ ↑
                    (HTTP/HTTPS)
                            ↓ ↑
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API (.NET)                          │
│                                                                   │
│  Endpoints:                                                      │
│  - /api/Course/*                                                │
│  - /api/Instructor/*                                            │
│  - /api/Department/*                                            │
│  - /api/AboutUs/*                                               │
│  - /api/Partner/*                                               │
│  - /api/Team/*                                                  │
│  - /api/Slider/*                                                │
│  - /api/Request/*                                               │
│  - /api/ContactUs/*                                             │
│  - /api/ImagesGroup/*                                           │
│  - /api/Image/*                                                 │
│  - /api/User/*                                                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow Example: Fetching Courses

```
1. Component calls hook
   ┌─────────────────────────┐
   │ const { data } =        │
   │   useCourses();         │
   └─────────────────────────┘
              ↓
2. React Query checks cache
   ┌─────────────────────────┐
   │ Cache hit? Return data  │
   │ Cache miss? Fetch       │
   └─────────────────────────┘
              ↓
3. Hook calls service
   ┌─────────────────────────┐
   │ courseService.getAll()  │
   └─────────────────────────┘
              ↓
4. Service calls API client
   ┌─────────────────────────┐
   │ apiClient.get(          │
   │   '/api/Course/All'     │
   │ )                       │
   └─────────────────────────┘
              ↓
5. Client adds JWT token
   ┌─────────────────────────┐
   │ Authorization: Bearer   │
   │ <token>                 │
   └─────────────────────────┘
              ↓
6. HTTP request to backend
   ┌─────────────────────────┐
   │ GET /api/Course/All     │
   └─────────────────────────┘
              ↓
7. Backend processes & responds
   ┌─────────────────────────┐
   │ 200 OK                  │
   │ [{ course1 }, ...]      │
   └─────────────────────────┘
              ↓
8. Client returns data
   ┌─────────────────────────┐
   │ return response.data    │
   └─────────────────────────┘
              ↓
9. React Query caches data
   ┌─────────────────────────┐
   │ Cache for 1 minute      │
   └─────────────────────────┘
              ↓
10. Component receives data
   ┌─────────────────────────┐
   │ data = [courses]        │
   │ isLoading = false       │
   └─────────────────────────┘
```

## Mutation Flow Example: Creating a Course

```
1. User submits form
   ┌─────────────────────────┐
   │ <form onSubmit={...}>   │
   └─────────────────────────┘
              ↓
2. Component calls mutation
   ┌─────────────────────────┐
   │ createCourse.mutateAsync│
   │   (formData)            │
   └─────────────────────────┘
              ↓
3. React Query executes mutation
   ┌─────────────────────────┐
   │ mutationFn: (data) =>   │
   │   service.create(data)  │
   └─────────────────────────┘
              ↓
4. Service prepares request
   ┌─────────────────────────┐
   │ courseService.create(   │
   │   formData              │
   │ )                       │
   └─────────────────────────┘
              ↓
5. Client sends POST request
   ┌─────────────────────────┐
   │ POST /api/Course/Create │
   │ Content-Type: multipart │
   │ Body: formData          │
   └─────────────────────────┘
              ↓
6. Backend creates course
   ┌─────────────────────────┐
   │ 200 OK                  │
   │ { courseId: "..." }     │
   └─────────────────────────┘
              ↓
7. React Query invalidates cache
   ┌─────────────────────────┐
   │ invalidateQueries(      │
   │   'courses'             │
   │ )                       │
   └─────────────────────────┘
              ↓
8. Show success toast
   ┌─────────────────────────┐
   │ toast.success(          │
   │   'Course created'      │
   │ )                       │
   └─────────────────────────┘
              ↓
9. Refetch courses list
   ┌─────────────────────────┐
   │ GET /api/Course/All     │
   │ (automatic)             │
   └─────────────────────────┘
              ↓
10. UI updates with new data
   ┌─────────────────────────┐
   │ List shows new course   │
   └─────────────────────────┘
```

## Authentication Flow

```
1. User logs in
   ┌─────────────────────────┐
   │ userService.login({     │
   │   email, password       │
   │ })                      │
   └─────────────────────────┘
              ↓
2. POST to /api/User/Login
   ┌─────────────────────────┐
   │ Backend validates       │
   │ Returns JWT token       │
   └─────────────────────────┘
              ↓
3. Token stored in localStorage
   ┌─────────────────────────┐
   │ localStorage.setItem(   │
   │   'token', jwt          │
   │ )                       │
   └─────────────────────────┘
              ↓
4. All subsequent requests include token
   ┌─────────────────────────┐
   │ Request Interceptor:    │
   │ Authorization: Bearer   │
   │ <token>                 │
   └─────────────────────────┘
              ↓
5. If 401 response
   ┌─────────────────────────┐
   │ Response Interceptor:   │
   │ - Remove token          │
   │ - Redirect to /login    │
   └─────────────────────────┘
```

## Error Handling Flow

```
1. Request fails
   ┌─────────────────────────┐
   │ Network error or        │
   │ Server error (4xx/5xx)  │
   └─────────────────────────┘
              ↓
2. Axios catches error
   ┌─────────────────────────┐
   │ Response interceptor    │
   │ checks status code      │
   └─────────────────────────┘
              ↓
3. React Query receives error
   ┌─────────────────────────┐
   │ error state set         │
   │ isError = true          │
   └─────────────────────────┘
              ↓
4. Mutation shows toast
   ┌─────────────────────────┐
   │ onError: (error) =>     │
   │   toast.error(...)      │
   └─────────────────────────┘
              ↓
5. Component handles error
   ┌─────────────────────────┐
   │ if (error) return       │
   │   <ErrorMessage />      │
   └─────────────────────────┘
```

## File Organization

```
Acadamy/
├── services/
│   └── api/
│       ├── config.ts              ← Endpoints & base URL
│       ├── client.ts              ← Axios instance
│       ├── course.service.ts      ← Course logic
│       ├── trainer.service.ts     ← Trainer logic
│       ├── department.service.ts  ← Department logic
│       ├── request.service.ts     ← Request logic
│       ├── about-us.service.ts    ← About Us logic
│       ├── common.service.ts      ← Common logic
│       ├── user.service.ts        ← Auth logic
│       └── index.ts               ← Exports
│
├── hooks/
│   └── api/
│       ├── use-courses.ts         ← Course hooks
│       ├── use-trainers.ts        ← Trainer hooks
│       ├── use-departments.ts     ← Department hooks
│       ├── use-requests.ts        ← Request hooks
│       ├── use-common.ts          ← Common hooks
│       ├── use-about-us.ts        ← About Us hooks
│       └── index.ts               ← Exports
│
├── components/
│   ├── providers/
│   │   └── react-query-provider.tsx  ← React Query setup
│   └── examples/
│       └── courses-example.tsx       ← Usage example
│
├── app/
│   └── layout.tsx                 ← Provider wrapper
│
├── .env.local                     ← API URL (create this)
├── .env.example                   ← Template
│
└── Documentation/
    ├── API_INTEGRATION_GUIDE.md   ← Complete guide
    ├── QUICK_START.md             ← Quick examples
    ├── IMPLEMENTATION_SUMMARY.md  ← What was built
    ├── README_API.md              ← Overview
    └── ARCHITECTURE.md            ← This file
```

## Key Concepts

### 1. Separation of Concerns
- **Components**: Only UI logic
- **Hooks**: Data fetching & state
- **Services**: Business logic
- **Client**: HTTP communication

### 2. Single Source of Truth
- React Query cache is the source of truth
- No duplicate state management
- Automatic synchronization

### 3. Type Safety
- TypeScript throughout
- Interfaces for all data
- Compile-time error checking

### 4. Error Handling
- Centralized in interceptors
- Automatic toast notifications
- Graceful degradation

### 5. Performance
- Automatic caching
- Request deduplication
- Stale-while-revalidate
- Optimistic updates

## Benefits of This Architecture

✅ **Maintainable** - Clear separation of concerns
✅ **Testable** - Each layer can be tested independently
✅ **Scalable** - Easy to add new features
✅ **Type-Safe** - Catch errors at compile time
✅ **Performant** - Automatic caching and optimization
✅ **Developer-Friendly** - Clean, intuitive API
✅ **Production-Ready** - Error handling, loading states, etc.
