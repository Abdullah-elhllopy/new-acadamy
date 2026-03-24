// hooks/use-booking.ts
'use client'

import { useState, useCallback } from 'react'
// import { useMutation } from '@tanstack/react-query'
import { BookingFormData, BookingCourse, CourseSession } from '@/types/booking'
import { DUMMY_BOOKING_COURSES } from '@/data/booking-data'

interface UseBookingReturn {
    course: BookingCourse | null
    selectedSession: CourseSession | null
    step: number
    setStep: (step: number) => void
    selectSession: (session: CourseSession) => void
    calculatePrice: () => {
        subtotal: number
        discount: number
        tax: number
        total: number
    }
}

const simulateDelay = (ms: number = 400) =>
    new Promise(resolve => setTimeout(resolve, ms))

export function useBooking(courseId: string): UseBookingReturn {
    const [step, setStep] = useState(1)
    const [selectedSession, setSelectedSession] = useState<CourseSession | null>(null)

    const course = DUMMY_BOOKING_COURSES[courseId] || null

    const selectSession = useCallback((session: CourseSession) => {
        setSelectedSession(session)
        setStep(2)
    }, [])

    const calculatePrice = useCallback((discountCode?: string) => {
        if (!selectedSession) return { subtotal: 0, discount: 0, tax: 0, total: 0 }

        const subtotal = selectedSession.price
        let discount = 0

        // Apply discount code logic
        if (discountCode === 'EARLY10') {
            discount = subtotal * 0.1
        } else if (discountCode === 'GROUP20') {
            discount = subtotal * 0.2
        }

        const taxableAmount = subtotal - discount
        const tax = taxableAmount * (course?.taxRate || 0.14)
        const total = taxableAmount + tax

        return {
            subtotal,
            discount,
            tax,
            total
        }
    }, [selectedSession, course])

    return {
        course,
        selectedSession,
        step,
        setStep,
        selectSession,
        calculatePrice
    }
}

// Submission hook
async function submitBooking(data: BookingFormData): Promise<{ bookingId: string; status: string }> {
    await simulateDelay(2000)

    // Simulate API call
    console.log('Submitting booking:', data)

    return {
        bookingId: 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
        status: data.paymentMethod === 'online' ? 'pending_payment' : 'pending_review'
    }
}

export function useSubmitBooking() {
    // return useMutation({
    //     mutationFn: submitBooking
    // })
}