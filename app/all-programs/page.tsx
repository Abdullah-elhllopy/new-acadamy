

import { Metadata } from 'next'
import AllProgramsClient from './allProgramsClient'
export const metadata: Metadata = {
    title: 'All Academy Id Courses',
    description: 'Manage all training courses',
}
export default function AllProgramsPage() {
    return (
        <AllProgramsClient />
    )
}