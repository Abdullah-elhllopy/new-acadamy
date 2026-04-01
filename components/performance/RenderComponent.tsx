import React from 'react'
import { useInView } from 'react-intersection-observer';
import { Skeleton } from '../ui/skeleton';

const RenderComponent = ({ children }: { children: React.ReactNode }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });
    return <div ref={ref}>

        {inView ? children : <Skeleton />}
    </div>
}

export default RenderComponent