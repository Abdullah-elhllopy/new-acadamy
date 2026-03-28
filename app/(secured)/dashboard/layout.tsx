import { ReactNode } from 'react'
import Link from 'next/link'
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarInset,
  SidebarTrigger 
} from '@/components/ui/sidebar'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { LogOut, Settings, User } from 'lucide-react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        {/* Logo Header */}
        <SidebarHeader className="border-b border-border p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              ID
            </div>
            <span className="text-lg font-bold">Academy</span>
          </Link>
        </SidebarHeader>

        {/* Navigation Content */}
        <SidebarContent>
          <DashboardSidebar />
        </SidebarContent>

        {/* User Footer */}
        <SidebarFooter className="border-t border-border p-3">
          <div className="space-y-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/user-settings">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/user-settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </Button>
            <Separator className="my-2" />
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start gap-2 text-destructive hover:text-destructive"
              asChild
            >
              <Link href="/logout">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Link>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Main Content Area */}
      <SidebarInset>
        {/* Top Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-1 items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Dashboard
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
