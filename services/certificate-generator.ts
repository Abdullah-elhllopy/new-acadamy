import React from 'react'
import { pdf } from '@react-pdf/renderer'
import { CertificateTemplate } from '@/components/certificate/certificate-template'
import { CertificateData } from '@/shared/types'
import { generateCertificateQRCode } from '@/lib/qr-code'

/**
 * Generate a certificate PDF and return as a Blob
 * @param data Certificate data for PDF generation
 * @returns Promise<Blob> PDF blob ready for download
 */
export async function generateCertificatePDF(data: CertificateData): Promise<Blob> {
  try {
    // Generate QR code if not provided
    let certificateData = data
    if (!data.qrCodeData && data.certificateId) {
      const qrCodeData = await generateCertificateQRCode(data.certificateId)
      certificateData = { ...data, qrCodeData }
    }
    
    // Create PDF document
    const doc = React.createElement(CertificateTemplate, { data: certificateData })
    
    // Generate PDF blob
    const blob = await pdf(doc as any).toBlob()
    
    return blob
  } catch (error) {
    console.error('Error generating certificate PDF:', error)
    throw new Error('Failed to generate certificate PDF')
  }
}

/**
 * Generate and download certificate PDF
 * @param data Certificate data for PDF generation
 * @param filename Optional custom filename (defaults to certificate number)
 */
export async function downloadCertificatePDF(
  data: CertificateData,
  filename?: string
): Promise<void> {
  try {
    const blob = await generateCertificatePDF(data)
    
    // Create download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || `certificate-${data.certificateNumber}.pdf`
    
    // Trigger download
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error downloading certificate PDF:', error)
    throw new Error('Failed to download certificate PDF')
  }
}

/**
 * Generate certificate PDF and open in new tab
 * @param data Certificate data for PDF generation
 */
export async function previewCertificatePDF(data: CertificateData): Promise<void> {
  try {
    const blob = await generateCertificatePDF(data)
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    
    // Cleanup after a delay to ensure the PDF loads
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  } catch (error) {
    console.error('Error previewing certificate PDF:', error)
    throw new Error('Failed to preview certificate PDF')
  }
}
