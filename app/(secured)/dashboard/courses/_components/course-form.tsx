'use client'

import { useFormContext, UseFormReturn } from 'react-hook-form'
import { CourseFormData } from '@/lib/validations'
import { Form, FormField, FormSelect, WhatWillLearn } from '@/components/forms'
import { FormCheckbox } from '@/components/forms/form-checkbox'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMainDepartments, useSubDepartmentsByMain } from '@/hooks/api/use-departments'
import { useTrainers } from '@/hooks/api/use-trainers'
import { useCourseTypes } from '@/hooks/api/use-courses'
import { MultiSelect } from '@/components/ui/multi-select'
import { MapPicker } from '@/components/forms/map-picker'
import Link from 'next/link'
import { API_BASE_URL } from '@/services/api'
import { useMemo, useState } from 'react'
import { ImageIcon, Video, FileText, X } from 'lucide-react'
import Image from 'next/image'

interface CourseFormProps {
  isLoading?: boolean
  isEdit?: boolean
  currentFiles?: {
    image?: string
    video?: string
    pdf?: string
  }
}

export function CourseForm({
  isLoading = false,
  isEdit = false,
  currentFiles = {}
}: CourseFormProps) {
  const {watch ,setValue ,formState ,register } =useFormContext()
  const mainDepId = watch('mainDebId')
  const instructorIDs = watch('instructorIDs') || []
  const wwwl = watch('wwwl') || []
  const wwwlAr = watch('wwwlAr') || []

  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [removedImage, setRemovedImage] = useState(false)
  const [removedVideo, setRemovedVideo] = useState(false)


  const { data: mainDepartments } = useMainDepartments()
  const { data: subDepartments } = useSubDepartmentsByMain(mainDepId || '')
  const { data: trainers } = useTrainers()
  const { data: courseTypes } = useCourseTypes()


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoPreview(url)
    }
  }

  const clearImage = () => {
    setImagePreview(null)
    setRemovedImage(true)
    const input = document.getElementById('image') as HTMLInputElement
    if (input) {
      input.value = ''
    }
    setValue('image', undefined)
  }

  const clearVideo = () => {
    setVideoPreview(null)
    setRemovedVideo(true)
    const input = document.getElementById('video') as HTMLInputElement
    if (input) {
      input.value = ''
    }
    setValue('video', undefined)
  }


  const trainersOptions = useMemo(() => {
    return trainers?.map(trainer => ({
      value: trainer.instructorid || '',
      label: trainer.name || '',
    })) || []
  }, [trainers])

  const mainDepsOptions = useMemo(() => {
    return mainDepartments?.map(dep => ({
      value: dep.departmentID || '',
      label: dep.name || '',
    })) || []
  }, [mainDepartments])

  const subDepsOptions = useMemo(() => {
    return subDepartments?.map(dep => ({
      value: dep.subDepartmentId || '',
      label: dep.name || '',
    })) || []
  }, [subDepartments])

  const courseTypeOptions = useMemo(() => {
    return courseTypes?.map(type => ({
      value: String(type.value),
      label: type.text,
    })) || []
  }, [courseTypes])
  return (
      <div className="space-y-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="courseName"
                label="Course Name (English)"
                placeholder="Enter course name"
                required
              />
              <FormField
                name="courseNameAr"
                label="Course Name (Arabic)"
                placeholder="أدخل اسم الدورة"
                required
              />
              <FormSelect
                name="courseType"
                label="Course Type"
                options={courseTypeOptions}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="courseDescription"
                label="Description (English)"
                type="textarea"
                placeholder="Enter course description"
                rows={4}
                required
              />
              <FormField
                name="courseDescriptionAr"
                label="Description (Arabic)"
                type="textarea"
                placeholder="أدخل وصف الدورة"
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="courseContent"
                label="Course Content (English)"
                type="textarea"
                placeholder="Enter detailed course content"
                rows={6}
              />
              <FormField
                name="courseContentAr"
                label="Course Content (Arabic)"
                type="textarea"
                placeholder="أدخل محتوى الدورة التفصيلي"
                rows={6}
              />
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Location */}
        <Card>
          <CardHeader>
            <CardTitle>Schedule & Location</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                name="courseStartDate"
                label="Start Date"
                type="date"
                required
              />
              <FormField
                name="numberOfWeeks"
                label="Number of Weeks"
                placeholder="0"
              />
              <FormField
                name="numberOfMonths"
                label="Number of Months"
                placeholder="0"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="place"
                label="Place (English)"
                placeholder="Enter location"
                required
              />
              <FormField
                name="placeAr"
                label="Place (Arabic)"
                placeholder="أدخل الموقع"
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="placeSub"
                label="Sub Location (English)"
                placeholder="Enter sub location"
              />
              <FormField
                name="placeSubAr"
                label="Sub Location (Arabic)"
                placeholder="أدخل الموقع الفرعي"
              />
            </div>

            <MapPicker
              latitude={watch('placeLocationLat')}
              longitude={watch('placeLocationLong')}
              onLocationChange={(lat, lng) => {
                setValue('placeLocationLat', lat)
                setValue('placeLocationLong', lng)
              }}
              error={formState.errors.placeLocationLat?.message || formState.errors.placeLocationLong?.message as any}
            />
          </CardContent>
        </Card>

        {/* Pricing & Duration */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Duration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                name="courseCost"
                label="Cost ($)"
                placeholder="0.00"
                required
              />
              <FormField
                name="courseNumberOfHours"
                label="Number of Hours"
                placeholder="0"
                required
              />
              <FormSelect
                name="language"
                label="Language"
                options={[{ value: 'English', label: 'English', labelAr: 'إنجليزي' },
                { value: 'Arabic', label: 'Arabic', labelAr: 'عربي' }]}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Departments & Trainers */}
        <Card>
          <CardHeader>
            <CardTitle>Departments & Trainers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                name="mainDebId"
                label="Main Department"
                options={mainDepsOptions}
                required
                onChange={(value: string) => {
                  setValue('mainDebId', value)
                  setValue('subDebId', '')
                }}
              />

              <FormSelect
                name="subDebId"
                label="Sub Department"
                options={subDepsOptions}
                required
                disabled={!mainDepId}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainers">Trainers *</Label>
              <MultiSelect
                options={trainersOptions}
                selected={instructorIDs}
                onChange={(selected) => setValue('instructorIDs', selected)}
                placeholder="Select trainers..."
                searchPlaceholder="Search trainers..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Status Flags */}
        <Card>
          <CardHeader>
            <CardTitle>Course Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <FormCheckbox name="now" label="Available Now" />
              <FormCheckbox name="soon" label="Coming Soon" />
              <FormCheckbox name="recommended" label="Recommended" />
              <FormCheckbox name="mostSelling" label="Best Seller" />
            </div>
          </CardContent>
        </Card>

        {/* What Will You Learn */}
        {/* <Card>
          <CardHeader>
            <CardTitle>What Will You Learn (English)</CardTitle>
          </CardHeader>
          <CardContent> */}
        <div className='flex md:flex-row flex-col  items-center w-full gap-3 flex-wrap'>
          <WhatWillLearn
            items={wwwl}
            onChange={(items) => setValue('wwwl', items)}
            type='(English)'
          />
          <WhatWillLearn
            items={wwwlAr}
            onChange={(items) => setValue('wwwlAr', items)}
            type='(Arabic)'
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{isEdit ? 'Update Media Files' : 'Media Files'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="image">Course Image</Label>
                {(imagePreview || (isEdit && currentFiles.image && !removedImage)) ? (
                  <div className="relative group">
                    <div
                      className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary transition-colors"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      <Image
                        src={imagePreview || `${API_BASE_URL}/${currentFiles.image}`}
                        alt="Course preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-white" />
                        <span className="text-white ml-2">Click to change</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearImage()
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById('image')?.click()}
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload image</p>
                  </div>
                )}
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  {...register('image', {
                    onChange: (e) => handleImageChange(e)
                  })}
                />
              </div>

              {/* Video Upload */}
              <div className="space-y-2">
                <Label htmlFor="video">Course Video</Label>
                {(videoPreview || (isEdit && currentFiles.video && !removedVideo)) ? (
                  <div className="relative group">
                    <div
                      className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 cursor-pointer hover:border-primary transition-colors bg-black"
                      onClick={() => document.getElementById('video')?.click()}
                    >
                      {videoPreview ? (
                        <video
                          src={videoPreview}
                          className="w-full h-full object-cover"
                          controls={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Video className="w-8 h-8 text-white" />
                        <span className="text-white ml-2">Click to change</span>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                      onClick={(e) => {
                        e.stopPropagation()
                        clearVideo()
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById('video')?.click()}
                  >
                    <Video className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload video</p>
                  </div>
                )}
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  className="hidden"
                  {...register('video', {
                    onChange: (e) => handleVideoChange(e)
                  })}
                />
              </div>

              {/* PDF Upload */}
              <div className="space-y-2">
                <Label htmlFor="pdf">Course PDF</Label>
                {isEdit && currentFiles.pdf ? (
                  <div className="relative group">
                    <div
                      className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                      onClick={() => document.getElementById('pdf')?.click()}
                    >
                      <FileText className="w-12 h-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 text-center px-2">Current PDF</p>
                      <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full h-48 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
                    onClick={() => document.getElementById('pdf')?.click()}
                  >
                    <FileText className="w-12 h-12 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload PDF</p>
                  </div>
                )}
                <Input
                  id="pdf"
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  {...register('pdf')}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-start gap-4">
          <Button type="button" variant="outline" asChild>
            <Link href="/dashboard/courses">Cancel</Link>
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (isEdit ? 'Updating...' : 'Creating...') : (isEdit ? 'Update Course' : 'Create Course')}
          </Button>
        </div>
      </div>
  )
}
