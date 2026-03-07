'use client'

interface PageHeaderProps {
  title: string
  description: string
  isArabic?: boolean
}

export function PageHeader({ title, description, isArabic }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16 md:py-24 border-b border-border">
      <div className="container px-4 md:px-6">
        <div className={`max-w-2xl ${isArabic ? 'text-right' : ''}`}>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
