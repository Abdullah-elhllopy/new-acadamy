import { Metadata } from 'next'
import CoursesListClient from './_components/courses-list-client'

export const metadata: Metadata = {
  title: 'Courses Management | Dashboard',
  description: 'Manage all training courses',
}

export default function CoursesPage() {
  return <CoursesListClient />
}
