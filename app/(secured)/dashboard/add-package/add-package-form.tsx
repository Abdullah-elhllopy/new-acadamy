'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { packageSchema, type PackageFormData } from '@/lib/validations';
import { Form } from '@/components/forms/form';
import { FormField } from '@/components/forms/form-field';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCreatePackage } from '@/hooks/api/use-packages';
import { useRouter } from 'next/navigation';
import { useCourses } from '@/hooks/api/use-courses';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function AddPackageForm() {
  const router = useRouter();
  const createPackage = useCreatePackage();
  const { data: coursesResponse } = useCourses();
  const courses = coursesResponse?.allCoursesDetails || [];

  const methods = useForm<PackageFormData>({
    resolver: zodResolver(packageSchema),
    defaultValues: {
      name: '',
      description: '',
      price: '',
      type: '',
      coursesIds: [],
    },
  });

  const handleSubmit = async (data: PackageFormData) => {
    await createPackage.mutateAsync({
      ...data,
      price: parseFloat(data.price),
    });
    router.push('/dashboard');
  };

  return (
    <Card className="p-6">
      <Form methods={methods} onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField name="name" label="Package Name" required />
        <FormField name="description" label="Description" type="textarea" rows={3} />
        <FormField name="price" label="Price" type="number" required />
        <FormField name="type" label="Package Type" placeholder="e.g., Basic, Premium, Enterprise" />

        <div className="space-y-2">
          <Label>Select Courses</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-md p-4 max-h-60 overflow-y-auto">
            {courses.map((course) => (
              <div key={course.courseId} className="flex items-center space-x-2">
                <Checkbox
                  id={course.courseId}
                  checked={methods.watch('coursesIds')?.includes(course.courseId)}
                  onCheckedChange={(checked) => {
                    const current = methods.getValues('coursesIds') || [];
                    if (checked) {
                      methods.setValue('coursesIds', [...current, course.courseId]);
                    } else {
                      methods.setValue(
                        'coursesIds',
                        current.filter((id) => id !== course.courseId)
                      );
                    }
                  }}
                />
                <label
                  htmlFor={course.courseId}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {course.courseName}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={createPackage.isPending}>
            {createPackage.isPending ? 'Creating...' : 'Create Package'}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
}
