import React from 'react'

type Props = import('../types').HashtagComponentProps

function DefaultHashtagComponent({
  decoratedText,
  offsetKey
}: Props): React.ReactElement {
  return (
    <span
      data-offset-key={offsetKey}
      className={`draft-js-hook-hashtag default-component`}
    >
      {decoratedText}
    </span>
  )
}

export default DefaultHashtagComponent
