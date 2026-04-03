'use client'

import { ContentLayout } from '@/layout/page-layout'
import { DashboardHero } from '@/components/sections/hero'
// import { DataTable } from '@/components/ui/data-table'
// import { DataTableColumn } from '@/components/ui/data-table'
import { Certificate } from '@/shared/types'
import { useCertificates, useRevokeCertificate, useSignCertificate } from '@/hooks/api/use-certificates'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Eye, Ban, FileSignature, Loader2 } from 'lucide-react'
import { downloadCertificatePDF } from '@/services/certificate-generator'
import { CertificateData } from '@/shared/types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { DataTable, DataTableColumn } from '@/components/dashboard/data-table'

export default function CertificatesPage() {
  const router = useRouter()
  const { data: certificates, isLoading } = useCertificates()
  const revokeMutation = useRevokeCertificate()
  const signMutation = useSignCertificate()
  
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false)
  const [selectedCertId, setSelectedCertId] = useState<string | null>(null)

  const handleDownload = async (cert: Certificate) => {
    try {
      const certificateData: CertificateData = {
        certificateId: cert.id,
        certificateNumber: cert.certificateNumber,
        userName: cert.userName,
        userNameAr: cert.userNameAr,
        courseName: cert.courseName,
        courseNameAr: cert.courseNameAr,
        completionDate: cert.completionDate,
        issueDate: cert.issueDate,
        trainerName: cert.trainerName,
        trainerNameAr: cert.trainerNameAr,
        trainerSignature: cert.trainerSignature,
        directorSignature: cert.directorSignature,
      }

      await downloadCertificatePDF(certificateData)
      toast.success('Certificate downloaded')
    } catch (error) {
      toast.error('Failed to download certificate')
    }
  }

  const handleView = (certId: string) => {
    router.push(`/verify-certificate/${certId}`)
  }

  const handleSign = async (certId: string) => {
    await signMutation.mutateAsync(certId)
  }

  const handleRevokeClick = (certId: string) => {
    setSelectedCertId(certId)
    setRevokeDialogOpen(true)
  }

  const handleRevokeConfirm = async () => {
    if (selectedCertId) {
      await revokeMutation.mutateAsync(selectedCertId)
      setRevokeDialogOpen(false)
      setSelectedCertId(null)
    }
  }

  const columns: DataTableColumn<Certificate>[] = [
    {
      header: 'Certificate No',
      accessorKey: 'certificateNumber',
    },
    {
      header: 'Trainee',
      accessorKey: 'userName',
    },
    {
      header: 'Course',
      accessorKey: 'courseName',
    },
    {
      header: 'Issue Date',
      cell: ( row ) => new Date(row.issueDate).toLocaleDateString('en-US'),
    },
    {
      header: 'Status',
      cell: ( row ) => {
        const statusColors = {
          valid: 'bg-green-500',
          revoked: 'bg-red-500',
          expired: 'bg-gray-500',
        }
        return (
          <Badge className={statusColors[row.status]}>
            {row.status}
          </Badge>
        )
      },
    },
    {
      header: 'Signed',
      cell: ( row ) => (
        <Badge variant={row.signed ? 'default' : 'secondary'}>
          {row.signed ? 'Yes' : 'No'}
        </Badge>
      ),
    },
    {
      header: 'Actions',
      cell: ( row ) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleView(row.id)}
            title="View"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDownload(row)}
            title="Download"
          >
            <Download className="w-4 h-4" />
          </Button>
          {!row.signed && row.status === 'valid' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSign(row.id)}
              disabled={signMutation.isPending}
              title="Sign"
            >
              <FileSignature className="w-4 h-4" />
            </Button>
          )}
          {row.status === 'valid' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleRevokeClick(row.id)}
              disabled={revokeMutation.isPending}
              title="Revoke"
            >
              <Ban className="w-4 h-4 text-destructive" />
            </Button>
          )}
        </div>
      ),
    },
  ]

  return (
    <>
      <DashboardHero
        title="Certificates Management"
        description="Manage all issued certificates"
        breadcrumbItems={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Certificates', href: '/dashboard/certificates' },
        ]}
      />
      <ContentLayout>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={certificates || []}
          />
        )}
      </ContentLayout>

      <AlertDialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke Certificate</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to revoke this certificate? This action cannot be undone.
              The certificate will be marked as invalid.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleRevokeConfirm}>
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
