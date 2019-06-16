import React, { useEffect, useState } from 'react'
import { getCharCount, getLineCount, getWordCount } from '../utils/get-count'

type Props = import('../types').StatsViewerProps
type Stats = import('../types').Stats
type EditorState = import('draft-js').EditorState

const emptyStats = { char: 0, word: 0, line: 0 }

function getStats(editorState?: EditorState): Stats {
  return editorState
    ? {
        char: getCharCount(editorState),
        word: getWordCount(editorState),
        line: getLineCount(editorState)
      }
    : emptyStats
}

function StatsViewer({
  config: { Component },
  store
}: Props): React.ReactElement {
  const editorState = store.getEditorState ? store.getEditorState() : undefined

  const [stats, setStats] = useState<Stats>(getStats(editorState))

  useEffect((): void => {
    setStats(getStats(editorState))
  }, [editorState])

  return <Component stats={stats} />
}

export default StatsViewer
