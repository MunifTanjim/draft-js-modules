import * as katex from 'katex'
import React, { useMemo } from 'react'

type TeXState = import('./types').TeXState
type TeXType = import('../types').TeXType

type TeXProps = {
  [prop: string]: any
  state: TeXState
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onError?: (err: any, html: string) => void
}

const componentMap: { [key in TeXType]: string } = {
  INLINETEX: 'span',
  TEXBLOCK: 'div'
}

function TeX({
  state,
  onClick,
  onError,
  ...props
}: TeXProps): React.ReactElement {
  const { tex, type } = state

  const Component = useMemo(
    (): 'div' | 'span' => componentMap[type] as 'div' | 'span',
    [type]
  )
  const displayMode = useMemo((): boolean => type === 'TEXBLOCK', [type])

  const __html = useMemo((): string => {
    let html = ''

    try {
      html = katex.renderToString(tex, {
        displayMode,
        throwOnError: typeof onError === 'function'
      })
    } catch (err) {
      html = katex.renderToString(tex, { displayMode, throwOnError: false })
      onError!(err, html)
    }

    return html
  }, [displayMode, onError, tex])

  return (
    <Component
      className="TeX"
      contentEditable={false}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html }}
      {...props}
    />
  )
}

export default TeX
