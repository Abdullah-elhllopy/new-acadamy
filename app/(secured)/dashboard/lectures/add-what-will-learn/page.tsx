'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {  Plus, Trash2 } from 'lucide-react'
import { useCourses, useAddWWWL } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

interface WhatWillLearnItem {
  id: string
  text: string
}

export default function AddWhatWillLearnPage() {
  const router = useRouter()
  const { data: courses, isLoading } = useCourses()
  const addWWWL = useAddWWWL()

  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [items, setItems] = useState<WhatWillLearnItem[]>([])
  const [currentItem, setCurrentItem] = useState('')

  const handleAddItem = () => {
    if (!currentItem.trim()) return
    
    const newItem: WhatWillLearnItem = {
      id: Math.random().toString(36).substr(2, 9),
      text: currentItem,
    }
    
    setItems([...items, newItem])
    setCurrentItem('')
  }

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSubmit = async () => {
    if (!selectedCourseId || items.length === 0) {
      return
    }

    for (const item of items) {
      await addWWWL.mutateAsync({
        wwwlcontent: item.text,
        courseid: selectedCourseId,
      })
    }

    router.push('/dashboard/courses')
  }

  return (
    <>
      <DashboardHero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'What Will You Learn', href: '/dashboard/lectures/add-what-will-learn' },
        ]}
        title="What Will You Learn"
      >
        <BackButton href="/dashboard/lectures" text="Back" />
      </DashboardHero>

      <ContentLayout>
        <Card>
          <CardHeader>
            <CardTitle>Manage Learning Outcomes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course">Select Course</Label>
              <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {
                    isLoading && (
                      <SelectItem value="" disabled>
                        Loading courses...
                      </SelectItem>
                    )
                  }
                  {courses?.allCoursesDetails?.map((course) => (
                    <SelectItem key={course.courseId} value={course.courseId}>
                      {course.courseName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Learning Outcomes</Label>
              
              {items.length > 0 && (
                <div className="space-y-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <span>{item.text}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <Input
                  placeholder="Enter what students will learn"
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddItem()
                    }
                  }}
                />
                <Button type="button" onClick={handleAddItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            <div className="flex justify-start gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard/lectures">Cancel</Link>
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!selectedCourseId || items.length === 0 || addWWWL.isPending}
              >
                {addWWWL.isPending ? 'Saving...' : 'Save Learning Outcomes'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </>
  )
}
