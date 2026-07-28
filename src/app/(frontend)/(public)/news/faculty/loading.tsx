import { NewsListSkeleton } from '../_components/NewsListSkeleton'
import { Skeleton } from '@/components/ui'

const FacultyNewsLoading = () => (
  <div>
    <section
      aria-label="Завантаження новин факультету"
      className="px-4 py-12 md:px-12 md:py-16"
    >
      <div className="flex flex-col gap-3 border-b pb-8">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-12 max-w-xl" />
        <Skeleton className="h-6 max-w-2xl" />
      </div>
      <NewsListSkeleton />
    </section>
  </div>
)

export default FacultyNewsLoading
