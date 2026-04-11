// app/sitemap.ts
import { MetadataRoute } from 'next';
import { SEO_CONFIG, PAGE_PRIORITIES, CHANGE_FREQUENCIES } from '@/lib/seo-config';
import { courseService } from '@/services/api/course.service';
import { trainerService } from '@/services/api/trainer.service';
import { articleService } from '@/services/api/article.service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.baseUrl;
  const currentDate = new Date();

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.homepage,
      priority: PAGE_PRIORITIES.homepage,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/about`,
          en: `${baseUrl}/en/about`,
        },
      },
    },
    {
      url: `${baseUrl}/all-programs`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.courseListing,
      priority: PAGE_PRIORITIES.courseListing,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/all-programs`,
          en: `${baseUrl}/en/all-programs`,
        },
      },
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.courseListing,
      priority: PAGE_PRIORITIES.courseListing,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/programs`,
          en: `${baseUrl}/en/programs`,
        },
      },
    },
    {
      url: `${baseUrl}/trainers`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/trainers`,
          en: `${baseUrl}/en/trainers`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/contact`,
          en: `${baseUrl}/en/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/our-team`,
          en: `${baseUrl}/en/our-team`,
        },
      },
    },
    {
      url: `${baseUrl}/our-partners`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/our-partners`,
          en: `${baseUrl}/en/our-partners`,
        },
      },
    },
    {
      url: `${baseUrl}/images-center`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/images-center`,
          en: `${baseUrl}/en/images-center`,
        },
      },
    },
    {
      url: `${baseUrl}/be-trainer`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.staticPages,
      priority: PAGE_PRIORITIES.staticPages,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/be-trainer`,
          en: `${baseUrl}/en/be-trainer`,
        },
      },
    },
  ];

  // Dynamic course routes
  let courseRoutes: MetadataRoute.Sitemap = [];
  try {
    const coursesData = await courseService.getAll();
    const courses = coursesData.allCoursesDetails || [];
    
    courseRoutes = courses.map((course) => ({
      url: `${baseUrl}/programs/${course.courseId}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.courseDetail,
      priority: PAGE_PRIORITIES.courseDetail,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/programs/${course.courseId}`,
          en: `${baseUrl}/en/programs/${course.courseId}`,
        },
      },
    }));
  } catch (error) {
    console.error('Error fetching courses for sitemap:', error);
  }

  // Dynamic trainer routes
  let trainerRoutes: MetadataRoute.Sitemap = [];
  try {
    const trainers = await trainerService.getAll();
    
    trainerRoutes = trainers.map((trainer) => ({
      url: `${baseUrl}/trainers/${trainer.instructorid}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.trainerProfile,
      priority: PAGE_PRIORITIES.trainerProfile,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/trainers/${trainer.instructorid}`,
          en: `${baseUrl}/en/trainers/${trainer.instructorid}`,
        },
      },
    }));
  } catch (error) {
    console.error('Error fetching trainers for sitemap:', error);
  }

  // Dynamic article routes
  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    const articles = await articleService.getAll();
    
    articleRoutes = articles.map((article) => ({
      url: `${baseUrl}/articles/${article.id}`,
      lastModified: currentDate,
      changeFrequency: CHANGE_FREQUENCIES.article,
      priority: PAGE_PRIORITIES.article,
      alternates: {
        languages: {
          ar: `${baseUrl}/ar/articles/${article.id}`,
          en: `${baseUrl}/en/articles/${article.id}`,
        },
      },
    }));
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
  }

  return [...staticRoutes, ...courseRoutes, ...trainerRoutes, ...articleRoutes];
}
