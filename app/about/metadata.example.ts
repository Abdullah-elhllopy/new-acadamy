// app/about/metadata.ts
import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'About ID Academy',
  description: 'Learn about the Academy for Integrated Development in Leadership and Management. Our vision, mission, and commitment to professional training excellence.',
  locale: 'en',
  path: '/about',
  keywords: ['about id academy', 'training academy egypt', 'professional development', 'leadership training'],
});
