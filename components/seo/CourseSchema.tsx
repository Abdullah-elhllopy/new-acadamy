// components/seo/CourseSchema.tsx
import { JsonLd } from './JsonLd';
import { generateCourseSchema } from '@/lib/metadata';

interface CourseSchemaProps {
  course: {
    name: string;
    description: string;
    provider: string;
    url: string;
    image?: string;
    price?: number;
    currency?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    instructor?: string;
  };
}

export function CourseSchema({ course }: CourseSchemaProps) {
  const schema = generateCourseSchema(course);
  return <JsonLd data={schema} />;
}
