'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { VisaIcon, MastercardIcon, PayPalIcon } from '@/components/ui/svg-icon'

type PaymentMethod = "card" | "person" | "company" | "deferred" | "paypal"

const PaymentMethodOption = ({
  label,
  subtitle,
  value,
  selected,
  onSelect,
}: {
  label: string
  subtitle?: string
  value: PaymentMethod
  selected: PaymentMethod
  onSelect: (v: PaymentMethod) => void
}) => (
  <Label
    className="flex items-start py-2 cursor-pointer"
    onClick={() => onSelect(value)}
  >
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
        selected === value ? "border-secondary" : "border-border"
      }`}
    >
      {selected === value && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
    </div>
    <div className="flex flex-col items-start">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-foreground">{label}</span>
      </div>
      {subtitle && (
        <span className="text-xs text-muted-foreground mt-1">{subtitle}</span>
      )}
    </div>
  </Label>
)

const paymentSchema = z.object({
  employer: z.string().optional(),
  country: z.string().min(1, 'الدولة مطلوبة'),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  paymentMethod: z.string().optional()
})

type PaymentFormValues = z.infer<typeof paymentSchema>

export function PaymentForm() {
  const [seats, setSeats] = useState<"one" | "three">("one")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      employer: '',
      country: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      paymentMethod: 'credit-card'
    }
  })

  const onSubmit = (data: PaymentFormValues) => {
    console.log(data)
  }

  return (
    <div className="text-start">
      <h3 className="text-[28px] mb-10 font-sans font-bold text-primary">تفاصيل الفاتورة</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Seats */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">عدد المقاعد</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSeats("one")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  seats === "one"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                شخص واحد
              </button>
              <button
                type="button"
                onClick={() => setSeats("three")}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${
                  seats === "three"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3 أشخاص - خصم 30%
              </button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="employer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-primary">جهة العمل ( اختيارى )</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-primary">
                  الدولة <span className="text-destructive">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary">
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="eg">مصر</SelectItem>
                    <SelectItem value="sa">السعودية</SelectItem>
                    <SelectItem value="ae">الإمارات</SelectItem>
                    <SelectItem value="kw">الكويت</SelectItem>
                    <SelectItem value="jo">الأردن</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <h2 className="text-xl font-bold text-foreground mb-6">طريقة الدفع</h2>

          {/* Credit Card Option */}
          <Label
            className="flex items-start py-2 cursor-pointer"
            onClick={() => setPaymentMethod("card")}
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                paymentMethod === "card" ? "border-secondary" : "border-border"
              }`}
            >
              {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-foreground">البطاقة الائتمانية</span>
              <div className="flex items-center gap-1">
                <VisaIcon />
                <MastercardIcon />
              </div>
            </div>
          </Label>

          {/* Card Details */}
          {paymentMethod === "card" && (
            <div className="space-y-6 border-b pb-6 border-border-light">
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-primary">الاسم الكامل على البطاقة الائتمانية</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-primary">رقم البطاقة</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="xxxx xxxx xxxx xxxx"
                        className="h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-primary">تاريخ الانتهاء</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="mm/yy"
                          className="h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-sans text-primary">الرمز السري (CVV)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="xxx"
                          className="h-11 border-muted-foreground rounded-[5px] focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-primary hover:bg-muted text-primary"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Other payment methods */}
          <div className="mt-2">
            <PaymentMethodOption
              label="شخصي مباشر"
              subtitle="دفع في المكان الخاص بالأكاديمية عند حضور الكورس"
              value="person"
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <PaymentMethodOption
              label="تابع لشركة"
              subtitle="الشركة تدفع نيابة عن موظفيها"
              value="company"
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <PaymentMethodOption
              label="دفع مؤجل"
              subtitle="دفع في خلال 30 يوم من الاشتراك"
              value="deferred"
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
            <Label
              className="flex items-start py-2 cursor-pointer"
              onClick={() => setPaymentMethod("paypal")}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  paymentMethod === "paypal" ? "border-secondary" : "border-border"
                }`}
              >
                {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 rounded-full bg-secondary" />}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-foreground">باي بال</span>
                <PayPalIcon />
              </div>
            </Label>
          </div>

          {paymentMethod !== "card" && (
            <div className="pt-6 border-t border-border-light" />
          )}

          <Button
            type="submit"
            disabled={!form.formState.isValid}
            className="w-full h-14 bg-primary hover:bg-secondary border-primary rounded-[36px] disabled:bg-disabled disabled:border-disabled mt-5"
          >
            إتمام عملية الدفع
          </Button>
        </form>
      </Form>
    </div>
  )
}
