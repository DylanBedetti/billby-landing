import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  iconClassName?: string
}

export function FeatureCard({ icon, title, description, className, iconClassName }: FeatureCardProps) {
  return (
    <Card className={cn('gap-0 py-0 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:shadow-md', className)}>
      <CardContent className="p-6">
        <div className={cn('mb-4 inline-flex size-11 items-center justify-center rounded-xl', iconClassName ?? 'bg-primary/10 text-primary')}>
          {icon}
        </div>
        <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
