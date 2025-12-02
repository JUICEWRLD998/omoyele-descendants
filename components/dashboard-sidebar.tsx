"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/auth-context"
import {
  Home,
  History,
  Users,
  Search,
  Images,
  LogOut,
  TreePine,
  Menu,
} from "lucide-react"
import { useState } from "react"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "History",
    href: "/history",
    icon: History,
  },
  {
    title: "Family Members",
    href: "/family-tree",
    icon: Users,
  },
  {
    title: "Search Lineage",
    href: "/search",
    icon: Search,
  },
  {
    title: "Family Gallery",
    href: "/gallery",
    icon: Images,
  },
]

function SidebarContent({ onLinkClick }: { onLinkClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()
  const { signOut, user } = useAuth()

  const handleLogout = async () => {
    await signOut()
    onLinkClick?.()
    router.push("/login")
  }

  return (
    <div className="flex h-full flex-col bg-sidebar">
      {/* Logo/Brand */}
      <div className="flex h-20 items-center px-6">
        <Link 
          href="/" 
          className="flex items-center transition-opacity hover:opacity-80" 
          onClick={onLinkClick}
        >
          <span className="text-2xl font-bold tracking-widest text-primary">OMOYELE</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.title}
            </Link>
          )
        })}
      </nav>

      {/* Logout Only */}
      <div className="p-4 mt-auto border-t border-sidebar-border/50">
        <Button
          variant="outline"
          className="w-full justify-start gap-3 border-sidebar-border/50 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-all"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  return (
    <aside className="hidden lg:flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      <SidebarContent />
    </aside>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}

export function MobileHeader() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:hidden">
      <MobileSidebar />
      <Link href="/" className="flex items-center font-bold">
        <span className="text-lg tracking-widest text-primary">OMOYELE</span>
      </Link>
      <div className="w-10" /> {/* Spacer for centering */}
    </header>
  )
}
