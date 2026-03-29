import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default: 'bg-primary text-white hover:bg-secondary shadow-sm',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 shadow-sm',
        outline:
          'border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white shadow-sm',
        secondary:
          'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
        ghost:
          'hover:bg-muted hover:text-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-lg px-4',
        lg: 'h-12 rounded-lg px-8 text-base',
        icon: 'size-11',
        'icon-sm': 'size-9',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn('cursor-pointer', buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
function BackButton({
  href,
  text = "Back",
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean,
    href: string;
    text?: string;
  }) {


  return (
    <Button variant="outline"  asChild {...props}>
      <Link href={href}>
        <ArrowLeft className=" rotate-arrow h-4 w-4" />
        {text}
      </Link>
    </Button>
  )
}
export { Button, buttonVariants ,BackButton }
