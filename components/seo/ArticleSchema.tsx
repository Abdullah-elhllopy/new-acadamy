// components/seo/ArticleSchema.tsx
import { JsonLd } from './JsonLd';
import { generateArticleSchema } from '@/lib/metadata';

interface ArticleSchemaProps {
  article: {
    headline: string;
    description: string;
    image?: string;
    datePublished: string;
    dateModified?: string;
    author: string;
    url: string;
  };
}

export function ArticleSchema({ article }: ArticleSchemaProps) {
  const schema = generateArticleSchema(article);
  return <JsonLd data={schema} />;
}
