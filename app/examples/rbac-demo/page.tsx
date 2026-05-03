'use client'

import { useAuth } from '@/shared/hooks/useAuth'
import { useLanguage } from '@/shared/hooks/useLanguage'
// import { RenderIfPermission, RenderIfRole, RenderIfAuth } from '@/components/auth/render-if'
// import { PermissionGuard } from '@/components/auth/permission-guard'
// import { RoleGuard } from '@/components/auth/role-guard'
import { UserRole, ROLE_LABELS } from '@/shared/constants/roles'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export default function RBACDemoPage() {
  const { user, hasPermission, hasRole } = useAuth()
  const { language } = useLanguage()
  const isArabic = language === 'ar'

  return (
    <></>
//     <div className="min-h-screen flex flex-col">
      
//       <main className="flex-1 container px-4 md:px-8 py-12">
//         <div className={`mb-12 ${isArabic ? 'text-right' : ''}`}>
//           <h1 className="text-4xl font-bold mb-2">
//             {isArabic ? 'عرض توضيحي لنظام الأدوار والأذونات' : 'RBAC Demo'}
//           </h1>
//           <p className="text-muted-foreground">
//             {isArabic ? 'تجربة نظام الأدوار والأذونات القائم على التصريح' : 'Experience the permission-based access control system'}
//           </p>
//         </div>

//         {/* Current User Info */}
//         {/* <Card className="mb-8">
//           <CardHeader>
//             <CardTitle>
//               {isArabic ? 'معلومات المستخدم الحالي' : 'Current User'}
//             </CardTitle>
//           </CardHeader>
//           <CardContent className={isArabic ? 'text-right' : ''}>
//             {user ? (
//               <div className="space-y-2">
//                 <p><strong>{isArabic ? 'البريد الإلكتروني:' : 'Email:'}</strong> {user.email}</p>
//                 <p><strong>{isArabic ? 'الاسم:' : 'Name:'}</strong> {user.name}</p>
//                 <p>
//                   <strong>{isArabic ? 'الدور:' : 'Role:'}</strong>{' '}
//                   <Badge className="ml-2">{ROLE_LABELS[user.role]}</Badge>
//                 </p>
//               </div>
//             ) : (
//               <p className="text-muted-foreground">
//                 {isArabic ? 'لم يتم تسجيل الدخول' : 'Not logged in'}
//               </p>
//             )}
//           </CardContent>
//         </Card> */}

//         {/* Permission Examples */}
//         <div className="space-y-8">
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
//               {isArabic ? 'أمثلة على الأذونات' : 'Permission Examples'}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Book Programs Permission */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'حجز البرامج' : 'Book Programs'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'فقط المتدربون والمديرون يمكنهم الحجز' : 'Only trainees and managers can book'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RenderIfPermission
//                     permission="book_programs"
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'ليس لديك إذن بحجز البرامج' : 'You cannot book programs'}
//                       </p>
//                     }
//                   >
//                     <Button>{isArabic ? 'احجز الآن' : 'Book Now'}</Button>
//                   </RenderIfPermission>
//                 </CardContent>
//               </Card>

//               {/* Manage Programs Permission */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'إدارة البرامج' : 'Manage Programs'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'فقط الموظفون والمسؤولون' : 'Only staff and admins'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   {/* <RenderIfPermission
//                     permission="manage_programs"
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'ليس لديك إذن بإدارة البرامج' : 'You cannot manage programs'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'أدارة' : 'Manage'}</Button>
//                   </RenderIfPermission> */}
//                 </CardContent>
//               </Card>

//               {/* Download Certificates Permission */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'تحميل الشهادات' : 'Download Certificates'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'فقط المتدربون' : 'Only trainees'}
//                   </CardDescription>
//                 </CardHeader>
//                 {/* <CardContent>
//                   <RenderIfPermission
//                     permission="download_certificates"
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'لا يمكنك تحميل الشهادات' : 'You cannot download certificates'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'تحميل' : 'Download'}</Button>
//                   </RenderIfPermission>
//                 </CardContent> */}
//               </Card>

