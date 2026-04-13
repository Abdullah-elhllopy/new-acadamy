import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Award, Download, QrCode } from 'lucide-react'
import { Button } from '../ui/button'
import { Certificate } from '@/shared/types'
import { useLanguage } from '@/shared/hooks/useLanguage'

const CertificateCard = ({ cert, handleDownload ,handleViewQR }: { cert: Certificate, handleDownload: (cert: Certificate) => void, handleViewQR: (id: string) => void }) => {
    const { isArabic } = useLanguage()
    return (
        <Card key={cert.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    <div className="flex justify-center">
                        <div className="w-full h-48 bg-linear-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                            <Award className="w-20 h-20 text-primary" />
                        </div>
                    </div>
                    <div >
                        <h3 className="font-bold text-lg mb-2">
                            {isArabic ? cert.courseNameAr : cert.courseName}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-1">
                            {isArabic ? 'رقم الشهادة:' : 'Certificate No:'} {cert.certificateNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {isArabic ? 'تاريخ الإصدار:' : 'Issued:'}{' '}
                            {new Date(cert.issueDate).toLocaleDateString(
                                isArabic ? 'ar-SA' : 'en-US'
                            )}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDownload(cert)}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            {isArabic ? 'تحميل' : 'Download'}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleViewQR(cert.id)}
                        >
                            <QrCode className="w-4 h-4 mr-2" />
                            {isArabic ? 'QR' : 'QR'}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CertificateCard