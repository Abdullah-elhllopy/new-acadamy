// app/(secured)/dashboard/robots/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardHero } from '@/components/sections/hero';
import { TitleContainer } from '@/components/shared/title';
import { ContentLayout } from '@/layout/page-layout';

interface RobotRule {
  id: string;
  userAgent: string;
  allow: string[];
  disallow: string[];
}

const DEFAULT_DISALLOW_PATHS = [
  '/dashboard/',
  '/api/',
  '/admin/',
  '/_next/',
  '/booking/confirmation',
  '/user/profile',
  '/my-certificates',
  '/login',
  '/signup',
];

export default function RobotsManagerPage() {
  const [rules, setRules] = useState<RobotRule[]>([
    {
      id: '1',
      userAgent: '*',
      allow: ['/'],
      disallow: DEFAULT_DISALLOW_PATHS,
    },
    {
      id: '2',
      userAgent: 'Googlebot',
      allow: ['/'],
      disallow: ['/dashboard/', '/api/', '/admin/', '/_next/'],
    },
  ]);

  const [sitemapUrl, setSitemapUrl] = useState(
    `${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}/sitemap.xml`
  );
  const [hostUrl, setHostUrl] = useState(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'
  );

  const robotsUrl = `${hostUrl}/robots.txt`;

  const handleSave = () => {
    toast.success('Robots.txt configuration saved successfully');
  };

  const addDisallowPath = (ruleId: string) => {
    const path = prompt('Enter path to disallow (e.g., /private/)');
    if (path) {
      setRules(rules.map(rule =>
        rule.id === ruleId
          ? { ...rule, disallow: [...rule.disallow, path] }
          : rule
      ));
    }
  };

  const removeDisallowPath = (ruleId: string, path: string) => {
    setRules(rules.map(rule =>
      rule.id === ruleId
        ? { ...rule, disallow: rule.disallow.filter(p => p !== path) }
        : rule
    ));
  };

  const addUserAgent = () => {
    const userAgent = prompt('Enter user agent name (e.g., Bingbot)');
    if (userAgent) {
      setRules([
        ...rules,
        {
          id: Date.now().toString(),
          userAgent,
          allow: ['/'],
          disallow: ['/dashboard/', '/api/'],
        },
      ]);
    }
  };

  const removeUserAgent = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const generateRobotsTxt = () => {
    let content = '';

    rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;
      rule.allow.forEach(path => {
        content += `Allow: ${path}\n`;
      });
      rule.disallow.forEach(path => {
        content += `Disallow: ${path}\n`;
      });
      content += '\n';
    });

    content += `Sitemap: ${sitemapUrl}\n`;
    content += `Host: ${hostUrl}\n`;

    return content;
  };

  return (
    <div className="space-y-6">
      <DashboardHero>
        <TitleContainer title={'Robots.txt Manager'}
          subtitle={'Control how search engines crawl your website'}
        />
        <div className="flex items-center gap-4">
          <Badge variant="default">Active</Badge>
          <Button variant="outline" size="sm" asChild>
            <a href={robotsUrl} target="_blank" rel="noopener noreferrer">
              View Current robots.txt
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>
      </DashboardHero>

      <ContentLayout className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Global Settings</CardTitle>
            <CardDescription>Configure sitemap and host settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sitemap">Sitemap URL</Label>
              <Input
                id="sitemap"
                value={sitemapUrl}
                onChange={(e) => setSitemapUrl(e.target.value)}
                placeholder="https://id-academy.com/sitemap.xml"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="host">Host URL</Label>
              <Input
                id="host"
                value={hostUrl}
                onChange={(e) => setHostUrl(e.target.value)}
                placeholder="https://id-academy.com"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">User Agent Rules</h2>
            <Button onClick={addUserAgent} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add User Agent
            </Button>
          </div>

          {rules.map((rule) => (
            <Card key={rule.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">User-agent: {rule.userAgent}</CardTitle>
                  {rules.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeUserAgent(rule.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Disallowed Paths</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addDisallowPath(rule.id)}
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add Path
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {rule.disallow.map((path, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <code className="flex-1 text-sm bg-muted px-3 py-2 rounded">
                          Disallow: {path}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDisallowPath(rule.id, path)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Generated robots.txt Preview</CardTitle>
            <CardDescription>
              This is how your robots.txt file will look
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="text-sm whitespace-pre-wrap">{generateRobotsTxt()}</pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </ContentLayout>
    </div>
  );
}
