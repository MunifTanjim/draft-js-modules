type Hook = import('../../types').Hook
type HookProps = import('../../types').HookProps
type RegularEditorProps = import('../../types').RegularEditorProps
type StyleMap = import('../../types').StyleMap

export const getCustomStyleFn = (
  hooks: Hook[],
  props: RegularEditorProps | HookProps
): NonNullable<HookProps['customStyleFn']> => (
  styleNames: Draft.DraftInlineStyle,
  block: Draft.ContentBlock
): StyleMap => {
  const customStyleFns = [props.customStyleFn].concat(
    hooks.map(({ customStyleFn }): HookProps['customStyleFn'] => customStyleFn)
  )

  for (const customStyleFn of customStyleFns) {
    if (typeof customStyleFn === 'undefined') continue
    const returnValue = customStyleFn(styleNames, block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue as StyleMap
  }

  return {}
}
