'use client'

import Link from 'next/link'
import { Pencil, Plus } from 'lucide-react'
import { useAboutUs } from '@/hooks/api'
import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DataStateHandler } from '@/components/shared/data-state-handler'

const Row = ({ label, value }: { label: string; value?: string | null }) => (
  <tr className="border-b last:border-0">
    <th className="py-3 pr-4 text-right font-medium text-muted-foreground w-40">{label}</th>
    <td className="py-3">{value || '-'}</td>
  </tr>
)

export default function AboutUsPage() {
  const { data: company, isLoading, error, refetch } = useAboutUs()

  const content = (
    <Card>
      <CardContent className="pt-6">
        <table className="w-full text-sm">
          <tbody>
            <Row label="Company Name" value={company?.name} />
            <Row label="Email" value={company?.email} />
            <Row label="Phone" value={company?.phone} />
            <Row label="About" value={company?.aboutUs} />
            <Row label="Address" value={company?.address} />
            <Row label="Working Hours" value={company?.workingHours} />
            {/* <Row label="Working From" value={company?.workingFrom?.toString()} /> */}
            {/* <Row label="Working To" value={company?.workingTo?.toString()} /> */}
            {/* <Row label="Website Link" value={company?.link} /> */}
            <Row label="Vision" value={company?.ourVision} />
            <Row label="Message" value={company?.ourMessage} />
            <Row label="Facebook" value={company?.facebook} />
            <Row label="LinkedIn" value={company?.linkedin} />
            <Row label="Twitter" value={company?.twitter} />
            <Row label="Instagram" value={company?.instgram} />
            {company?.image && (
              <tr className="border-b">
                <th className="py-3 pr-4 text-right font-medium text-muted-foreground w-40">Logo</th>
                <td className="py-3">
                  <img src={company.image} alt="Company Logo" className="h-12 object-contain" />
                </td>
              </tr>
            )}
            {company?.pdf && (
              <tr>
                <th className="py-3 pr-4 text-right font-medium text-muted-foreground w-40">Profile PDF</th>
                <td className="py-3">
                  <a href={company.pdf} target="_blank" rel="noreferrer" className="text-primary underline">
                    Download
                  </a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )

  return (
    <>
      <DashboardHero
        title="About Us"
      >
        <div className='flex gap-2 items-center'>
          {isLoading ? null : company ? <Button variant="outline" asChild>
            <Link href="/dashboard/about-us/edit">
              <Pencil className=" h-4 w-4" />
              Edit
            </Link>
          </Button> :
            <Button asChild>
              <Link href="/dashboard/about-us/add">
                <Plus className="h-4 w-4" />
                Add Info
              </Link>
            </Button>}
        </div>
      </DashboardHero>

      <ContentLayout>
        <DataStateHandler
          isLoading={isLoading}
          error={error}
          loaderType="detail"
          onRetry={() => refetch()}
        >
          {content}
        </DataStateHandler>
      </ContentLayout>
    </>
  )
}
