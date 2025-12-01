import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-foreground/60 mb-6">
      {items.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          <Link href={item.href} className="hover:text-foreground transition-colors">
            {item.label}
          </Link>
          {index < items.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </nav>
  )
}
