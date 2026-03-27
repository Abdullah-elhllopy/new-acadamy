# 🚀 Quick Start Guide - API Integration

## 1. Configure API Base URL (30 seconds)

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Replace with your actual backend URL.

## 2. Start Using APIs (Copy & Paste)

### Example 1: Display All Courses

```tsx
'use client';

import { useCourses } from '@/hooks/api';

export function CoursesList() {
  const { data: courses, isLoading } = useCourses();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {courses?.map((course) => (
        <div key={course.courseId}>
          <h3>{course.courseName}</h3>
          <p>{course.courseDescripTion}</p>
          <p>Cost: ${course.courseCost}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 2: Display All Trainers

```tsx
'use client';

import { useTrainers } from '@/hooks/api';

export function TrainersList() {
  const { data: trainers, isLoading } = useTrainers();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {trainers?.map((trainer) => (
        <div key={trainer.instructorId}>
          <h3>{trainer.instructorName}</h3>
          <p>{trainer.instructorEmail}</p>
        </div>
      ))}
    </div>
  );
}
```

### Example 3: Contact Form

```tsx
'use client';

import { useCreateContactMessage } from '@/hooks/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ContactForm() {
  const createMessage = useCreateContactMessage();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await createMessage.mutateAsync({
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    });
    
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="fullName" placeholder="Full Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="subject" placeholder="Subject" required />
      <textarea name="message" placeholder="Message" required className="w-full p-2 border rounded" />
      <Button type="submit" disabled={createMessage.isPending}>
        {createMessage.isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

### Example 4: Email Subscription

```tsx
'use client';

import { useCreateEmailSubscription } from '@/hooks/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function EmailSubscription() {
  const subscribe = useCreateEmailSubscription();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    
    await subscribe.mutateAsync(email);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input 
        name="email" 
        type="email" 
        placeholder="Enter your email" 
        required 
      />
      <Button type="submit" disabled={subscribe.isPending}>
        Subscribe
      </Button>
    </form>
  );
}
```

### Example 5: Be Trainer Form

```tsx
'use client';

import { useCreateBeTrainerRequest } from '@/hooks/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function BeTrainerForm() {
  const createRequest = useCreateBeTrainerRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await createRequest.mutateAsync(formData);
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="fullName" placeholder="Full Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="phone" placeholder="Phone" required />
      <Input name="specialization" placeholder="Specialization" required />
      <Input name="experience" type="number" placeholder="Years of Experience" required />
      <Input name="cvFile" type="file" accept=".pdf" required />
      <Input name="imageFile" type="file" accept="image/*" required />
      <Input name="linkedin" placeholder="LinkedIn Profile" />
      <textarea name="message" placeholder="Tell us about yourself" className="w-full p-2 border rounded" />
      <Button type="submit" disabled={createRequest.isPending}>
        {createRequest.isPending ? 'Submitting...' : 'Submit Application'}
      </Button>
    </form>
  );
}
```

### Example 6: Filter Courses

```tsx
'use client';

import { useCoursesFilterByBool } from '@/hooks/api';

export function RecommendedCourses() {
  const { data: courses, isLoading } = useCoursesFilterByBool({ 
    recommended: true 
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Recommended Courses</h2>
      {courses?.map((course) => (
        <div key={course.courseId}>{course.courseName}</div>
      ))}
    </div>
  );
}

export function MostSellingCourses() {
  const { data: courses } = useCoursesFilterByBool({ 
    mostSelling: true 
  });

  return (
    <div>
      <h2>Most Selling Courses</h2>
      {courses?.map((course) => (
        <div key={course.courseId}>{course.courseName}</div>
      ))}
    </div>
  );
}
```

### Example 7: About Us Page

```tsx
'use client';

import { useAboutUs } from '@/hooks/api';

export function AboutUsPage() {
  const { data: aboutUs, isLoading } = useAboutUs();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>{aboutUs?.name}</h1>
      <p>{aboutUs?.aboutUs}</p>
      <div>
        <h2>Our Vision</h2>
        <p>{aboutUs?.ourVision}</p>
      </div>
      <div>
        <h2>Our Message</h2>
        <p>{aboutUs?.ourMessage}</p>
      </div>
      <div>
        <h2>Our Values</h2>
        {aboutUs?.ourValues?.map((value, index) => (
          <div key={index}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
      <div>
        <p>Email: {aboutUs?.email}</p>
        <p>Phone: {aboutUs?.phone}</p>
        <p>Address: {aboutUs?.address}</p>
      </div>
    </div>
  );
}
```

### Example 8: Partners & Team

```tsx
'use client';

import { usePartners, useTeamMembers } from '@/hooks/api';

export function PartnersSection() {
  const { data: partners } = usePartners();

  return (
    <div>
      <h2>Our Partners</h2>
      <div className="grid grid-cols-4 gap-4">
        {partners?.map((partner) => (
          <div key={partner.partnerId}>
            <img src={partner.partnerLogo} alt={partner.partnerName} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeamSection() {
  const { data: team } = useTeamMembers();

  return (
    <div>
      <h2>Our Team</h2>
      <div className="grid grid-cols-3 gap-4">
        {team?.map((member) => (
          <div key={member.teamId}>
            <img src={member.memberImage} alt={member.memberName} />
            <h3>{member.memberName}</h3>
            <p>{member.memberPosition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Example 9: Image Gallery

```tsx
'use client';

import { useImageGroups, useImagesByGroup } from '@/hooks/api';

export function ImageGallery() {
  const { data: groups } = useImageGroups();

  return (
    <div>
      {groups?.map((group) => (
        <ImageGroup key={group.groupId} groupId={group.groupId!} />
      ))}
    </div>
  );
}

function ImageGroup({ groupId }: { groupId: string }) {
  const { data: images } = useImagesByGroup(groupId);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {images?.map((image) => (
          <img key={image.imageId} src={image.imagePath} alt={image.imageTitle} />
        ))}
      </div>
    </div>
  );
}
```

### Example 10: Training Request Form

```tsx
'use client';

