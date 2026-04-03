import QRCode from 'qrcode'

export interface QRCodeOptions {
  width?: number
  margin?: number
  color?: {
    dark?: string
    light?: string
  }
}

export async function generateQRCode(
  data: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const defaultOptions = {
    width: 200,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    ...options,
  }

  return await QRCode.toDataURL(data, defaultOptions)
}

export function generateCertificateVerificationUrl(
  certificateId: string,
  baseUrl: string = process.env.NEXT_PUBLIC_APP_URL || 'https://academy.com'
): string {
  return `${baseUrl}/verify-certificate/${certificateId}`
}

export async function generateCertificateQRCode(
  certificateId: string,
  options?: QRCodeOptions
): Promise<string> {
  const verificationUrl = generateCertificateVerificationUrl(certificateId)
  return await generateQRCode(verificationUrl, options)
}
