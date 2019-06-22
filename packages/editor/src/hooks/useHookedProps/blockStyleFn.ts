type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getBlockStyleFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['blockStyleFn']> => (
  block: Draft.ContentBlock
): string => {
  const blockStyleFns = [props.blockStyleFn].concat(
    hooks.map(
      ({ blockStyleFn }): RegularEditorProps['blockStyleFn'] => blockStyleFn
    )
  )

  for (const blockStyleFn of blockStyleFns) {
    if (typeof blockStyleFn === 'undefined') continue
    const returnValue = blockStyleFn(block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue
  }

  return ''
}
