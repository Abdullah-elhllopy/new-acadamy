import { apiClient } from './client'
import { endpoints } from './config'
import { Certificate } from '@/shared/types'

// TODO: Backend endpoints not yet implemented
// Expected endpoints:
// - POST /api/Certificate/Generate
// - GET /api/Certificate/{certificateId}
// - POST /api/Certificate/Verify
// - GET /api/Certificate/User/{userId}
// - GET /api/Certificate/Verify-QR/{qrCode}
// - POST /api/Certificate/Sign/{certificateId}
// Waiting for backend team — do not remove this comment

// MOCK DATA - Remove when backend is ready
const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-001',
    userId: 'user-001',
    courseId: 'course-001',
    courseName: 'Advanced TypeScript Development',
    courseNameAr: 'تطوير تايب سكريبت المتقدم',
    userName: 'John Doe',
    userNameAr: 'جون دو',
    certificateNumber: 'CERT-2024-001',
    issueDate: new Date('2024-01-15'),
    completionDate: new Date('2024-01-10'),
    trainerName: 'Dr. Sarah Johnson',
    trainerNameAr: 'د. سارة جونسون',
    trainerSignature: '/signatures/trainer-001.png',
    directorSignature: '/signatures/director.png',
    qrCode: 'https://verify.academy.com/cert-001',
    verificationUrl: 'https://academy.com/verify/cert-001',
    status: 'valid',
    signed: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: 'cert-002',
    userId: 'user-001',
    courseId: 'course-002',
    courseName: 'React & Next.js Masterclass',
    courseNameAr: 'دورة ريأكت ونكست.جي.إس الشاملة',
    userName: 'John Doe',
    userNameAr: 'جون دو',
    certificateNumber: 'CERT-2024-002',
    issueDate: new Date('2024-02-20'),
    completionDate: new Date('2024-02-18'),
    trainerName: 'Prof. Michael Chen',
    trainerNameAr: 'أ. مايكل تشين',
    trainerSignature: '/signatures/trainer-002.png',
    directorSignature: '/signatures/director.png',
    qrCode: 'https://verify.academy.com/cert-002',
    verificationUrl: 'https://academy.com/verify/cert-002',
    status: 'valid',
    signed: true,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-02-20'),
  },
]

