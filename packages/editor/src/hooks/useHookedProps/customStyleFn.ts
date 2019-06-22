type ContentBlock = import('draft-js').ContentBlock
type DraftInlineStyle = import('draft-js').DraftInlineStyle
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps
type StyleMap = import('draft-js').DraftStyleMap

export const getCustomStyleFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['customStyleFn']> => (
  styleNames: DraftInlineStyle,
  block: ContentBlock
): StyleMap => {
  const customStyleFns = [props.customStyleFn].concat(
    hooks.map(
      ({ customStyleFn }): RegularEditorProps['customStyleFn'] => customStyleFn
    )
  )

  for (const customStyleFn of customStyleFns) {
    if (typeof customStyleFn === 'undefined') continue
    const returnValue = customStyleFn(styleNames, block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue as StyleMap
  }

  return {}
}
