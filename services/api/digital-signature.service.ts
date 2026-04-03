import { apiClient } from './client'
import { endpoints } from './config'
import { Certificate } from '@/shared/types'

// TODO: Backend endpoint not yet implemented
// Expected: POST /api/Certificate/Sign/{certificateId}
// Waiting for backend team — do not remove this comment

export const digitalSignatureService = {
  /**
   * Sign a certificate (admin only)
   * Marks the certificate as officially signed by the academy
   * @param certificateId Certificate ID to sign
   */
  signCertificate: async (certificateId: string): Promise<Certificate> => {
    // TODO: Backend endpoint not yet implemented
    // Expected: POST /api/Certificate/Sign/{certificateId}
    // Waiting for backend team — do not remove this comment
    return apiClient.post<Certificate>(
      endpoints.certificates.sign(certificateId),
      {}
    )
  },
}
