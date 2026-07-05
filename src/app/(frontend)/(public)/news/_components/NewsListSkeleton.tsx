import { Skeleton } from '@/components/ui/skeleton'

export const NewsListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div
    aria-hidden="true"
    className="flex flex-col"
  >
    {Array.from({ length: rows }).map((_, index) => (
      <div
        key={index}
        className="grid gap-5 border-b px-4 py-6 md:grid-cols-[220px_minmax(0,1fr)]"
      >
        <Skeleton className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[140px]" />
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-7 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    ))}
  </div>
)
