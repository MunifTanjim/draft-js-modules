import React from 'react'

type Props = import('../types').HashtagComponentProps

function DefaultHashtagComponent({
  children,
  offsetKey
}: Props): React.ReactElement {
  return (
    <span
      data-offset-key={offsetKey}
      className={`draft-js-hook-hashtag default-component`}
    >
      {children}
    </span>
  )
}

export default DefaultHashtagComponent
