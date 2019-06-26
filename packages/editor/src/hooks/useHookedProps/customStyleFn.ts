type ContentBlock = import('draft-js').ContentBlock
type DraftInlineStyle = import('draft-js').DraftInlineStyle
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store
type StyleMap = import('draft-js').DraftStyleMap

export const getCustomStyleFn = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['customStyleFn']> => (
  styleNames: DraftInlineStyle,
  block: ContentBlock
): StyleMap => {
  const customStyleFns = [props.customStyleFn].concat(
    hooks.map(
      ({ customStyleFn }): EditorProps['customStyleFn'] => customStyleFn
    )
  )

  for (const customStyleFn of customStyleFns) {
    if (typeof customStyleFn === 'undefined') continue
    const returnValue = customStyleFn(store, styleNames, block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue as StyleMap
  }

  return {}
}
