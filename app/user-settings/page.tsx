'use client'

import { useState } from 'react'
import { useLanguage } from '@/shared/hooks/useLanguage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/shared/page-header'
import { Form } from '@/components/shared/form'
import { FormField } from '@/components/shared/form-field'
import { User, Lock, Bell, CreditCard } from 'lucide-react'
import { toast } from 'sonner'
import { accountSettingsSchema, passwordChangeSchema, AccountSettingsData, PasswordChangeData } from '@/lib/validations'

export default function UserSettingsPage() {
  const { language } = useLanguage()
  const isArabic = language === 'ar'
  const [loading, setLoading] = useState(false)

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    courseUpdates: true,
    promotions: false
  })

  const handleAccountUpdate = async (data: AccountSettingsData) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم تحديث البيانات بنجاح' : 'Account updated successfully')
      setLoading(false)
    }, 1000)
  }

  const handlePasswordUpdate = async (data: PasswordChangeData) => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully')
      setLoading(false)
    }, 1000)
  }

  const handleNotificationsUpdate = async () => {
    setLoading(true)
    setTimeout(() => {
      toast.success(isArabic ? 'تم تحديث إعدادات الإشعارات' : 'Notification settings updated')
      setLoading(false)
    }, 1000)
  }

  return (
    <>
      <PageHeader
        title={isArabic ? 'الإعدادات' : 'Settings'}
        description={isArabic ? 'إدارة حسابك وتفضيلاتك' : 'Manage your account and preferences'}
        isArabic={isArabic}
      />

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="account" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'الحساب' : 'Account'}</span>
              </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'كلمة المرور' : 'Password'}</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'الإشعارات' : 'Notifications'}</span>
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">{isArabic ? 'الدفع' : 'Payment'}</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="account" className="mt-8">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'معلومات الحساب' : 'Account Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form 
                    schema={accountSettingsSchema} 
                    onSubmit={handleAccountUpdate}
                    defaultValues={{
                      fullName: 'Ahmed Al-Saud',
                      email: 'ahmed@example.com',
                      phone: '+966 50 123 4567',
                      country: 'Saudi Arabia'
                    }}
                    className="space-y-4"
                  >
                    {(methods) => (
                      <>
                        <FormField name="fullName" label={isArabic ? 'الاسم الكامل' : 'Full Name'} methods={methods} isArabic={isArabic} />
                        <FormField name="email" label={isArabic ? 'البريد الإلكتروني' : 'Email'} type="email" methods={methods} isArabic={isArabic} />
                        <FormField name="phone" label={isArabic ? 'رقم الهاتف' : 'Phone'} type="tel" methods={methods} isArabic={isArabic} />
                        <FormField name="country" label={isArabic ? 'الدولة' : 'Country'} methods={methods} isArabic={isArabic} />
                        <Button type="submit" disabled={loading}>
                          {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ التغييرات' : 'Save Changes')}
                        </Button>
                      </>
                    )}
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-8">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Form schema={passwordChangeSchema} onSubmit={handlePasswordUpdate} className="space-y-4">
                    {(methods) => (
                      <>
                        <FormField name="currentPassword" label={isArabic ? 'كلمة المرور الحالية' : 'Current Password'} type="password" methods={methods} isArabic={isArabic} required />
                        <FormField name="newPassword" label={isArabic ? 'كلمة المرور الجديدة' : 'New Password'} type="password" methods={methods} isArabic={isArabic} required />
                        <FormField name="confirmPassword" label={isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'} type="password" methods={methods} isArabic={isArabic} required />
                        <Button type="submit" disabled={loading}>
                          {loading ? (isArabic ? 'جاري التحديث...' : 'Updating...') : (isArabic ? 'تحديث كلمة المرور' : 'Update Password')}
                        </Button>
                      </>
                    )}
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-8">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'إعدادات الإشعارات' : 'Notification Settings'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className={isArabic ? 'text-right flex-1' : 'flex-1'}>
                      <Label>{isArabic ? 'إشعارات البريد الإلكتروني' : 'Email Notifications'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'تلقي التحديثات عبر البريد' : 'Receive updates via email'}
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={isArabic ? 'text-right flex-1' : 'flex-1'}>
                      <Label>{isArabic ? 'إشعارات الرسائل النصية' : 'SMS Notifications'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'تلقي التحديثات عبر الرسائل' : 'Receive updates via SMS'}
                      </p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={isArabic ? 'text-right flex-1' : 'flex-1'}>
                      <Label>{isArabic ? 'تحديثات الدورات' : 'Course Updates'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'إشعارات حول دوراتك' : 'Notifications about your courses'}
                      </p>
                    </div>
                    <Switch
                      checked={notifications.courseUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, courseUpdates: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className={isArabic ? 'text-right flex-1' : 'flex-1'}>
                      <Label>{isArabic ? 'العروض الترويجية' : 'Promotions'}</Label>
                      <p className="text-sm text-muted-foreground">
                        {isArabic ? 'تلقي عروض وخصومات' : 'Receive offers and discounts'}
                      </p>
                    </div>
                    <Switch
                      checked={notifications.promotions}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
                    />
                  </div>
                  <Button onClick={handleNotificationsUpdate} disabled={loading}>
                    {loading ? (isArabic ? 'جاري الحفظ...' : 'Saving...') : (isArabic ? 'حفظ التغييرات' : 'Save Changes')}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payment" className="mt-8">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className={isArabic ? 'text-right' : ''}>
                    {isArabic ? 'طرق الدفع' : 'Payment Methods'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {isArabic ? 'لا توجد طرق دفع محفوظة' : 'No saved payment methods'}
                    </p>
                    <Button variant="outline" className="mt-4">
                      {isArabic ? 'إضافة طريقة دفع' : 'Add Payment Method'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  )
}