export const certificateService = {
  /**
   * Generate a new certificate for a completed course
   * @param data Certificate generation data
   */
  generate: async (data: {
    userId: string
    courseId: string
  }): Promise<Certificate> => {

    //return apiClient.post<Certificate>(endpoints.certificates.generate, data)

    // MOCK: Return simulated certificate
    await new Promise(resolve => setTimeout(resolve, 500))
    const certId = `cert-${Date.now()}`
    const newCert: Certificate = {
      id: certId,
      userId: data.userId,
      courseId: data.courseId,
      courseName: 'Mock Course Name',
      courseNameAr: 'اسم الدورة التجريبية',
      userName: 'Mock Student',
      userNameAr: 'طالب تجريبي',
      certificateNumber: `CERT-2024-${String(MOCK_CERTIFICATES.length + 1).padStart(3, '0')}`,
      issueDate: new Date(),
      completionDate: new Date(),
      trainerName: 'Mock Instructor',
      trainerNameAr: 'مدرب تجريبي',
      qrCode: `https://verify.academy.com/${certId}`,
      verificationUrl: `https://academy.com/verify/${certId}`,
      status: 'valid',
      signed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    MOCK_CERTIFICATES.push(newCert)
    return newCert
  },

  /**
   * Get certificate by ID
   * @param certificateId Certificate ID
   */
  getById: async (certificateId: string): Promise<Certificate> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: GET /api/Certificate/{certificateId}
    // Waiting for backend team — do not remove this comment
    // return apiClient.get<Certificate>(endpoints.certificates.getById(certificateId))

    // MOCK: Return certificate from mock data
    await new Promise(resolve => setTimeout(resolve, 300))
    const cert = MOCK_CERTIFICATES.find(c => c.id === certificateId)
    if (!cert) throw new Error('Certificate not found')
    return cert
  },

  /**
   * Get all certificates for a specific user
   * @param userId User ID
   */
  getUserCertificates: async (userId: string): Promise<Certificate[]> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: GET /api/Certificate/User/{userId}
    // Waiting for backend team — do not remove this comment
    // return apiClient.get<Certificate[]>(endpoints.certificates.getUserCertificates(userId))

    // MOCK: Return user certificates from mock data
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_CERTIFICATES.filter(c => c.userId === userId)
  },

  /**
   * Verify certificate by certificate number
   * @param certificateNumber Certificate number to verify
   */
  verify: async (certificateNumber: string): Promise<{
    valid: boolean
    certificate?: Certificate
    message: string
  }> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: POST /api/Certificate/Verify
    // Waiting for backend team — do not remove this comment
    //   return apiClient.post<{
    //   valid: boolean
    //   certificate?: Certificate
    //   message: string
    // }>(endpoints.certificates.verify, { certificateNumber })
    // MOCK: Verify certificate from mock data
    await new Promise(resolve => setTimeout(resolve, 400))
    const cert = MOCK_CERTIFICATES.find(c => c.certificateNumber === certificateNumber)
    if (cert) {
      return { valid: true, certificate: cert, message: 'Certificate is valid' }
    }
    return { valid: false, message: 'Certificate not found' }
  },

  /**
   * Verify certificate by QR code
   * @param qrCode QR code value
   */
  verifyByQR: async (qrCode: string): Promise<{
    valid: boolean
    certificate?: Certificate
    message: string
  }> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: GET /api/Certificate/Verify-QR/{qrCode}
    // Waiting for backend team — do not remove this comment
    // return apiClient.get<{
    //   valid: boolean
    //   certificate?: Certificate
    //   message: string
    // }>(endpoints.certificates.verifyByQR(qrCode))
    // MOCK: Verify by QR code from mock data
    await new Promise(resolve => setTimeout(resolve, 400))
    const cert = MOCK_CERTIFICATES.find(c => c.qrCode === qrCode)
    if (cert) {
      return { valid: true, certificate: cert, message: 'Certificate is valid' }
    }
    return { valid: false, message: 'Certificate not found' }
  },

  /**
   * Sign a certificate (admin only)
   * @param certificateId Certificate ID to sign
   */
  sign: async (certificateId: string): Promise<Certificate> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: POST /api/Certificate/Sign/{certificateId}
    // Waiting for backend team — do not remove this comment
    // return apiClient.post<Certificate>(endpoints.certificates.sign(certificateId), {})

    // MOCK: Sign certificate
    await new Promise(resolve => setTimeout(resolve, 500))
    const cert = MOCK_CERTIFICATES.find(c => c.id === certificateId)
    if (!cert) throw new Error('Certificate not found')
    cert.signed = true
    cert.trainerSignature = '/signatures/trainer-signature.png'
    cert.directorSignature = '/signatures/director-signature.png'
    cert.updatedAt = new Date()
    return cert
  },

  /**
   * Get all certificates (admin only)
   */
  getAll: async (): Promise<Certificate[]> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: GET /api/Certificate/All
    // Waiting for backend team — do not remove this comment
    //return apiClient.get<Certificate[]>(endpoints.certificates.getAll)

    // MOCK: Return all certificates
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_CERTIFICATES
  },

  /**
   * Revoke a certificate (admin only)
   * @param certificateId Certificate ID to revoke
   */
  revoke: async (certificateId: string): Promise<void> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: POST /api/Certificate/Revoke/{certificateId}
    // Waiting for backend team — do not remove this comment
    // await apiClient.post(endpoints.certificates.revoke(certificateId), {})
    // MOCK: Revoke certificate
    await new Promise(resolve => setTimeout(resolve, 400))
    const cert = MOCK_CERTIFICATES.find(c => c.id === certificateId)
    if (cert) {
      cert.status = 'revoked'
      cert.updatedAt = new Date()
    }
  },
}