import { useCreateTrainingRequest } from '@/hooks/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function TrainingRequestForm({ courseId }: { courseId: string }) {
  const createRequest = useCreateTrainingRequest();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    await createRequest.mutateAsync({
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      courseId: courseId,
      organizationName: formData.get('organizationName') as string,
      numberOfTrainees: Number(formData.get('numberOfTrainees')),
      message: formData.get('message') as string,
    });
    
    e.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input name="fullName" placeholder="Full Name" required />
      <Input name="email" type="email" placeholder="Email" required />
      <Input name="phone" placeholder="Phone" required />
      <Input name="organizationName" placeholder="Organization Name" />
      <Input name="numberOfTrainees" type="number" placeholder="Number of Trainees" />
      <textarea name="message" placeholder="Additional Information" className="w-full p-2 border rounded" />
      <Button type="submit" disabled={createRequest.isPending}>
        {createRequest.isPending ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  );
}
```

## 3. All Available Hooks

```typescript
// Courses
useCourses()
useCourse(id)
useCoursesFilterByName(name)
useCoursesFilterByCategory(filter)
useCoursesFilterByBool(filter)
useCreateCourse()
useUpdateCourse()
useDeleteCourse()
useAddWWWL()

// Trainers
useTrainers()
useTrainer(id)
useCreateTrainer()
useUpdateTrainer()
useDeleteTrainer()

// Departments
useMainDepartments()
useMainDepartment(id)
useSubDepartments()
useSubDepartment(id)
useCreateMainDepartment()
useUpdateMainDepartment()
useDeleteMainDepartment()
useCreateSubDepartment()
useUpdateSubDepartment()
useDeleteSubDepartment()

// Requests
useTrainingRequests()
useTrainingRequest(id)
useCreateTrainingRequest()
useUpdateTrainingRequestStatus()
useBeTrainerRequests()
useBeTrainerRequest(id)
useCreateBeTrainerRequest()
useUpdateBeTrainerRequestStatus()
useContactMessages()
useContactMessage(id)
useCreateContactMessage()
useEmailSubscriptions()
useCreateEmailSubscription()

// Common
usePartners()
usePartner(id)
useCreatePartner()
useUpdatePartner()
useDeletePartner()
useTeamMembers()
useTeamMember(id)
useCreateTeamMember()
useUpdateTeamMember()
useDeleteTeamMember()
useSliders()
useSlider(id)
useCreateSlider()
useUpdateSlider()
useDeleteSlider()
useImageGroups()
useImageGroup(id)
useImagesByGroup(groupId)
useCreateImageGroup()
useUpdateImageGroup()
useDeleteImageGroup()
useCreateImage()
useDeleteImage()

// About Us
useAboutUs()
useAddAboutUs()
useUpdateAboutUs()
useAddValue()
```

## 4. Common Patterns

### Loading State
```tsx
if (isLoading) return <Skeleton />;
```

### Error State
```tsx
if (error) return <div>Error: {error.message}</div>;
```

### Empty State
```tsx
if (!data?.length) return <div>No items found</div>;
```

### Mutation with Loading
```tsx
<Button disabled={mutation.isPending}>
  {mutation.isPending ? 'Loading...' : 'Submit'}
</Button>
```

## 5. That's It! 🎉

You're ready to use the API integration. All hooks automatically handle:
- ✅ Loading states
- ✅ Error handling
- ✅ Caching
- ✅ Toast notifications
- ✅ Type safety

For more details, see `API_INTEGRATION_GUIDE.md`
