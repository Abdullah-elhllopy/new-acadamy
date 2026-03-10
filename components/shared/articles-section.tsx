'use client'

import { Button } from '../ui/button'
import { ArticleCard, ArticleCardProps } from './article-card'
import { motion } from 'framer-motion'

interface ArticleAuthor {
  id: string
  name: string
  nameAr: string
  role: string
  roleAr: string
  avatar?: string
}

interface Article {
  id: string
  title: string
  titleAr: string
  category: string
  categoryAr: string
  description: string
  descriptionAr: string
  image: string
  author: ArticleAuthor
  href?: string
}
const mockArticles: ArticleCardProps[] = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence in Healthcare",
    titleAr: "مستقبل الذكاء الاصطناعي في الرعاية الصحية",
    category: "Technology",
    categoryAr: "تكنولوجيا",
    description: "Exploring how AI is revolutionizing medical diagnostics and patient care with cutting-edge innovations.",
    descriptionAr: "استكشاف كيف يُحدث الذكاء الاصطناعي ثورة في التشخيص الطبي ورعاية المرضى من خلال الابتكارات المتطورة.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    author: {
      id: "a1",
      name: "Dr. Sarah Johnson",
      nameAr: "د. سارة جونسون",
      role: "Medical Technology Specialist",
      roleAr: "أخصائية التكنولوجيا الطبية",
      avatar: "https://images.unsplash.com/photo-1494790108777-38585c3a23d7"
    },
    href: "/articles/future-of-ai-in-healthcare",
    language: "en"
  },
  {
    id: "2",
    title: "طرق جديدة لتحسين الإنتاجية في العمل",
    titleAr: "طرق جديدة لتحسين الإنتاجية في العمل",
    category: "تطوير الذات",
    categoryAr: "Self Development",
    description: "اكتشف أحدث الاستراتيجيات لتعزيز إنتاجيتك وتحقيق التوازن بين العمل والحياة.",
    descriptionAr: "Discover the latest strategies to enhance your productivity and achieve work-life balance.",
    image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
    author: {
      id: "a2",
      name: "أحمد محمود",
      nameAr: "Ahmed Mahmoud",
      role: "خبير تطوير الأعمال",
      roleAr: "Business Development Expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
    },
    href: "/articles/productivity-tips",
    language: "ar"
  },
  {
    id: "3",
    title: "Climate Change: Urgent Actions Needed Now",
    titleAr: "تغير المناخ: إجراءات عاجلة مطلوبة الآن",
    category: "Environment",
    categoryAr: "بيئة",
    description: "Recent studies show alarming trends in global warming and what we can do to help.",
    descriptionAr: "تظهر الدراسات الحديثة اتجاهات مقلقة في الاحتباس الحراري وما يمكننا فعله للمساعدة.",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51",
    author: {
      id: "a3",
      name: "Emma Green",
      nameAr: "إيما جرين",
      role: "Environmental Scientist",
      roleAr: "عالمة بيئية",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    },
    href: "/articles/climate-change-actions",
    language: "en"
  },
  {
    id: "4",
    title: "أسرار المطبخ الإيطالي الأصيل",
    titleAr: "أسرار المطبخ الإيطالي الأصيل",
    category: "طعام",
    categoryAr: "Food",
    description: "تعلم كيفية تحضير أشهى الأطباق الإيطالية في منزلك مع نصائح من طهاة محترفين.",
    descriptionAr: "Learn how to prepare the most delicious Italian dishes at home with tips from professional chefs.",
    image: "https://images.unsplash.com/photo-1498579150354-977475b7ea0b",
    author: {
      id: "a4",
      name: "ماركو روسي",
      nameAr: "Marco Rossi",
      role: "شيف محترف",
      roleAr: "Professional Chef",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
    },
    href: "/articles/italian-cooking-secrets",
    language: "ar"
  },
  {
    id: "5",
    title: "The Rise of Remote Work in Tech Industry",
    titleAr: "صعود العمل عن بعد في صناعة التكنولوجيا",
    category: "Business",
    categoryAr: "أعمال",
    description: "How companies are adapting to permanent remote work structures and the impact on productivity.",
    descriptionAr: "كيف تتكيف الشركات مع هياكل العمل الدائم عن بعد وتأثير ذلك على الإنتاجية.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
    author: {
      id: "a5",
      name: "Michael Chen",
      nameAr: "مايكل تشين",
      role: "Tech Industry Analyst",
      roleAr: "محلل صناعة التكنولوجيا",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    href: "/articles/remote-work-trends",
    language: "en"
  },
  {
    id: "6",
    title: "دليلك الشامل لبدء مشروع تجاري ناجح",
    titleAr: "دليلك الشامل لبدء مشروع تجاري ناجح",
    category: "ريادة أعمال",
    categoryAr: "Entrepreneurship",
    description: "خطوات عملية لتحويل فكرتك إلى مشروع ناجح مع تجارب واقعية لرواد أعمال.",
    descriptionAr: "Practical steps to turn your idea into a successful project with real experiences from entrepreneurs.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    author: {
      id: "a6",
      name: "ليلى عبدالله",
      nameAr: "Layla Abdullah",
      role: "مستشارة أعمال",
      roleAr: "Business Consultant",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f"
    },
    href: "/articles/startup-guide",
    language: "ar"
  }
];
export function ArticlesSection() {
  return (
    <section className="bg-muted text-center py-20 px-4 md:px-20">
      <h2 className="text-4xl font-bold text-primary mb-10">اقرا من مجلتنا</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {mockArticles.map((article) => (
          <ArticleCard
            key={article.id}
            image={article.image}
            category={article.category}
            title={article.title}
            description={article.description}
            id={''} titleAr={article.titleAr} categoryAr={article.categoryAr} descriptionAr={article.descriptionAr}
            author={article.author} language={'en'}            // authorName={article.author.name}
          // authorRole={article.author.role}
          />
        ))}
      </motion.div>
      <Button className="bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-6 text-base">
        جميع المدونات
      </Button>
    </section>
  )
}
