import React, { useCallback, useEffect, useRef, useState } from 'react'

type TeXState = import('./InlineTeX').TeXState
type Position = {
  start: number
  end: number
}

type TeXInputProps = {
  save: (after?: number) => void
  state: TeXState
  setState: (state: Partial<TeXState>) => void
  getCaretPos: () => number
}

const endDelimiter: { [startDelimiter: string]: string } = {
  '{': '}',
  '(': ')',
  '[': ']',
  '|': '|'
}

function indent(
  { text, start, end }: { text: string } & Position,
  unindent: boolean = false
): { text: string } & Position {
  const nl0 = text.slice(0, start).split('\n').length - 1
  const nl1 = nl0 + (text.slice(start, end).split('\n').length - 1)

  let newStart = start
  let newEnd = end

  const newText = text
    .split('\n')
    .map((line, index): string => {
      if (index < nl0 || index > nl1) {
        return line
      }

      if (!unindent) {
        if (index === nl0) {
          newStart += 2
        }
        newEnd += 2
        return `  ${line}`
      }

      if (line.startsWith('  ')) {
        if (index === nl0) {
          newStart -= 2
        }
        newEnd -= 2
        return line.slice(2)
      }

      if (line.startsWith(' ')) {
        if (index === nl0) {
          newStart -= 1
        }
        newEnd -= 1
        return line.slice(1)
      }

      return line
    })
    .join('\n')

  return { text: newText, start: newStart, end: newEnd }
}

function TeXInput({
  save,
  state,
  setState,
  getCaretPos
}: TeXInputProps): React.ReactElement | null {
  const teXInput = useRef<HTMLTextAreaElement>(null)

  const [pos, setPos] = useState(
    (): Position => {
      const _pos = getCaretPos()
      return { start: _pos, end: _pos }
    }
  )

  const onChange = useCallback((): void => {
    setState({ tex: teXInput.current!.value })
  }, [setState])

  const onSelect = useCallback((): void => {
    const { selectionStart: start, selectionEnd: end } = teXInput.current!
    setPos({ start, end })
  }, [])

  const insertGroupDelimiter = useCallback(
    (startDelimiter: string): void => {
      let value = state.tex
      let { start, end } = pos

      value = `${value.slice(0, start)}${startDelimiter}${
        start !== end ? value.slice(start, end) : ''
      }${endDelimiter[startDelimiter]}${value.slice(end)}`

      start = end + 1
      if (start < 0) {
        start = 0
      } else if (start > value.length) {
        start = value.length
      }
      end = start

      setState({ tex: value })
      setTimeout((): void => setPos({ start, end }), 0)
    },
    [pos, setState, state.tex]
  )

  const onBlur = useCallback((): void => save(), [save])

  const handleKey = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      const key = event.key

      const { start, end } = pos
      const { tex, type } = state

      const isCollapsed = start === end
      const isInline = type === 'INLINETEX'

      if (key === '$') {
        if (isInline) {
          event.preventDefault()
        }
        return
      }

      if (key === 'Escape') {
        event.preventDefault()
        save(1)
        return
      }

      if (key === 'ArrowLeft') {
        const atBegin = isCollapsed && end === 0
        if (atBegin) {
          event.preventDefault()
          save(0)
        }
        return
      }

      if (key === 'ArrowRight') {
        const atEnd = isCollapsed && start === tex.length
        if (atEnd) {
          event.preventDefault()
          save(1)
        }
        return
      }

      if (endDelimiter.hasOwnProperty(key)) {
        event.preventDefault()
        insertGroupDelimiter(key)
        return
      }

      if (key === 'Tab') {
        const lines = tex.split('\n')

        if (isInline || lines.length <= 1) {
          event.preventDefault()
          save(event.shiftKey ? 0 : 1)
          return
        }

        const { text, start: newStart, end: newEnd } = indent(
          { text: tex, start, end },
          event.shiftKey
        )
        event.preventDefault()
        setState({ tex: text })
        setTimeout((): void => setPos({ start: newStart, end: newEnd }), 0)
      }
    },
    [save, insertGroupDelimiter, pos, setState, state]
  )

  useEffect((): void => {
    setTimeout((): void => teXInput.current!.focus(), 0)
  }, [])

  useEffect((): void => {
    const { start, end } = pos
    teXInput.current!.setSelectionRange(start, end)
  }, [pos])

  const teXArray = state.tex.split('\n')
  const rows = teXArray.length
  const cols = Math.max(1, ...teXArray.map((row): number => row.length)) + 1

  return (
    <textarea
      ref={teXInput}
      rows={rows}
      cols={cols}
      value={state.tex}
      onBlur={onBlur}
      onChange={onChange}
      onSelect={onSelect}
      onKeyDown={handleKey}
    />
  )
}

export default TeXInput
