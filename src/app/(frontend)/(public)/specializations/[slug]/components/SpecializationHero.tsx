// import { ArrowUpRight, FileText, GraduationCap } from 'lucide-react'
// import Link from 'next/link'

// import { Badge } from '@/components/ui/badge'

// import type { Department } from '../../../(data)/departments'
// import type { Specialization } from '../../../(data)/specializations'

// type SpecializationHeroProps = {
//   specialization: Specialization
//   department?: Department
// }

// export const SpecializationHero = ({ specialization, department }: SpecializationHeroProps) => (
//   <section className="relative overflow-hidden rounded-xl border border-white/10 bg-black px-5 py-10 text-white md:px-8 md:py-14">
//     <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:36px_36px] opacity-25" />
//     <div className="relative max-w-4xl">
//       <div className="mb-6 flex flex-wrap gap-2">
//         <Badge className="border-white/15 bg-white/10 text-white">{specialization.level}</Badge>
//         <Badge className="border-white/15 bg-white/10 text-white">Код {specialization.code}</Badge>
//         {department ? (
//           <Badge className="border-green-primary/40 bg-green-primary/15 text-green-primary">
//             {department.shortName}
//           </Badge>
//         ) : null}
//       </div>
//       <p className="font-mono text-sm tracking-[0.28em] text-white/55 uppercase">
//         Освітня програма
//       </p>
//       <h1 className="mt-4 max-w-3xl text-5xl font-black tracking-tight text-balance md:text-7xl">
//         {specialization.title}
//       </h1>
//       <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">{specialization.promise}</p>
//       <div className="mt-8 flex flex-col gap-3 sm:flex-row">
//         <Link
//           href="https://www.rshu.edu.ua/pryimalna-komisiia"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/85"
//         >
//           <GraduationCap className="size-4" />
//           Вступнику
//           <ArrowUpRight className="size-4" />
//         </Link>
//         <a
//           href="#documents"
//           className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
//         >
//           <FileText className="size-4" />
//           Документи ОП
//         </a>
//       </div>
//     </div>
//   </section>
// )
