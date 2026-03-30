'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateSlider } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { sliderSchema, type SliderFormData } from '@/lib/validations'
import Link from 'next/link'

export default function AddSliderPage() {
  const router = useRouter()
  const createSlider = useCreateSlider()
  const form = useForm<SliderFormData>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      title: '',
      description: '',
      // link: '',
      ImageFile: null,
    },
  })

  const onSubmit = async (data: SliderFormData) => {
    const formData = new FormData()
    
    formData.append('Title', data.title)
    if (data.description) formData.append('Description', data.description)
    // if (data.link) formData.append('SliderLink', data.link)
    // formData.append('IsActive', data.isActive ? 'true' : 'false')
    if (data.ImageFile?.[0]) formData.append('ImageFile', data.ImageFile[0])

    await createSlider.mutateAsync(formData)
    router.push('/dashboard/sliders')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sliders', href: '/dashboard/sliders' },
          { label: 'Add Slider', href: '/dashboard/sliders/add' },
        ]}
        title="Add New Slider"
      >
        <BackButton href="/dashboard/sliders" text="Back to Sliders" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter slider title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter slider description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="sliderLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter slider link" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}

                <FormField
                  control={form.control}
                  name="ImageFile"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="mt-0!">Active</FormLabel>
                    </FormItem>
                  )}
                /> */}

                <div className="flex justify-start gap-4">
                  <Button type="button" variant="outline" asChild>
                    <Link href="/dashboard/sliders">Cancel</Link>
                  </Button>
                  <Button type="submit" disabled={createSlider.isPending}>
                    {createSlider.isPending ? 'Creating...' : 'Create Slider'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
