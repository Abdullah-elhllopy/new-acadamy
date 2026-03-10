import React from 'react'
import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
interface Instructor {
    instructorid: number
    name: string
    job: string
    image: string
    facbook: string  // Note: There's a typo in "facbook" (should be "facebook")
    linkedin: string
    twitter: string
}
const TeamMember = ({ trainer }: { trainer: Instructor }) => {
    return (
        <Card key={trainer.instructorid} className=" py-0 rounded-t-[15px] border-0 shadow-none">
            <div className="relative  shadow-sm    h-52 bg-muted">
                <Image src={trainer.image} alt={trainer.name} fill className="object-cover rounded-t-[15px]" />
            </div>
            <CardContent>
                <h3 className="my-1 mb-5 font-sans font-bold text-primary">
                    <Link href={`/trainers/${trainer.instructorid}`} className="text-xl no-underline hover:underline">
                        {trainer.name}
                    </Link>
                </h3>
                <p className="text-base mb-5 text-hero-bg font-sans">{trainer.job}</p>
                <div className='flex items-center gap-4'>
                    <Link href={trainer.facbook} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                        <Facebook />
                    </Link>
                    <Link href={trainer.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline ">
                        <Linkedin />
                    </Link>
                    <Link href={trainer.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl text-hero-bg hover:text-primary no-underline">
                        <Twitter />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default TeamMember