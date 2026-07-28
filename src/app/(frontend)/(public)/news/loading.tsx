import { NewsListSkeleton } from './_components/NewsListSkeleton'

const NewsLoading = () => (
  <div>
    <section className="px-4 py-12 md:px-12 md:py-16">
      <div className="mb-8 flex flex-col gap-3">
        <div className="bg-muted h-4 w-32 animate-pulse rounded" />
        <div className="bg-muted h-12 max-w-xl animate-pulse rounded" />
      </div>
      <NewsListSkeleton />
    </section>
  </div>
)

export default NewsLoading
