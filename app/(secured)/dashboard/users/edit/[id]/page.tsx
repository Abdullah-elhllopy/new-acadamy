'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UserService, User } from '@/services/api/user.service'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormField, FormSelect } from '@/components/forms'
import { DashboardHero } from '@/components/sections/hero'
import { ContentLayout } from '@/layout/page-layout'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const editUserSchema = z.object({
  userFullName: z.string().min(2, 'Name must be at least 2 characters'),
  userEmail: z.string().email('Invalid email address'),
  userPhone: z.string().optional(),
  type: z.string().optional(),
})

type EditUserFormData = z.infer<typeof editUserSchema>

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const methods = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      userFullName: '',
      userEmail: '',
      userPhone: '',
      type: 'Trainee',
    },
  })

  useEffect(() => {
    fetchUser()
  }, [params.id])

  const fetchUser = async () => {
    setIsLoading(true)
    try {
      const userData = await UserService.getById(params.id)
      setUser(userData)
      methods.reset({
        userFullName: userData.userFullName,
        userEmail: userData.userEmail,
        userPhone: userData.userPhone || '',
        type: userData.type || 'Trainee',
      })
    } catch (error) {
      console.error('Failed to fetch user:', error)
      toast.error('Failed to load user data')
      router.push('/dashboard/users')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: EditUserFormData) => {
    setIsSaving(true)
    try {
      await UserService.editUser({
        id: params.id,
        ...data,
      })
      toast.success('User updated successfully')
      router.push('/dashboard/users')
    } catch (error) {
      console.error('Failed to update user:', error)
      toast.error('Failed to update user')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <DashboardHero
        title="Edit User"
        description="Update user information"
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Users', href: '/dashboard/users' },
          { label: 'Edit User', href: `/dashboard/users/edit/${params.id}` },
        ]}
      />
      <ContentLayout>
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/dashboard/users">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Users
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>User Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Form
                methods={methods}
                onSubmit={methods.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  name="userFullName"
                  label="Full Name"
                  placeholder="Enter full name"
                  required
                />
                <FormField
                  name="userEmail"
                  label="Email"
                  type="email"
                  placeholder="Enter email address"
                  required
                />
                <FormField
                  name="userPhone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter phone number"
                />
                <FormSelect
                  name="type"
                  label="Role"
                  // type="select"
                  options={[
                    { value: 'Trainee', label: 'Trainee' },
                    { value: 'Corporate Manager', label: 'Corporate Manager' },
                    { value: 'Trainer Applicant', label: 'Trainer Applicant' },
                    { value: 'Admin', label: 'Admin' },
                  ]}
                />

                <div className="flex gap-4">
                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push('/dashboard/users')}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        )}
      </ContentLayout>
    </>
  )
}
