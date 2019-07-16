import React from 'react'

type Props = import('../types').HashtagComponentProps

export function HashtagComponent({
  children,
  className
}: Props): React.ReactElement {
  return <span className={className} children={children} />
}
