import { NewsCardSkeleton } from './_components/NewsCard'
import { Skeleton } from '@/components/ui'
import { EXTERNAL_NEWS_SOURCES } from '@/shared/news'

export const NewsLoading = () => (
  <div
    role="status"
    aria-label="Завантаження новин"
  >
    <div aria-hidden="true">
      <section className="bg-muted/20 grid gap-8 border-b px-4 py-12 md:px-12 md:py-16 lg:grid-cols-[minmax(240px,0.45fr)_minmax(0,1fr)] lg:gap-12">
        <SectionIntroSkeleton />
        <ul className="divide-y">
          <NewsCardSkeleton variant="featured" />
          {Array.from({ length: 3 }).map((_, index) => (
            <NewsCardSkeleton
              key={index}
              variant="compact"
            />
          ))}
        </ul>
      </section>

      <div className="divide-y px-4 py-8 md:px-12 md:py-12">
        {EXTERNAL_NEWS_SOURCES.map((source) => (
          <section
            key={source}
            className="grid gap-8 py-10 lg:grid-cols-[minmax(240px,0.45fr)_minmax(0,1fr)] lg:gap-12"
          >
            <SectionIntroSkeleton />
            <ul className="divide-y">
              {Array.from({ length: 4 }).map((_, index) => (
                <NewsCardSkeleton
                  key={index}
                  variant="compact"
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  </div>
)

const SectionIntroSkeleton = () => (
  <div>
    <Skeleton className="my-0.5 h-4 w-6" />
    <Skeleton className="mt-4 h-9 w-48 max-w-full" />
    <div className="mt-3 flex max-w-md flex-col">
      <Skeleton className="my-1 h-4 w-full" />
      <Skeleton className="my-1 h-4 w-4/5" />
    </div>
    <Skeleton className="mt-6 h-8 w-32 rounded-full" />
  </div>
)

export default NewsLoading