//               {/* Bulk Register Permission */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'التسجيل الجماعي' : 'Bulk Register'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'فقط مديرو الشركات' : 'Only corporate managers'}
//                   </CardDescription>
//                 </CardHeader>
//                 {/* <CardContent>
//                   <RenderIfPermission
//                     permission="bulk_register"
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'لا يمكنك التسجيل الجماعي' : 'You cannot bulk register'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'تحميل CSV' : 'Upload CSV'}</Button>
//                   </RenderIfPermission>
//                 </CardContent> */}
//               </Card>
//             </div>
//           </section>

//           {/* Role Examples */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
//               {isArabic ? 'أمثلة على الأدوار' : 'Role Examples'}
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Admin/Staff only */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'لوحة إدارة النظام' : 'System Admin Panel'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'للمسؤولين والموظفين فقط' : 'Admins and staff only'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RenderIfRole
//                     roles={[UserRole.ADMIN, UserRole.STAFF]}
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'أنت لا تملك صلاحيات إدارية' : 'You do not have admin access'}
//                       </p>
//                     }
//                   >
//                     <Button variant="destructive">{isArabic ? 'فتح لوحة التحكم' : 'Open Panel'}</Button>
//                   </RenderIfRole>
//                 </CardContent>
//               </Card>

//               {/* Trainee only */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'لوحة المتدرب' : 'Trainee Dashboard'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'للمتدربين فقط' : 'Trainees only'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RenderIfRole
//                     roles={UserRole.TRAINEE}
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'أنت لست متدرباً' : 'You are not a trainee'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'فتح لوحتي' : 'Open Dashboard'}</Button>
//                   </RenderIfRole>
//                 </CardContent>
//               </Card>

//               {/* Corporate Manager */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'إدارة الشركة' : 'Corporate Portal'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'لمديري الشركات' : 'Corporate managers only'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RenderIfRole
//                     roles={UserRole.CORPORATE_MANAGER}
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'لا تملك صلاحيات مدير شركة' : 'You are not a corporate manager'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'إدارة فريقي' : 'Manage Team'}</Button>
//                   </RenderIfRole>
//                 </CardContent>
//               </Card>

//               {/* Trainer Applicant */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="text-lg">
//                     {isArabic ? 'تطبيق المدرب' : 'Trainer Application'}
//                   </CardTitle>
//                   <CardDescription>
//                     {isArabic ? 'لمتقدمي التدريب' : 'Trainer applicants only'}
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <RenderIfRole
//                     roles={UserRole.TRAINER_APPLICANT}
//                     fallback={
//                       <p className="text-sm text-muted-foreground">
//                         {isArabic ? 'لا يمكنك التقديم كمدرب' : 'You cannot apply as trainer'}
//                       </p>
//                     }
//                   >
//                     <Button variant="outline">{isArabic ? 'ملف التعريف' : 'My Profile'}</Button>
//                   </RenderIfRole>
//                 </CardContent>
//               </Card>
//             </div>
//           </section>

//           {/* Component Guard Examples */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
//               {isArabic ? 'حراس المكونات' : 'Component Guards'}
//             </h2>

//             <div className="grid grid-cols-1 gap-6">
//               {/* PermissionGuard */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{isArabic ? 'حراس الأذونات' : 'Permission Guard'}</CardTitle>
//                 </CardHeader>
//                 <CardContent className={`space-y-4 ${isArabic ? 'text-right' : ''}`}>
//                   <p className="text-sm text-muted-foreground">
//                     {isArabic ? 'استخدم PermissionGuard لإخفاء المحتوى بناءً على الأذونات:' : 'Use PermissionGuard to hide content based on permissions:'}
//                   </p>
//                   <PermissionGuard permission="manage_programs">
//                     <div className="p-4 bg-primary/10 rounded border border-primary">
//                       <p className="font-semibold text-primary">
//                         {isArabic ? 'لديك إذن إدارة البرامج!' : 'You have manage programs permission!'}
//                       </p>
//                       <p className="text-sm text-primary/80">
//                         {isArabic ? 'هذا المحتوى مرئي فقط للأشخاص الذين لديهم الإذن' : 'This content is only visible to those with permission'}
//                       </p>
//                     </div>
//                   </PermissionGuard>
//                 </CardContent>
//               </Card>

