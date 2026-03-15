import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export const Title = ({ title }: { title: string }) => {
    return (
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-sans",
            )}
        >
            {title}
        </motion.h1>
    )
}



export const Subtitle = ({ subtitle }: { subtitle: string }) => {
    return (
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
                "text-lg text-muted-foreground",
            )}
        >
            {subtitle}
        </motion.p>
    )
}
export const TitleContainer = ({ title, subtitle , children }: { title: string; subtitle?: string; children?: React.ReactNode }) => {
    return <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={"max-w-2xl flex flex-col gap-4"}
    >
        <Title title={title} />
        {subtitle && <Subtitle subtitle={subtitle} />}
        {children}
    </motion.div>
}
