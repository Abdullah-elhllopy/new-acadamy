// app/(secured)/dashboard/sitemap/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, ExternalLink, CheckCircle2, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardHero } from '@/components/sections/hero';
import { TitleContainer } from '@/components/shared/title';
import { ContentLayout } from '@/layout/page-layout';

interface SitemapSettings {
  includeCourses: boolean;
  includeArticles: boolean;
  includeTrainers: boolean;
  includeStaticPages: boolean;
}

export default function SitemapManagerPage() {
  const [settings, setSettings] = useState<SitemapSettings>({
    includeCourses: true,
    includeArticles: true,
    includeTrainers: true,
    includeStaticPages: true,
  });
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState(new Date().toISOString());

  const sitemapUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/sitemap.xml`;
  const googleSearchConsoleUrl = 'https://search.google.com/search-console';

  const handleRegenerate = async () => {
    setIsRegenerating(true);

    // Simulate regeneration (in production, this would call an API endpoint)
    await new Promise(resolve => setTimeout(resolve, 2000));

    setLastGenerated(new Date().toISOString());
    setIsRegenerating(false);
    toast.success('Sitemap regenerated successfully');
  };

  const handleCopySitemapUrl = () => {
    navigator.clipboard.writeText(sitemapUrl);
    toast.success('Sitemap URL copied to clipboard');
  };

  const handleToggle = (key: keyof SitemapSettings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.info('Settings updated. Click "Regenerate Sitemap" to apply changes.');
  };

  return (
    <div className="space-y-6">
      <DashboardHero>
        <TitleContainer title={'Sitemap Manager'} subtitle={'Streamline your SEO with sitemap management'} />
      </DashboardHero>

      <ContentLayout className="space-y-4">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap Status</CardTitle>
              <CardDescription>Current sitemap information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge variant="default" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Active
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Generated</span>
                <span className="text-sm text-muted-foreground">
                  {new Date(lastGenerated).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Sitemap URL</span>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopySitemapUrl}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                  >
                    <a href={sitemapUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
              <div className="pt-4">
                <Button
                  onClick={handleRegenerate}
                  disabled={isRegenerating}
                  className="w-full"
                >
                  {isRegenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate Sitemap Now
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Inclusion</CardTitle>
              <CardDescription>Choose which content types to include</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="courses" className="cursor-pointer">
                  Training Courses
                </Label>
                <Switch
                  id="courses"
                  checked={settings.includeCourses}
                  onCheckedChange={() => handleToggle('includeCourses')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="articles" className="cursor-pointer">
                  Articles & Blog Posts
                </Label>
                <Switch
                  id="articles"
                  checked={settings.includeArticles}
                  onCheckedChange={() => handleToggle('includeArticles')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="trainers" className="cursor-pointer">
                  Trainer Profiles
                </Label>
                <Switch
                  id="trainers"
                  checked={settings.includeTrainers}
                  onCheckedChange={() => handleToggle('includeTrainers')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="static" className="cursor-pointer">
                  Static Pages
                </Label>
                <Switch
                  id="static"
                  checked={settings.includeStaticPages}
                  onCheckedChange={() => handleToggle('includeStaticPages')}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit to Search Engines</CardTitle>
            <CardDescription>
              Submit your sitemap to search engines for faster indexing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Google Search Console</h3>
                <p className="text-sm text-muted-foreground">
                  Submit your sitemap to Google for indexing
                </p>
              </div>
              <Button variant="outline" asChild>
                <a href={googleSearchConsoleUrl} target="_blank" rel="noopener noreferrer">
                  Open Console
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Manual Submission Instructions</h4>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Open Google Search Console</li>
                <li>Select your property (website)</li>
                <li>Go to Sitemaps section in the left menu</li>
                <li>Enter your sitemap URL: <code className="bg-background px-2 py-1 rounded">{sitemapUrl}</code></li>
                <li>Click Submit</li>
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Sitemap Preview</CardTitle>
            <CardDescription>Preview of your sitemap structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg overflow-x-auto">
              <pre className="text-xs">
                {`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="ar" href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/ar"/>
    <xhtml:link rel="alternate" hreflang="en" href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/en"/>
  </url>
  ${settings.includeCourses ? `<url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/programs/[id]</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>` : ''}
  ${settings.includeArticles ? `<url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/articles/[id]</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>` : ''}
  ${settings.includeTrainers ? `<url>
    <loc>${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/trainers/[id]</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>` : ''}
  <!-- Additional URLs... -->
</urlset>`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </ContentLayout>
    </div>
  );
}
