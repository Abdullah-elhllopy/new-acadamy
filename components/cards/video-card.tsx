import React from 'react'
import { Card, CardContent } from '../ui/card'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Play } from 'lucide-react'
import { TrainerVideo } from '@/shared/types'

const VideoCard = ({ video, className }: { video: TrainerVideo; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className={className}
        >
            <Card  className="hover:shadow-lg  overflow-hidden  gap-4  duration-300 cursor-pointer group py-0 pb-3 transition-shadow">
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
        </motion.div>
    )
}

export default VideoCard