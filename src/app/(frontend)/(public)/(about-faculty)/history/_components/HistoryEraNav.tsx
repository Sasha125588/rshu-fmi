'use client'

import { getHistoryEraAnchor, historyEras } from '../_constants'
import { useActiveHistoryEraId } from '../_contexts/activeHistoryEraId'
import { cn } from '@/lib/utils'

export const HistoryEraNav = () => {
  const activeEraId = useActiveHistoryEraId()

  return (
    <nav
      aria-label="Ери історії факультету"
      className="bg-background/90 sticky top-16 z-40 border-y backdrop-blur-xl"
    >
      <div className="scrollbar-none overflow-x-auto px-4 md:px-12 [&::-webkit-scrollbar]:hidden">
        <div className="flex h-18 min-w-max items-center gap-7 md:gap-10">
          {historyEras.map((era) => {
            const isActive = era.id === activeEraId.value

            return (
              <a
                key={era.id}
                href={`#${getHistoryEraAnchor(era.id)}`}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => activeEraId.set(era.id)}
                className={cn(
                  'after:bg-accent-violet relative flex shrink-0 flex-col gap-0.5 py-2 text-left transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:transition-transform focus-visible:outline-none focus-visible:after:scale-x-100',
                  isActive
                    ? 'text-foreground after:scale-x-100'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="font-jetbrains text-[0.625rem] tracking-[0.14em] uppercase opacity-65">
                  {era.range}
                </span>
                <span className="text-sm font-medium">{era.label}</span>
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
