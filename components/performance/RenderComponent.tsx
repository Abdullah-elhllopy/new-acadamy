import React from 'react'
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '../ui/skeleton';

const RenderComponent = ({ children }: { children: React.ReactNode }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return <div ref={ref} style={{ minHeight: inView ? 'auto' : '400px' }}>
        {inView ? children : (
            <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        )}
    </div>
}
export default RenderComponent