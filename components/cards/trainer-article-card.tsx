import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { TrainerArticle } from '@/shared/types'
import Link from 'next/link'

const TrainerArticleCard = ({ article, className }: { article: TrainerArticle; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            <Card key={article.id} className="hover:shadow-lg  overflow-hidden  gap-4  duration-300 cursor-pointer group py-0 pb-3 transition-shadow">
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
                        <Link href={`/articles/${article.id}`}>
                            قراءة المزيد

                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    )
}

export default TrainerArticleCard