//               {/* RoleGuard */}
//               <Card>
//                 <CardHeader>
//                   <CardTitle>{isArabic ? 'حراس الأدوار' : 'Role Guard'}</CardTitle>
//                 </CardHeader>
//                 <CardContent className={`space-y-4 ${isArabic ? 'text-right' : ''}`}>
//                   <p className="text-sm text-muted-foreground">
//                     {isArabic ? 'استخدم RoleGuard لتقييد المحتوى على أدوار معينة:' : 'Use RoleGuard to restrict content to specific roles:'}
//                   </p>
//                   <RoleGuard roles={[UserRole.ADMIN, UserRole.STAFF]}>
//                     <div className="p-4 bg-accent/10 rounded border border-accent">
//                       <p className="font-semibold text-accent">
//                         {isArabic ? 'أنت موظف إداري!' : "You're an admin or staff member!"}
//                       </p>
//                       <p className="text-sm text-accent/80">
//                         {isArabic ? 'هذا المحتوى مقصور على الإدارة' : 'This content is restricted to management'}
//                       </p>
//                     </div>
//                   </RoleGuard>
//                 </CardContent>
//               </Card>
//             </div>
//           </section>

//           {/* Code Examples */}
//           <section>
//             <h2 className={`text-2xl font-bold mb-4 ${isArabic ? 'text-right' : ''}`}>
//               {isArabic ? 'أمثلة الأكواد' : 'Code Examples'}
//             </h2>

//             <Card>
//               <CardHeader>
//                 <CardTitle>{isArabic ? 'الاستخدام الأساسي' : 'Basic Usage'}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <pre className="bg-muted p-4 rounded text-xs overflow-auto">
// {`// Permission-based rendering
// <RenderIfPermission permission="book_programs">
//   <BookButton />
// </RenderIfPermission>

// // Role-based rendering
// <RenderIfRole roles={[UserRole.ADMIN]}>
//   <AdminPanel />
// </RenderIfRole>

// // Multiple permissions (OR logic)
// <RenderIfPermission 
//   permission={["book_programs", "view_programs"]}
// >
//   <Content />
// </RenderIfPermission>

// // With fallback
// <RenderIfPermission 
//   permission="book_programs"
//   fallback={<SignUpButton />}
// >
//   <BookButton />
// </RenderIfPermission>

// // Programmatic checks
// const canBook = hasPermission("book_programs")
// const isAdmin = hasRole([UserRole.ADMIN])
// `}
//                 </pre>
//               </CardContent>
//             </Card>
//           </section>
//         </div>

//         <div className={`mt-12 p-6 bg-muted rounded-lg ${isArabic ? 'text-right' : ''}`}>
//           <h3 className="font-semibold mb-2">
//             {isArabic ? 'ملاحظة مهمة' : 'Important Note'}
//           </h3>
//           <p className="text-sm text-muted-foreground">
//             {isArabic 
//               ? 'تم تسجيل دخولك بدور "متدرب". لاختبار الأدوار الأخرى، قم بتعديل ملف useAuth.ts أو تنفيذ نظام تسجيل دخول متقدم.'
//               : 'You are logged in as a "Trainee". To test other roles, modify the useAuth.ts file or implement a proper authentication system.'}
//           </p>
//         </div>
//       </main>
//     </div>
  )
}
