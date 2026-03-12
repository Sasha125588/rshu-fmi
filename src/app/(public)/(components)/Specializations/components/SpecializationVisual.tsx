import { SPECIALIZATIONS_VISUALS } from '../constants/data'
import { cn } from '@/shared/helpers'

interface Props {
  id: string
}

export const SpecializationVisual = ({ id }: Props) => {
  const visual = SPECIALIZATIONS_VISUALS[id]
  if (!visual) return null

  return (
    <div className="relative">
      <div className="from-green-primary/20 via-green-primary/5 pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0d0d14] p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="size-3 rounded-full bg-red-500/60" />
          <div className="size-3 rounded-full bg-yellow-500/60" />
          <div className="size-3 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-gray-500">{visual.label}</span>
        </div>
        <pre className="font-mono text-sm leading-relaxed">
          {visual.lines.map((line, i) => (
            <div
              key={i}
              className={cn('min-h-[1.5em]', line.color ?? 'text-gray-300')}
            >
              {line.text}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
