// app/(secured)/dashboard/seo/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardHero } from '@/components/sections/hero';
import { TitleContainer } from '@/components/shared/title';
import { ContentLayout } from '@/layout/page-layout';

interface SeoMeta {
  pageKey: string;
  pageName: string;
  pageUrl: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  focusKeyword?: string;
  ogImage?: string;
  updatedAt: string;
}

const MANAGEABLE_PAGES: SeoMeta[] = [
  {
    pageKey: 'homepage',
    pageName: 'Homepage',
    pageUrl: '/',
    titleAr: 'أكاديمية التنمية المتكاملة للقيادة والإدارة',
    titleEn: 'ID Academy - Professional Training & Development',
    descriptionAr: 'برامج تدريبية احترافية في القيادة والأعمال والمهارات التقنية',
    descriptionEn: 'Professional training programs in leadership, business, and technical skills',
    updatedAt: new Date().toISOString(),
  },
  {
    pageKey: 'about',
    pageName: 'About Us',
    pageUrl: '/about',
    titleAr: 'عن الأكاديمية',
    titleEn: 'About ID Academy',
    descriptionAr: 'تعرف على أكاديمية التنمية المتكاملة ورؤيتنا ورسالتنا',
    descriptionEn: 'Learn about ID Academy, our vision, and mission',
    updatedAt: new Date().toISOString(),
  },
  {
    pageKey: 'programs',
    pageName: 'Training Programs',
    pageUrl: '/all-programs',
    titleAr: 'البرامج التدريبية',
    titleEn: 'Training Programs',
    descriptionAr: 'استعرض جميع البرامج التدريبية المتاحة في مختلف المجالات',
    descriptionEn: 'Browse all available training programs across various fields',
    updatedAt: new Date().toISOString(),
  },
  {
    pageKey: 'trainers',
    pageName: 'Our Trainers',
    pageUrl: '/trainers',
    titleAr: 'المدربون',
    titleEn: 'Our Trainers',
    descriptionAr: 'تعرف على فريق المدربين المحترفين لدينا',
    descriptionEn: 'Meet our team of professional trainers',
    updatedAt: new Date().toISOString(),
  },
  {
    pageKey: 'contact',
    pageName: 'Contact Us',
    pageUrl: '/contact',
    titleAr: 'اتصل بنا',
    titleEn: 'Contact Us',
    descriptionAr: 'تواصل معنا للاستفسارات والحجوزات',
    descriptionEn: 'Get in touch with us for inquiries and bookings',
    updatedAt: new Date().toISOString(),
  },
];

export default function SeoManagerPage() {
  const [pages, setPages] = useState<SeoMeta[]>(MANAGEABLE_PAGES);
  const [editingPage, setEditingPage] = useState<SeoMeta | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (page: SeoMeta) => {
    setEditingPage({ ...page });
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    if (!editingPage) return;

    // Validate character limits
    if (editingPage.titleAr.length > 60 || editingPage.titleEn.length > 60) {
      toast.error('Title must be 60 characters or less');
      return;
    }

    if (editingPage.descriptionAr.length > 160 || editingPage.descriptionEn.length > 160) {
      toast.error('Description must be 160 characters or less');
      return;
    }

    // Update the page in the list
    setPages(pages.map(p => p.pageKey === editingPage.pageKey ? { ...editingPage, updatedAt: new Date().toISOString() } : p));

    toast.success('SEO metadata updated successfully');
    setIsDialogOpen(false);
    setEditingPage(null);
  };

  const getCharacterCount = (text: string, limit: number) => {
    const remaining = limit - text.length;
    const color = remaining < 10 ? 'text-destructive' : remaining < 20 ? 'text-warning' : 'text-muted-foreground';
    return <span className={`text-sm ${color}`}>{text.length}/{limit}</span>;
  };

  return (
    <div className="space-y-6">
      <DashboardHero breadcrumbItems={[
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Lectures', href: '/dashboard/seo' },
      ]} >
        <TitleContainer title='SEO Manager' subtitle=' Manage page titles, meta descriptions, and SEO settings for all public pages' />

      </DashboardHero>

      <ContentLayout>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Page Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Title (AR)</TableHead>
                <TableHead>Title (EN)</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pages.map((page) => (
                <TableRow key={page.pageKey}>
                  <TableCell className="font-medium">{page.pageName}</TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{page.pageUrl}</code>
                  </TableCell>
                  <TableCell className="max-w-50 truncate">{page.titleAr}</TableCell>
                  <TableCell className="max-w-50 truncate">{page.titleEn}</TableCell>
                  <TableCell>{new Date(page.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(page)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ContentLayout>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit SEO Metadata</DialogTitle>
            <DialogDescription>
              Update page title and meta description for {editingPage?.pageName}
            </DialogDescription>
          </DialogHeader>

          {editingPage && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="titleAr">Page Title (Arabic)</Label>
                <Input
                  id="titleAr"
                  value={editingPage.titleAr}
                  onChange={(e) => setEditingPage({ ...editingPage, titleAr: e.target.value })}
                  maxLength={60}
                  dir="rtl"
                />
                {getCharacterCount(editingPage.titleAr, 60)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleEn">Page Title (English)</Label>
                <Input
                  id="titleEn"
                  value={editingPage.titleEn}
                  onChange={(e) => setEditingPage({ ...editingPage, titleEn: e.target.value })}
                  maxLength={60}
                />
                {getCharacterCount(editingPage.titleEn, 60)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">Meta Description (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  value={editingPage.descriptionAr}
                  onChange={(e) => setEditingPage({ ...editingPage, descriptionAr: e.target.value })}
                  maxLength={160}
                  rows={3}
                  dir="rtl"
                />
                {getCharacterCount(editingPage.descriptionAr, 160)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionEn">Meta Description (English)</Label>
                <Textarea
                  id="descriptionEn"
                  value={editingPage.descriptionEn}
                  onChange={(e) => setEditingPage({ ...editingPage, descriptionEn: e.target.value })}
                  maxLength={160}
                  rows={3}
                />
                {getCharacterCount(editingPage.descriptionEn, 160)}
              </div>

              <div className="space-y-2">
                <Label htmlFor="focusKeyword">Focus Keyword (Optional)</Label>
                <Input
                  id="focusKeyword"
                  value={editingPage.focusKeyword || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, focusKeyword: e.target.value })}
                  placeholder="e.g., leadership training"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ogImage">Open Graph Image URL (Optional)</Label>
                <Input
                  id="ogImage"
                  value={editingPage.ogImage || ''}
                  onChange={(e) => setEditingPage({ ...editingPage, ogImage: e.target.value })}
                  placeholder="/images/og-image.jpg"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
