// components/seo/BreadcrumbSchema.tsx
import { JsonLd } from './JsonLd';
import { generateBreadcrumbSchema } from '@/lib/metadata';

interface BreadcrumbSchemaProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = generateBreadcrumbSchema(items);
  return <JsonLd data={schema} />;
}
