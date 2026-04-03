'use client'

import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'
import { CertificateData } from '@/shared/types'
import { format } from 'date-fns'

// Register Arabic fonts
Font.register({
  family: 'Almarai',
  fonts: [
    { src: '/fonts/Almarai-Regular.ttf', fontWeight: 'normal' },
    { src: '/fonts/Almarai-Bold.ttf', fontWeight: 'bold' },
  ],
})

// Define styles using @react-pdf/renderer StyleSheet API
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  container: {
    border: '3px solid #1e40af',
    borderRadius: 8,
    padding: 30,
    height: '100%',
    position: 'relative',
  },
  decorativeBorder: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    border: '1px solid #93c5fd',
    borderRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: '2px solid #e5e7eb',
  },
  logo: {
    width: 80,
    height: 80,
  },
  headerText: {
    textAlign: 'center',
    flex: 1,
  },
  academyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
  },
  academyNameAr: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    fontFamily: 'Almarai',
  },
  certificateTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  certificateTitleAr: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Almarai',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  subtitleAr: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Almarai',
  },
  mainContent: {
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  awardedTo: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 5,
    borderBottom: '2px solid #1e40af',
    paddingBottom: 10,
  },
  userNameAr: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Almarai',
  },
  completionText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 1.6,
  },
  completionTextAr: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Almarai',
    lineHeight: 1.6,
  },
  courseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginVertical: 15,
  },
  courseNameAr: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
    marginVertical: 10,
    fontFamily: 'Almarai',
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  dateBox: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  dateLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
  },
  dateLabelAr: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
    fontFamily: 'Almarai',
  },
  dateValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  signaturesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    paddingTop: 20,
    borderTop: '1px solid #e5e7eb',
  },
  signatureBox: {
    alignItems: 'center',
    width: '40%',
  },
  signatureImage: {
    width: 100,
    height: 40,
    marginBottom: 10,
  },
  signatureLine: {
    width: '100%',
    borderTop: '1px solid #1f2937',
    marginBottom: 5,
  },
  signatureName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
  },
  signatureNameAr: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: 'Almarai',
    marginTop: 2,
  },
  signatureTitle: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 3,
  },
  signatureTitleAr: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'center',
    fontFamily: 'Almarai',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTop: '1px solid #e5e7eb',
  },
  certificateNumber: {
    fontSize: 9,
    color: '#6b7280',
  },
  qrCode: {
    width: 60,
    height: 60,
  },
  verificationText: {
    fontSize: 8,
    color: '#6b7280',
    textAlign: 'right',
  },
})

interface CertificateTemplateProps {
  data: CertificateData
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({ data }) => {
  const formattedIssueDate = format(new Date(data.issueDate), 'MMMM dd, yyyy')
  const formattedCompletionDate = format(new Date(data.completionDate), 'MMMM dd, yyyy')

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.decorativeBorder} />

          {/* Header with Logo */}
          <View style={styles.header}>
            {data.academyLogo && (
              <Image src={data.academyLogo} style={styles.logo} />
            )}
            <View style={styles.headerText}>
              <Text style={styles.academyName}>ID Academy</Text>
              {/* <Text style={styles.academyNameAr}>أكاديمية آي دي</Text> */}
            </View>
            {data.academyLogo && (
              <Image src={data.academyLogo} style={styles.logo} />
            )}
          </View>

          {/* Certificate Title */}
          {/* <Text style={styles.certificateTitle}>Certificate of Completion</Text> */}
          <Text style={styles.certificateTitleAr}>شهادة إتمام</Text>

          {/* <Text style={styles.subtitle}>This is to certify that</Text> */}
          <Text style={styles.subtitleAr}>نشهد بأن</Text>

          {/* Main Content */}
          <View style={styles.mainContent}>
            {/* User Name */}
            {/* <Text style={styles.userName}>{data.userName}</Text> */}
            <Text style={styles.userNameAr}>{data.userNameAr}</Text>

            {/* Completion Text */}
            {/* <Text style={styles.completionText}>
              has successfully completed the training program
            </Text> */}
            <Text style={styles.completionTextAr}>
              قد أتم بنجاح البرنامج التدريبي
            </Text>

            {/* Course Name */}
            {/* <Text style={styles.courseName}>{data.courseName}</Text> */}
            <Text style={styles.courseNameAr}>{data.courseNameAr}</Text>

            {/* Dates */}
            <View style={styles.dateSection}>
              <View style={styles.dateBox}>
                {/* <Text style={styles.dateLabel}>Completion Date</Text> */}
                <Text style={styles.dateLabelAr}>تاريخ الإتمام</Text>
                <Text style={styles.dateValue}>{formattedCompletionDate}</Text>
              </View>
              <View style={styles.dateBox}>
                {/* <Text style={styles.dateLabel}>Issue Date</Text> */}
                <Text style={styles.dateLabelAr}>تاريخ الإصدار</Text>
                <Text style={styles.dateValue}>{formattedIssueDate}</Text>
              </View>
            </View>
          </View>

          {/* Signatures */}
          <View style={styles.signaturesSection}>
            {/* Trainer Signature */}
            <View style={styles.signatureBox}>
              {data.trainerSignature && (
                <Image src={data.trainerSignature} style={styles.signatureImage} />
              )}
              <View style={styles.signatureLine} />
              {/* <Text style={styles.signatureName}>{data.trainerName}</Text> */}
              <Text style={styles.signatureNameAr}>{data.trainerNameAr}</Text>
              {/* <Text style={styles.signatureTitle}>Course Trainer</Text> */}
              <Text style={styles.signatureTitleAr}>المدرب</Text>
            </View>

            {/* Director Signature */}
            <View style={styles.signatureBox}>
              {data.directorSignature && (
                <Image src={data.directorSignature} style={styles.signatureImage} />
              )}
              <View style={styles.signatureLine} />
              {/* <Text style={styles.signatureName}>Academy Director</Text> */}
              <Text style={styles.signatureNameAr}>مدير الأكاديمية</Text>
              <Text style={styles.signatureTitle}>ID Academy</Text>
            </View>
          </View>

          {/* Footer with Certificate Number and QR Code */}
          <View style={styles.footer}>
            <Text style={styles.certificateNumber}>
              Certificate No: {data.certificateNumber}
            </Text>
            {data.qrCodeData && (
              <View>
                <Image src={data.qrCodeData} style={styles.qrCode} />
                <Text style={styles.verificationText}>Scan to verify</Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}