import { FormField } from '@/components/forms'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { Trainer } from '@/services/api/trainer.service'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const TrainersForm = ({ trainer, isSubmitting }: { trainer?: Trainer, isSubmitting?: boolean }) => {
  const { register } = useFormContext()
  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              name="instructorName"
              label="Trainer Name (English)"
              placeholder="Enter trainer name"
              required
            />
            <FormField
              name="instructorNameAr"
              label="Trainer Name (Arabic)"
              placeholder="أدخل اسم المدرب"
              required
            />
            <FormField
              name="specialization"
              label="Job Title (English)"
              placeholder="e.g., Senior Developer"
              required
            />
            <FormField
              name="specializationAr"
              label="Job Title (Arabic)"
              placeholder="مثال: مطور أول"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              name="instructorEmail"
              label="Email"
              type="email"
              placeholder="trainer@example.com"
              required
            />
            <FormField
              name="instructorPhone"
              label="Phone"
              type="tel"
              placeholder="+966 XX XXX XXXX"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card>
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              name="instructorBio"
              label="About Trainer (English)"
              type="textarea"
              placeholder="Enter trainer biography"
              rows={6}
              required
            />
            <FormField
              name="instructorBioAr"
              label="About Trainer (Arabic)"
              type="textarea"
              placeholder="أدخل السيرة الذاتية للمدرب"
              rows={6}
              required
            />
          </div>

          <FormField
            name="experience"
            label="Years of Experience"
            type="number"
            placeholder="0"
            required
          />
        </CardContent>
      </Card>

      {/* Media */}
      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            name="videoUrl"
            label="Video URL"
            type="url"
            placeholder="https://youtube.com/watch?v=..."
          />

          <div className="space-y-2">
            <Label htmlFor="image">Trainer Image</Label>
            {trainer?.image && (
              <div className="mb-2">
                <img src={trainer.image} alt="Current" className="h-20 w-20 rounded object-cover" />
              </div>
            )}
            <Input
              id="image"
              type="file"
              accept="image/*"
              {...register('image')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cv">Trainer CV (PDF)</Label>
            {trainer?.pdf && (
              <div className="mb-2">
                <a href={trainer.pdf} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
                  View Current CV
                </a>
              </div>
            )}
            <Input
              id="cv"
              type="file"
              accept=".pdf"
              {...register('cv')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            name="linkedin"
            label="LinkedIn"
            placeholder="https://linkedin.com/in/username"
          />
          <FormField
            name="facebook"
            label="Facebook"
            placeholder="https://facebook.com/username"
          />
          <FormField
            name="instagram"
            label="Instagram"
            placeholder="https://instagram.com/username"
          />
          <FormField
            name="twitter"
            label="Twitter"
            placeholder="https://twitter.com/username"
          />
        </CardContent>
      </Card>


      <div className="flex justify-start gap-4">
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard/trainers">Cancel</Link>
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (trainer ? 'Updating...' : 'Creating...') : (trainer ? 'Update Trainer' : 'Create Trainer')}
        </Button>
      </div>
    </div>
  )
}

export default TrainersForm