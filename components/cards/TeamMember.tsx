import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import { API_BASE_URL } from '@/services/api/config'
import { Trainer } from '@/services/api'


const TeamMember = ({ trainer }: { trainer: Trainer }) => {
  const id = trainer.instructorid
  const name = trainer.name || ''
  const job = trainer.job || ''
  const image = trainer.image || ''
  const facebook = trainer.facbook || '#'
  const linkedin = trainer.linkedin || '#'
  const twitter = trainer.twitter || '#'

  return (
    <Card key={id} className="pt-0 pb-4 rounded-t-[15px] border-0 ">
      <div className="relative shadow-none h-60 bg-muted">
        <Image
          src={image ? `${API_BASE_URL}${image}` : 'https://plus.unsplash.com/premium_photo-1689568158814-3b8e9c1a9618?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D'}
          alt={name}
          fill
          className="object-contain w-full h-full rounded-t-[15px]"
        />
      </div>
      <CardContent>
        <h3 className="my-0 mb-2 font-sans font-bold text-primary">
          <Link href={`/trainers/${id}`} className="text-xl no-underline hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-base mb-5 text-hero-bg font-sans">{job}</p>
        <div className="flex items-center gap-4">
          {(
            <Link
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-hero-bg hover:text-primary no-underline"
            >
              <Facebook />
            </Link>
          )}
          {(
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-hero-bg hover:text-primary no-underline"
            >
              <Linkedin />
            </Link>
          )}
          {(
            <Link
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-hero-bg hover:text-primary no-underline"
            >
              <Twitter />
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default TeamMember