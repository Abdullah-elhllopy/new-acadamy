# API Integration Guide

## Overview

This project uses a clean, SOLID-based architecture for API integration with:
- **Axios** for HTTP requests
- **@tanstack/react-query** for data fetching, caching, and state management
- **Service Layer Pattern** for separation of concerns
- **TypeScript** for type safety

## Architecture

```
services/
  api/
    ├── config.ts              # API endpoints and base URL
    ├── client.ts              # Axios client with interceptors
    ├── course.service.ts      # Course-related API calls
    ├── trainer.service.ts     # Trainer-related API calls
    ├── department.service.ts  # Department-related API calls
    ├── request.service.ts     # Request-related API calls
    ├── common.service.ts      # Partners, Team, Sliders, Images
    ├── about-us.service.ts    # About Us API calls
    ├── user.service.ts        # Auth & User management
    └── index.ts               # Export all services

hooks/
  api/
    ├── use-courses.ts         # React Query hooks for courses
    ├── use-trainers.ts        # React Query hooks for trainers
    ├── use-departments.ts     # React Query hooks for departments
    ├── use-requests.ts        # React Query hooks for requests
    ├── use-common.ts          # React Query hooks for common services
    ├── use-about-us.ts        # React Query hooks for about us
    └── index.ts               # Export all hooks
```

## Setup

### 1. Install Dependencies

Already installed:
```bash
npm install axios @tanstack/react-query
```

### 2. Configure Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

### 3. Provider Setup

The `ReactQueryProvider` is already added to `app/layout.tsx`.

## Usage Examples

### Fetching Data (GET)

```tsx
'use client';

import { useCourses } from '@/hooks/api';

export function CoursesList() {
  const { data: courses, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {courses?.map((course) => (
        <div key={course.courseId}>{course.courseName}</div>
      ))}
    </div>
  );
}
```

### Fetching Single Item

```tsx
'use client';

import { useCourse } from '@/hooks/api';

export function CourseDetail({ id }: { id: string }) {
  const { data: course, isLoading } = useCourse(id);

  if (isLoading) return <div>Loading...</div>;

  return <div>{course?.courseName}</div>;
}
```

### Creating Data (POST)

```tsx
'use client';

import { useCreateCourse } from '@/hooks/api';

export function CreateCourseForm() {
  const createCourse = useCreateCourse();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await createCourse.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="CourseName" required />
      <button type="submit" disabled={createCourse.isPending}>
        {createCourse.isPending ? 'Creating...' : 'Create Course'}
      </button>
    </form>
  );
}
```

### Updating Data (PUT/POST)

```tsx
'use client';

import { useUpdateCourse } from '@/hooks/api';

export function EditCourseForm({ courseId }: { courseId: string }) {
  const updateCourse = useUpdateCourse();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await updateCourse.mutateAsync({ courseId, formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="CourseName" required />
      <button type="submit" disabled={updateCourse.isPending}>
        Update
      </button>
    </form>
  );
}
```

### Deleting Data (DELETE)

```tsx
'use client';

import { useDeleteCourse } from '@/hooks/api';

export function DeleteCourseButton({ courseId }: { courseId: string }) {
  const deleteCourse = useDeleteCourse();

  const handleDelete = async () => {
    if (confirm('Are you sure?')) {
      await deleteCourse.mutateAsync(courseId);
    }
  };

  return (
    <button onClick={handleDelete} disabled={deleteCourse.isPending}>
      Delete
    </button>
  );
}
```

### Filtering Data

```tsx
'use client';

import { useCoursesFilterByBool } from '@/hooks/api';

export function RecommendedCourses() {
  const { data: courses } = useCoursesFilterByBool({ recommended: true });

  return (
    <div>
      {courses?.map((course) => (
        <div key={course.courseId}>{course.courseName}</div>
      ))}
    </div>
  );
}
```

## Available Hooks

### Courses
- `useCourses()` - Get all courses
- `useCourse(id)` - Get single course
- `useCoursesFilterByName(name)` - Filter by name
- `useCoursesFilterByCategory(filter)` - Filter by category
- `useCoursesFilterByBool(filter)` - Filter by boolean flags
- `useCreateCourse()` - Create course
- `useUpdateCourse()` - Update course
- `useDeleteCourse()` - Delete course
- `useAddWWWL()` - Add learning outcome

### Trainers
- `useTrainers()` - Get all trainers
- `useTrainer(id)` - Get single trainer
- `useCreateTrainer()` - Create trainer
- `useUpdateTrainer()` - Update trainer
- `useDeleteTrainer()` - Delete trainer

### Departments
- `useMainDepartments()` - Get all main departments
- `useMainDepartment(id)` - Get single main department
- `useSubDepartments()` - Get all sub departments
- `useSubDepartment(id)` - Get single sub department
- `useCreateMainDepartment()` - Create main department
- `useUpdateMainDepartment()` - Update main department
- `useDeleteMainDepartment()` - Delete main department
- `useCreateSubDepartment()` - Create sub department
- `useUpdateSubDepartment()` - Update sub department
- `useDeleteSubDepartment()` - Delete sub department

