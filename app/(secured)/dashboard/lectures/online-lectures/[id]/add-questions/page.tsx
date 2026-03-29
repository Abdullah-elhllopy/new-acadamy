'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft } from 'lucide-react'
import { useCreateQuestion } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { Hero } from '@/components/sections/hero'
import { BackButton, Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'

const questionSchema = z.object({
  questionText: z.string().min(5, 'Question is required'),
  answer1: z.string().min(1, 'Answer 1 is required'),
  answer2: z.string().min(1, 'Answer 2 is required'),
  answer3: z.string().min(1, 'Answer 3 is required'),
  answer4: z.string().min(1, 'Answer 4 is required'),
  correctAnswer: z.string().min(1, 'Please select the correct answer'),
})

type QuestionFormData = z.infer<typeof questionSchema>

export default function AddQuestionsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id: lectureId } = use(params)
  const createQuestion = useCreateQuestion()

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      questionText: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: '',
    },
  })

  const onSubmit = async (data: QuestionFormData) => {
    const formData = new FormData()
    formData.append('QuestionText', data.questionText)
    formData.append('Answer1', data.answer1)
    formData.append('Answer2', data.answer2)
    formData.append('Answer3', data.answer3)
    formData.append('Answer4', data.answer4)
    formData.append('CorrectAnswer', data.correctAnswer)
    formData.append('LectureId', lectureId)

    await createQuestion.mutateAsync(formData)
    form.reset()
  }

  return (
    <>
      <Hero
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Lectures', href: '/dashboard/lectures' },
          { label: 'Add Questions', href: `/dashboard/lectures/online-lectures/${lectureId}/add-questions` },
        ]}
        title="Add Quiz Questions"
      >
        <BackButton href={`/dashboard/lectures`} text="Back" />
      </Hero>

      <ContentLayout>
        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="questionText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="answer1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer 1</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter answer 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answer2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer 2</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter answer 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answer3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer 3</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter answer 3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="answer4"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Answer 4</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter answer 4" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select correct answer" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">Answer 1</SelectItem>
                          <SelectItem value="2">Answer 2</SelectItem>
                          <SelectItem value="3">Answer 3</SelectItem>
                          <SelectItem value="4">Answer 4</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-start gap-4">
                  <Button type="submit" disabled={createQuestion.isPending}>
                    {createQuestion.isPending ? 'Adding...' : 'Add Question'}
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
