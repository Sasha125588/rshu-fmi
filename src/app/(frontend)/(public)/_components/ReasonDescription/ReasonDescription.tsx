import { HomeHighlight } from '../HomeHighlight/HomeHighlight'

import type { reasons } from '../../_constants'

type Reason = (typeof reasons)[number]

export const ReasonDescription = ({ reason }: { reason: Reason }) => {
  const start = reason.description.indexOf(reason.highlight)
  if (start === -1) return reason.description

  return (
    <>
      {reason.description.slice(0, start)}
      <HomeHighlight tone={reason.highlightTone}>{reason.highlight}</HomeHighlight>
      {reason.description.slice(start + reason.highlight.length)}
    </>
  )
}