### Requests
- `useTrainingRequests()` - Get all training requests
- `useTrainingRequest(id)` - Get single training request
- `useCreateTrainingRequest()` - Create training request
- `useUpdateTrainingRequestStatus()` - Update request status
- `useBeTrainerRequests()` - Get all be-trainer requests
- `useBeTrainerRequest(id)` - Get single be-trainer request
- `useCreateBeTrainerRequest()` - Create be-trainer request
- `useUpdateBeTrainerRequestStatus()` - Update request status
- `useContactMessages()` - Get all contact messages
- `useContactMessage(id)` - Get single contact message
- `useCreateContactMessage()` - Create contact message
- `useEmailSubscriptions()` - Get all email subscriptions
- `useCreateEmailSubscription()` - Create email subscription

### Common Services
- `usePartners()` - Get all partners
- `usePartner(id)` - Get single partner
- `useCreatePartner()` - Create partner
- `useUpdatePartner()` - Update partner
- `useDeletePartner()` - Delete partner
- `useTeamMembers()` - Get all team members
- `useTeamMember(id)` - Get single team member
- `useCreateTeamMember()` - Create team member
- `useUpdateTeamMember()` - Update team member
- `useDeleteTeamMember()` - Delete team member
- `useSliders()` - Get all sliders
- `useSlider(id)` - Get single slider
- `useCreateSlider()` - Create slider
- `useUpdateSlider()` - Update slider
- `useDeleteSlider()` - Delete slider
- `useImageGroups()` - Get all image groups
- `useImageGroup(id)` - Get single image group
- `useImagesByGroup(groupId)` - Get images by group
- `useCreateImageGroup()` - Create image group
- `useUpdateImageGroup()` - Update image group
- `useDeleteImageGroup()` - Delete image group
- `useCreateImage()` - Create image
- `useDeleteImage()` - Delete image

### About Us
- `useAboutUs()` - Get about us information
- `useAddAboutUs()` - Add about us information
- `useUpdateAboutUs()` - Update about us information
- `useAddValue()` - Add value

## API Endpoints

All endpoints are defined in `services/api/config.ts`:

```typescript
export const endpoints = {
  aboutUs: {
    get: '/api/AboutUs/About-Us',
    add: '/api/AboutUs/Add-About-Us',
    update: '/api/AboutUs/Update-About-Us',
    addValue: '/api/AboutUs/Add-OneValue',
  },
  courses: {
    getAll: '/api/Course/All-Courses',
    getById: (id: string) => `/api/Course/get-Course/${id}`,
    // ... more endpoints
  },
  // ... more services
};
```

## Authentication

The API client automatically:
1. Adds JWT token to requests (from localStorage)
2. Handles 401 responses (redirects to login)
3. Manages token storage

```typescript
// Login
import { userService } from '@/services/api';

const response = await userService.login({ email, password });
// Token is automatically stored

// Logout
userService.logout();
// Token is removed and user is redirected
```

## Error Handling

All mutations automatically show toast notifications:
- Success: Green toast with success message
- Error: Red toast with error message

```typescript
const createCourse = useCreateCourse();

// Automatically shows success/error toast
await createCourse.mutateAsync(formData);
```

## Best Practices

### 1. Use Query Keys Consistently
```typescript
// Good
const { data } = useCourse(id);

// Avoid direct API calls in components
// Bad
const data = await courseService.getById(id);
```

### 2. Handle Loading States
```typescript
const { data, isLoading, error } = useCourses();

if (isLoading) return <Skeleton />;
if (error) return <ErrorMessage error={error} />;
```

### 3. Optimistic Updates (Advanced)
```typescript
const updateCourse = useUpdateCourse();

await updateCourse.mutateAsync(data, {
  onSuccess: () => {
    // Data is automatically refetched
  },
});
```

### 4. Prefetching (Advanced)
```typescript
import { useQueryClient } from '@tanstack/react-query';
import { COURSE_KEYS, courseService } from '@/hooks/api';

const queryClient = useQueryClient();

// Prefetch on hover
const handleMouseEnter = () => {
  queryClient.prefetchQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: () => courseService.getById(id),
  });
};
```

## SOLID Principles Applied

1. **Single Responsibility**: Each service handles one domain
2. **Open/Closed**: Easy to extend with new services
3. **Liskov Substitution**: Services can be swapped
4. **Interface Segregation**: Focused interfaces per service
5. **Dependency Inversion**: Components depend on abstractions (hooks)

## Next Steps

1. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. Replace mock data with API hooks
3. Test API integration
4. Add error boundaries for better error handling
5. Consider adding React Query DevTools for debugging

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure your backend allows requests from your frontend domain.

### 401 Unauthorized
Check that:
1. Token is being stored correctly
2. Token is valid and not expired
3. Backend is accepting the Authorization header

### Network Errors
Verify:
1. API base URL is correct
2. Backend is running
3. Network connectivity

## Support

For issues or questions, refer to:
- [React Query Docs](https://tanstack.com/query/latest)
- [Axios Docs](https://axios-http.com/)
