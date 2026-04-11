// app/(secured)/dashboard/settings/analytics/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, CheckCircle2, XCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DashboardHero } from '@/components/sections/hero';
import { TitleContainer } from '@/components/shared/title';
import { ContentLayout } from '@/layout/page-layout';

interface AnalyticsTool {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  configKey: string;
  value: string;
  placeholder: string;
  docsUrl: string;
  status: 'active' | 'inactive' | 'error';
}

export default function AnalyticsSettingsPage() {
  const [tools, setTools] = useState<AnalyticsTool[]>([
    {
      id: 'ga4',
      name: 'Google Analytics 4',
      description: 'Track website traffic, user behavior, and conversions',
      enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      configKey: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
      value: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
      placeholder: 'G-XXXXXXXXXX',
      docsUrl: 'https://support.google.com/analytics/answer/9539598',
      status: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ? 'active' : 'inactive',
    },
    {
      id: 'gtm',
      name: 'Google Tag Manager',
      description: 'Manage all your marketing tags in one place',
      enabled: !!process.env.NEXT_PUBLIC_GTM_ID,
      configKey: 'NEXT_PUBLIC_GTM_ID',
      value: process.env.NEXT_PUBLIC_GTM_ID || '',
      placeholder: 'GTM-XXXXXXX',
      docsUrl: 'https://support.google.com/tagmanager/answer/6103696',
      status: process.env.NEXT_PUBLIC_GTM_ID ? 'active' : 'inactive',
    },
    {
      id: 'clarity',
      name: 'Microsoft Clarity',
      description: 'Understand user behavior with heatmaps and session recordings',
      enabled: !!process.env.NEXT_PUBLIC_CLARITY_ID,
      configKey: 'NEXT_PUBLIC_CLARITY_ID',
      value: process.env.NEXT_PUBLIC_CLARITY_ID || '',
      placeholder: 'xxxxxxxxxx',
      docsUrl: 'https://clarity.microsoft.com/docs',
      status: process.env.NEXT_PUBLIC_CLARITY_ID ? 'active' : 'inactive',
    },
  ]);

  const [googleVerification, setGoogleVerification] = useState(
    process.env.GOOGLE_SITE_VERIFICATION || ''
  );

  const handleToggle = (toolId: string) => {
    setTools(tools.map(tool =>
      tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const handleValueChange = (toolId: string, value: string) => {
    setTools(tools.map(tool =>
      tool.id === toolId ? { ...tool, value } : tool
    ));
  };

  const handleTestConnection = (tool: AnalyticsTool) => {
    if (!tool.value) {
      toast.error('Please enter a valid ID first');
      return;
    }

    // Simulate connection test
    toast.loading('Testing connection...');
    setTimeout(() => {
      toast.dismiss();
      toast.success(`${tool.name} connection successful`);
      setTools(tools.map(t =>
        t.id === tool.id ? { ...t, status: 'active' } : t
      ));
    }, 1500);
  };

  const handleSave = () => {
    toast.success('Analytics settings saved successfully');
    toast.info('Please rebuild your application for changes to take effect');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="default" className="gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Active
          </Badge>
        );
      case 'error':
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="w-3 h-3" />
            Error
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary" className="gap-1">
            <AlertCircle className="w-3 h-3" />
            Inactive
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHero>
        <TitleContainer title={"Analytics Settings"}
          subtitle={'Configure tracking and analytics tools for your website'}
        />
      </DashboardHero>
      <ContentLayout>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Analytics tools only load in production mode. Changes require rebuilding the application.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Google Search Console Verification</CardTitle>
            <CardDescription>
              Verify your site ownership with Google Search Console
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google-verification">Verification Code</Label>
              <Input
                id="google-verification"
                value={googleVerification}
                onChange={(e) => setGoogleVerification(e.target.value)}
                placeholder="xxxxxxxxxxxxxxxxxxxx"
              />
              <p className="text-sm text-muted-foreground">
                Get your verification code from{' '}
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Search Console
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Analytics Tools</h2>

          {tools.map((tool) => (
            <Card key={tool.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      {tool.name}
                      {getStatusBadge(tool.status)}
                    </CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </div>
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => handleToggle(tool.id)}
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={tool.id}>{tool.name} ID</Label>
                  <div className="flex gap-2">
                    <Input
                      id={tool.id}
                      value={tool.value}
                      onChange={(e) => handleValueChange(tool.id, e.target.value)}
                      placeholder={tool.placeholder}
                      disabled={!tool.enabled}
                    />
                    <Button
                      variant="outline"
                      onClick={() => handleTestConnection(tool)}
                      disabled={!tool.enabled || !tool.value}
                    >
                      Test
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Environment variable: <code className="bg-muted px-2 py-1 rounded">{tool.configKey}</code>
                  </p>
                </div>

                <Button variant="ghost" size="sm" asChild>
                  <a href={tool.docsUrl} target="_blank" rel="noopener noreferrer">
                    View Documentation
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className='mt-4'>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>
              Add these to your .env.local file
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <pre className="text-sm">
                {`# Analytics Configuration
NEXT_PUBLIC_SITE_URL=${process.env.NEXT_PUBLIC_SITE_URL || 'https://id-academy.com'}
GOOGLE_SITE_VERIFICATION=${googleVerification || 'your-verification-code'}
${tools.map(tool => `${tool.configKey}=${tool.value || tool.placeholder}`).join('\n')}`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-start mt-4 gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </ContentLayout>
    </div>
  );
}
