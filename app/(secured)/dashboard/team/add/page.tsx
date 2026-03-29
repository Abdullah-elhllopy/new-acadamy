'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateTeamMember } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Form, FormField } from '@/components/forms'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { teamMemberSchema, type TeamMemberFormData } from '@/lib/validations'
import Link from 'next/link'

export default function AddTeamMemberPage() {
  const router = useRouter()
  const createTeamMember = useCreateTeamMember()

  const methods = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: '',
      job: '',
      linkedin: '',
      facebook: '',
      twitter: '',
    },
  })

  const onSubmit = async (data: TeamMemberFormData) => {
    const formData = new FormData()
    formData.append('Name', data.name)
    formData.append('Job', data.job)
    if (data.linkedin) formData.append('Linkedin', data.linkedin)
    if (data.facebook) formData.append('Facebook', data.facebook)
    if (data.twitter) formData.append('Twitter', data.twitter)
    if (data.image?.[0]) formData.append('Imagefile', data.image[0])

    await createTeamMember.mutateAsync(formData)
    router.push('/dashboard/team')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Team', href: '/dashboard/team' },
          { label: 'Add Member', href: '/dashboard/team/add' },
        ]}
        title="Add Team Member"
      >
        <BackButton href="/dashboard/team" text="Back to Team" />
      </DashboardHero>

      <ContentLayout>
        <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Member Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField<TeamMemberFormData>
                    name="name"
                    label="Full Name"
                    placeholder="Enter member name"
                    required
                  />
                  <FormField<TeamMemberFormData>
                    name="job"
                    label="Job Title"
                    placeholder="e.g., Software Engineer"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField<TeamMemberFormData>
                  name="linkedin"
                  label="LinkedIn"
                  placeholder="https://linkedin.com/in/username"
                />
                <FormField<TeamMemberFormData>
                  name="facebook"
                  label="Facebook"
                  placeholder="https://facebook.com/username"
                />
                <FormField<TeamMemberFormData>
                  name="twitter"
                  label="Twitter"
                  placeholder="https://twitter.com/username"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Photo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="image">Member Photo</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    {...methods.register('image')}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/team">Cancel</Link>
              </Button>
              <Button type="submit" disabled={createTeamMember.isPending}>
                {createTeamMember.isPending ? 'Saving...' : 'Add Member'}
              </Button>
            </div>
          </div>
        </Form>
      </ContentLayout>
    </>
  )
}
