import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { certificateService } from '@/services/api'
import { toast } from 'sonner'
import { Certificate } from '@/shared/types'

export const CERTIFICATE_KEYS = {
  all: ['certificates'] as const,
  lists: () => [...CERTIFICATE_KEYS.all, 'list'] as const,
  list: (filters: string) => [...CERTIFICATE_KEYS.lists(), { filters }] as const,
  details: () => [...CERTIFICATE_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...CERTIFICATE_KEYS.details(), id] as const,
  userCertificates: (userId: string) => [...CERTIFICATE_KEYS.all, 'user', userId] as const,
}

/**
 * Get certificate by ID
 */
export function useCertificate(certificateId: string) {
  return useQuery({
    queryKey: CERTIFICATE_KEYS.detail(certificateId),
    queryFn: () => certificateService.getById(certificateId),
    enabled: !!certificateId,
  })
}

/**
 * Get all certificates for a user
 */
export function useUserCertificates(userId: string) {
  return useQuery({
    queryKey: CERTIFICATE_KEYS.userCertificates(userId),
    queryFn: () => certificateService.getUserCertificates(userId),
    enabled: !!userId,
  })
}

/**
 * Get all certificates (admin only)
 */
export function useCertificates() {
  return useQuery({
    queryKey: CERTIFICATE_KEYS.lists(),
    queryFn: () => certificateService.getAll(),
  })
}

/**
 * Generate a new certificate
 */
export function useGenerateCertificate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { userId: string; courseId: string }) =>
      certificateService.generate(data),
    onSuccess: (certificate, variables) => {
      queryClient.invalidateQueries({
        queryKey: CERTIFICATE_KEYS.userCertificates(variables.userId),
      })
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() })
      toast.success('Certificate generated successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to generate certificate')
    },
  })
}

/**
 * Verify certificate by certificate number
 */
export function useVerifyCertificate(certificateId: string) {
  return useQuery({
    queryKey: [...CERTIFICATE_KEYS.all, 'verify', certificateId],
    queryFn: () => certificateService.getById(certificateId),
    enabled: !!certificateId,
  })
}

export function useVerifyCertificateByNumber() {
  return useMutation({
    mutationFn: (certificateNumber: string) =>
      certificateService.verify(certificateNumber),
    onSuccess: (result) => {
      if (result.valid) {
        toast.success('Certificate is valid')
      } else {
        toast.error(result.message || 'Certificate is invalid')
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to verify certificate')
    },
  })
}

/**
 * Verify certificate by QR code
 */
export function useVerifyCertificateQR(qrCode: string) {
  return useQuery({
    queryKey: [...CERTIFICATE_KEYS.all, 'verify-qr', qrCode],
    queryFn: () => certificateService.verifyByQR(qrCode),
    enabled: !!qrCode,
  })
}

/**
 * Sign a certificate (admin only)
 */
export function useSignCertificate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (certificateId: string) => certificateService.sign(certificateId),
    onSuccess: (certificate) => {
      queryClient.invalidateQueries({
        queryKey: CERTIFICATE_KEYS.detail(certificate.id),
      })
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() })
      toast.success('Certificate signed successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to sign certificate')
    },
  })
}

/**
 * Revoke a certificate (admin only)
 */
export function useRevokeCertificate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (certificateId: string) => certificateService.revoke(certificateId),
    onSuccess: (_, certificateId) => {
      queryClient.invalidateQueries({
        queryKey: CERTIFICATE_KEYS.detail(certificateId),
      })
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() })
      toast.success('Certificate revoked successfully')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to revoke certificate')
    },
  })
}
