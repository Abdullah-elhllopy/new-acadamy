import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { API_BASE_URL } from '@/services/api/config'

interface PartnerProps {
  name: string
  image?: string
  link?: string
}

const Partner = ({ name, image, link }: PartnerProps) => {
  const content = (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-8">
        <div className="flex items-center justify-center h-24">
          {image ? (
            <div className="relative w-full h-full">
              <Image
                src={`${API_BASE_URL}${image}`}
                alt={name}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{name.charAt(0)}</span>
              </div>
              <p className="font-semibold text-sm text-foreground">{name}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    )
  }

  return content
}

export default Partner