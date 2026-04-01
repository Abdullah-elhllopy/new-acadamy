import { Card, CardContent } from '../ui/card'
import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'
import { API_BASE_URL } from '@/services/api/config'

interface Instructor {
  instructorId?: string
  instructorid?: number
  instructorName?: string
  name?: string
  specialization?: string
  job?: string
  instructorImage?: string
  image?: string
  facebook?: string
  facbook?: string
  linkedin?: string
  twitter?: string
}

const TeamMember = ({ trainer }: { trainer: Instructor }) => {
  const id = trainer.instructorId || trainer.instructorid
  const name = trainer.instructorName || trainer.name || ''
  const job = trainer.specialization || trainer.job || ''
  const image = trainer.instructorImage || trainer.image || ''
  const facebook = trainer.facebook || trainer.facbook || '#'
  const linkedin = trainer.linkedin || '#'
  const twitter = trainer.twitter || '#'

  return (
    <Card key={id} className="pt-0 pb-4 rounded-t-[15px] border-0 shadow-none">
      <div className="relative shadow-none h-52 bg-muted">
        {image && (
          <Image
            src={`${API_BASE_URL}${image}`}
            alt={name}
            fill
            className="object-cover rounded-t-[15px]"
          />
        )}
      </div>
      <CardContent>
        <h3 className="my-1 mb-5 font-sans font-bold text-primary">
          <Link href={`/trainers/${id}`} className="text-xl no-underline hover:underline">
            {name}
          </Link>
        </h3>
        <p className="text-base mb-5 text-hero-bg font-sans">{job}</p>
        <div className="flex items-center gap-4">
          {facebook && facebook !== '#' && (
            <Link
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-hero-bg hover:text-primary no-underline"
            >
              <Facebook />
            </Link>
          )}
          {linkedin && linkedin !== '#' && (
            <Link
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-hero-bg hover:text-primary no-underline"
            >
              <Linkedin />
            </Link>
          )}
          {twitter && twitter !== '#' && (
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