// app/(secured)/dashboard/content/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save, Eye, History, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardHero } from '@/components/sections/hero';
import { TitleContainer } from '@/components/shared/title';
import { ContentLayout } from '@/layout/page-layout';

interface PageContent {
  pageKey: string;
  pageName: string;
  contentAr: string;
  contentEn: string;
  status: 'draft' | 'published';
  lastModified: string;
  versions: number;
}

const MANAGEABLE_PAGES: PageContent[] = [
  {
    pageKey: 'about-us',
    pageName: 'About Us',
    contentAr: 'نحن أكاديمية التنمية المتكاملة للقيادة والإدارة...',
    contentEn: 'We are the Academy for Integrated Development in Leadership and Management...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 3,
  },
  {
    pageKey: 'vision',
    pageName: 'Vision',
    contentAr: 'رؤيتنا هي أن نكون الأكاديمية الرائدة...',
    contentEn: 'Our vision is to be the leading academy...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 2,
  },
  {
    pageKey: 'mission',
    pageName: 'Mission',
    contentAr: 'مهمتنا هي تقديم برامج تدريبية عالية الجودة...',
    contentEn: 'Our mission is to provide high-quality training programs...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 2,
  },
  {
    pageKey: 'methodology',
    pageName: 'Our Methodology',
    contentAr: 'نتبع منهجية تدريبية متطورة...',
    contentEn: 'We follow an advanced training methodology...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 1,
  },
  {
    pageKey: 'services',
    pageName: 'Our Services',
    contentAr: 'نقدم مجموعة واسعة من الخدمات التدريبية...',
    contentEn: 'We offer a wide range of training services...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 4,
  },
  {
    pageKey: 'faq',
    pageName: 'FAQ',
    contentAr: 'الأسئلة الشائعة...',
    contentEn: 'Frequently Asked Questions...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 5,
  },
  {
    pageKey: 'privacy',
    pageName: 'Privacy Policy',
    contentAr: 'سياسة الخصوصية...',
    contentEn: 'Privacy Policy...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 2,
  },
  {
    pageKey: 'terms',
    pageName: 'Terms & Conditions',
    contentAr: 'الشروط والأحكام...',
    contentEn: 'Terms and Conditions...',
    status: 'published',
    lastModified: new Date().toISOString(),
    versions: 2,
  },
];

export default function ContentManagerPage() {
  const [selectedPage, setSelectedPage] = useState<string>(MANAGEABLE_PAGES[0].pageKey);
  const [pages, setPages] = useState<PageContent[]>(MANAGEABLE_PAGES);
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>('ar');

  const currentPage = pages.find(p => p.pageKey === selectedPage);

  const handleContentChange = (lang: 'ar' | 'en', value: string) => {
    setPages(pages.map(p =>
      p.pageKey === selectedPage
        ? { ...p, [lang === 'ar' ? 'contentAr' : 'contentEn']: value }
        : p
    ));
  };

  const handleSaveDraft = () => {
    setPages(pages.map(p =>
      p.pageKey === selectedPage
        ? { ...p, status: 'draft', lastModified: new Date().toISOString() }
        : p
    ));
    toast.success('Draft saved successfully');
  };

  const handlePublish = () => {
    setPages(pages.map(p =>
      p.pageKey === selectedPage
        ? {
          ...p,
          status: 'published',
          lastModified: new Date().toISOString(),
          versions: p.versions + 1
        }
        : p
    ));
    toast.success('Content published successfully');
  };

  const handlePreview = () => {
    toast.info('Opening preview in new tab...');
    // In production, this would open a preview URL
  };

  const handleViewHistory = () => {
    toast.info('Version history feature coming soon');
  };

  return (
    <div className="space-y-6">
      <DashboardHero>
        <TitleContainer title='Content Manager' subtitle='Manage static page content in Arabic and English' />
      </DashboardHero>

      <ContentLayout>
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pages</CardTitle>
              <CardDescription>Select a page to edit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.pageKey}
                  onClick={() => setSelectedPage(page.pageKey)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${selectedPage === page.pageKey
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{page.pageName}</span>
                    <Badge
                      variant={page.status === 'published' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {page.status}
                    </Badge>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            {currentPage && (
              <>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{currentPage.pageName}</CardTitle>
                        <CardDescription>
                          Last modified: {new Date(currentPage.lastModified).toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={handleViewHistory}>
                          <History className="w-4 h-4 mr-2" />
                          History ({currentPage.versions})
                        </Button>
                        <Button variant="outline" size="sm" onClick={handlePreview}>
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'ar' | 'en')}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="ar">Arabic Content</TabsTrigger>
                        <TabsTrigger value="en">English Content</TabsTrigger>
                      </TabsList>
                      <TabsContent value="ar" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="content-ar">Content (Arabic)</Label>
                          <Textarea
                            id="content-ar"
                            value={currentPage.contentAr}
                            onChange={(e) => handleContentChange('ar', e.target.value)}
                            rows={20}
                            dir="rtl"
                            className="font-sans"
                            placeholder="أدخل المحتوى بالعربية..."
                          />
                          <p className="text-sm text-muted-foreground">
                            {currentPage.contentAr.length} characters
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="en" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="content-en">Content (English)</Label>
                          <Textarea
                            id="content-en"
                            value={currentPage.contentEn}
                            onChange={(e) => handleContentChange('en', e.target.value)}
                            rows={20}
                            placeholder="Enter content in English..."
                          />
                          <p className="text-sm text-muted-foreground">
                            {currentPage.contentEn.length} characters
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={handleSaveDraft}>
                    <FileText className="w-4 h-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button onClick={handlePublish}>
                    <Save className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </ContentLayout>
    </div>
  );
}
