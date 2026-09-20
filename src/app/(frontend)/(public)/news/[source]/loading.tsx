import { NewsListSkeleton } from '../_components/NewsListSkeleton'
import { Skeleton } from '@/components/ui'

const SourceNewsLoading = () => (
  <div>
    <section
      aria-label="Завантаження архіву новин"
      className="px-4 py-12 md:px-12 md:py-16"
    >
      <div className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-9 w-72 max-w-full md:h-10" />
        </div>
        <Skeleton className="h-10 w-44 rounded-full" />
      </div>

      <div className="mt-2 [&>div>div:last-child]:border-b-0">
        <NewsListSkeleton />
      </div>

      <div className="mt-10 border-t pt-8">
        <div
          aria-hidden="true"
          className="flex justify-start gap-1 md:justify-center"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton
              key={index}
              className="size-9 rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  </div>
)

export default SourceNewsLoading
