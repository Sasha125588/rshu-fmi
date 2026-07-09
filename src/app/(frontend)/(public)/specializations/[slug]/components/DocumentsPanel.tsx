// import { ExternalLink, FileText } from 'lucide-react'

// import type { SpecializationDocument } from '../../../(data)/specializations'

// type DocumentsPanelProps = {
//   documents: SpecializationDocument[]
// }

// export const DocumentsPanel = ({ documents }: DocumentsPanelProps) => {
//   if (documents.length === 0) {
//     return (
//       <div className="border-border/60 bg-card/40 rounded-lg border p-6">
//         <p className="text-muted-foreground text-sm">
//           Документи для цієї освітньої програми ще готуються до публікації.
//         </p>
//       </div>
//     )
//   }

//   return (
//     <div className="grid gap-3">
//       {documents.map((document) => (
//         <a
//           key={`${document.type}-${document.year}-${document.title}`}
//           href={document.href}
//           className="border-border/60 bg-card/40 hover:border-green-primary/40 group flex items-start justify-between gap-4 rounded-lg border p-4 transition"
//         >
//           <div className="flex gap-3">
//             <FileText className="text-green-primary mt-1 size-5 shrink-0" />
//             <div>
//               <p className="font-medium">{document.title}</p>
//               <p className="text-muted-foreground mt-1 text-sm">
//                 {document.type} · {document.year}
//               </p>
//             </div>
//           </div>
//           <ExternalLink className="text-muted-foreground group-hover:text-green-primary size-4 shrink-0 transition" />
//         </a>
//       ))}
//     </div>
//   )
// }
