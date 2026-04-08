'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/shared/hooks/useLanguage'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function FAQSection() {
  const { isArabic } = useLanguage()

  const faqs = [
    {
      questionEn: 'How do I register for a training program?',
      questionAr: 'كيف يمكنني التسجيل في برنامج تدريبي؟',
      answerEn: 'You can register by browsing our training programs, selecting the program that suits you, and clicking the "Book Now" button. Fill in your details and choose your preferred payment method.',
      answerAr: 'يمكنك التسجيل من خلال تصفح برامجنا التدريبية، واختيار البرنامج المناسب لك، والضغط على زر "احجز الآن". قم بتعبئة بياناتك واختر طريقة الدفع المفضلة.'
    },
    {
      questionEn: 'What payment methods do you accept?',
      questionAr: 'ما هي طرق الدفع المتاحة؟',
      answerEn: 'We accept bank transfers, electronic payment through our payment gateway, and payment at the center. You can choose the method that suits you during the booking process.',
      answerAr: 'نقبل التحويل البنكي، والدفع الإلكتروني عبر بوابة الدفع، والدفع في المركز. يمكنك اختيار الطريقة المناسبة لك أثناء عملية الحجز.'
    },
    {
      questionEn: 'Do you offer corporate training programs?',
      questionAr: 'هل تقدمون برامج تدريبية للشركات؟',
      answerEn: 'Yes, we offer customized training programs for companies, government entities, and NGOs. You can submit a custom training request through our platform.',
      answerAr: 'نعم، نقدم برامج تدريبية مخصصة للشركات والجهات الحكومية والمنظمات غير الربحية. يمكنك تقديم طلب تدريب مخصص من خلال منصتنا.'
    },
    {
      questionEn: 'Will I receive a certificate after completing the program?',
      questionAr: 'هل سأحصل على شهادة بعد إتمام البرنامج؟',
      answerEn: 'Yes, you will receive a verified digital certificate upon successful completion of the training program. The certificate can be downloaded and verified online.',
      answerAr: 'نعم، ستحصل على شهادة رقمية معتمدة عند إتمام البرنامج التدريبي بنجاح. يمكن تحميل الشهادة والتحقق منها إلكترونياً.'
    },
    {
      questionEn: 'Can I cancel or reschedule my booking?',
      questionAr: 'هل يمكنني إلغاء أو إعادة جدولة حجزي؟',
      answerEn: 'Yes, you can cancel or reschedule your booking according to our cancellation policy. Please contact us at least 48 hours before the program start date.',
      answerAr: 'نعم، يمكنك إلغاء أو إعادة جدولة حجزك وفقاً لسياسة الإلغاء الخاصة بنا. يرجى التواصل معنا قبل 48 ساعة على الأقل من موعد بدء البرنامج.'
    },
    {
      questionEn: 'Do you offer online training programs?',
      questionAr: 'هل تقدمون برامج تدريبية عن بُعد؟',
      answerEn: 'Yes, we offer both in-person and online training programs. You can filter programs by type when browsing our training catalog.',
      answerAr: 'نعم، نقدم برامج تدريبية حضورية وعن بُعد. يمكنك تصفية البرامج حسب النوع عند تصفح كتالوج التدريب الخاص بنا.'
    }
  ]

  return (
    <section className="py-20 md:py-24 bg-muted">
      <div className="container mx-auto px-4 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isArabic
              ? 'إجابات على الأسئلة الأكثر شيوعاً حول برامجنا التدريبية'
              : 'Answers to the most common questions about our training programs'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground">
                    {isArabic ? faq.questionAr : faq.questionEn}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {isArabic ? faq.answerAr : faq.answerEn}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {isArabic ? 'لديك سؤال آخر؟' : 'Have another question?'}
            </p>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-8"
              asChild
            >
              <Link href="/contact">
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
