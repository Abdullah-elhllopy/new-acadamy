'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Facebook, Linkedin, Twitter, Play, FileText, Star } from 'lucide-react'
import { SimpleAvatar } from '@/components/shared/simple-avatar'
import { ProgramCard } from '@/components/cards/program-card'
import { mockPrograms } from '@/app/programs/page'
import { useTrainer } from '@/hooks/api'
import { useTrainerVideosByTrainerId } from '@/hooks/api/use-trainer-videos'
import { useTrainerArticlesByTrainerId } from '@/hooks/api/use-trainer-articles'
import { useTrainerReviewsByTrainerId } from '@/hooks/api/use-trainer-reviews'
import Loader from '@/components/shared/loader/loader'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrainerReviewForm } from '@/components/forms/trainer-review-form'

const MOCK_TRAINER = {
  id: 1,
  name: 'د. أحمد السعود',
  job: 'وظيفه او تخصص المدرب',
  image: '/placeholder-avatar.jpg',
  about: 'مدرب خبير بخبرة تزيد عن 15 عاماً في تطوير القيادة والإدارة التنظيمية. دكتوراه في إدارة الأعمال من جامعة هارفارد.',
  pdf: '/trainer-cv.pdf',
  facebook: 'https://facebook.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  courseDetails: mockPrograms
}

export default function TrainerProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { data, isLoading } = useTrainer(id)
  const { data: videos } = useTrainerVideosByTrainerId(id)
  const { data: articles } = useTrainerArticlesByTrainerId(id)
  const { data: reviews } = useTrainerReviewsByTrainerId(id)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  
  useEffect(() => {
    document.title = data?.name || 'ملف المدرب'
  }, [data?.name])
  
  if (isLoading) {
    return <Loader number={2} />
  }

  const publishedVideos = videos?.filter((v: { published: any }) => v.published) || []
  const publishedArticles = articles?.filter(a => a.published) || []
  const approvedReviews = reviews?.filter(r => r.approved) || []
  const avgRating = approvedReviews.length > 0
    ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length
    : 0

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="bg-muted px-4 sm:px-8 md:px-12 lg:px-20 xl:px-75 py-8 sm:py-12 md:py-16 "
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 text-start">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 bg-white sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none">
            <SimpleAvatar
              src={data?.image || MOCK_TRAINER.image}
              alt={data?.name || MOCK_TRAINER.name}
              className="w-20 h-20 sm:w-32 md:w-25 md:h-25 xl:h-40 xl:w-40 rounded-full mx-auto sm:mx-0"
            />

            <div className="flex flex-col items-center sm:items-start gap-3">
              <h4 className="text-primary font-sans font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                {data?.name}
              </h4>
              <p className="text-hero-bg font-sans text-sm sm:text-base md:text-lg text-center sm:text-start">
                {data?.job || MOCK_TRAINER.job}
              </p>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {'⭐'.repeat(Math.round(avgRating))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({avgRating.toFixed(1)}) - {approvedReviews.length} reviews
                  </span>
                </div>
              )}
              <div className='flex items-center gap-4'>
                <Link href={data?.facbook || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Facebook />
                </Link>
                <Link href={data?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                  <Linkedin />
                </Link>
                <Link href={data?.twitter || '#'} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline">
                  <Twitter />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <Link
              href={data?.pdf || MOCK_TRAINER.pdf}
              target="_blank"
              className="flex gap-2 items-center bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 no-underline text-primary hover:shadow-lg transition-shadow"
            >
              <span className="text-xs sm:text-sm font-sans">
                تحميل الملف الشخصى
              </span>
              <Download className="text-secondary w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="px-75 py-20 max-sm:px-2.5 max-sm:pt-20 max-sm:pb-0 sm:max-md:px-2.5 sm:max-md:pt-20 sm:max-md:pb-0 lg:max-xl:px-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h1 className="font-sans text-4xl mb-10 text-primary text-center max-sm:text-[28px] max-sm:mb-10 sm:max-md:text-[28px] sm:max-md:mb-10">
            عن المدرب
          </h1>
          <p className="text-xl text-start max-sm:text-base sm:max-md:text-base">
            {data?.about || MOCK_TRAINER.about}
          </p>
        </div>
      </motion.div>

      <motion.div
        className="px-75 pb-20 pt-0 max-sm:px-2.5 max-sm:py-10 sm:max-md:px-5 sm:max-md:py-10 md:max-lg:px-40 lg:max-xl:px-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="courses">دورات المدرب</TabsTrigger>
            <TabsTrigger value="videos">الفيديوهات ({publishedVideos.length})</TabsTrigger>
            <TabsTrigger value="articles">المقالات ({publishedArticles.length})</TabsTrigger>
            <TabsTrigger value="reviews">التقييمات ({approvedReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-10 sm:max-md:grid-cols-[50%_50%] sm:max-md:gap-5 md:max-lg:grid-cols-[50%_50%] md:max-lg:gap-5">
              {data?.courseDetails?.map((course) => (
                <ProgramCard
                  key={`courses_${course.courseId}`}
                  program={course}
                  language={'ar'}
                />
              ))}
            </section>
          </TabsContent>

          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedVideos.map((video : any) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video bg-muted">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.titleEn} className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Play className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{video.titleAr || video.titleEn}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {video.descriptionAr || video.descriptionEn}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{video.duration} min</span>
                      <span>{video.views} views</span>
                    </div>
                    <Button asChild className="w-full mt-3">
                      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
                        مشاهدة
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publishedArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  {article.coverImage && (
                    <div className="aspect-video bg-muted">
                      <img src={article.coverImage} alt={article.titleEn} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {article.category && (
                        <Badge variant="secondary">{article.category}</Badge>
                      )}
                      <span className="text-sm text-muted-foreground">{article.views} views</span>
                    </div>
                    <h3 className="font-bold text-xl mb-3">{article.titleAr || article.titleEn}</h3>
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {article.excerpt || article.contentAr?.substring(0, 150) + '...'}
                    </p>
                    <Button variant="outline" className="w-full">
                      قراءة المزيد
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold">تقييمات المتدربين</h3>
                  {avgRating > 0 && (
                    <p className="text-muted-foreground">
                      متوسط التقييم: {avgRating.toFixed(1)} من 5
                    </p>
                  )}
                </div>
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Star className="mr-2 h-4 w-4" />
                      أضف تقييمك
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>أضف تقييمك للمدرب</DialogTitle>
                    </DialogHeader>
                    <TrainerReviewForm
                      trainerId={id}
                      onSuccess={() => setIsReviewDialogOpen(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {approvedReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {review.userAvatar && (
                          <img src={review.userAvatar} alt={review.userName} className="h-12 w-12 rounded-full" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h4 className="font-semibold">{review.userName}</h4>
                              {review.courseName && (
                                <p className="text-sm text-muted-foreground">{review.courseName}</p>
                              )}
                            </div>
                            <div className="flex">
                              {'⭐'.repeat(review.rating)}
                            </div>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
