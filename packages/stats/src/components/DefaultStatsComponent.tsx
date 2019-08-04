import React from 'react'

type Props = import('../types').StatsComponentProps

function DefaultStatsComponent({ stats }: Props): React.ReactElement {
  return (
    <span className="draft-js-modules-stats default-component">
      <span className="char-stats">Chars: {stats.char} </span>
      <span className="word-stats">Words: {stats.word} </span>
      <span className="line-stats">Lines: {stats.line}</span>
    </span>
  )
}

export default DefaultStatsComponent
