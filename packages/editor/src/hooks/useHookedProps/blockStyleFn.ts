type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getBlockStyleFn = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['blockStyleFn']> => (
  block: Draft.ContentBlock
): string => {
  const blockStyleFns = [props.blockStyleFn].concat(
    hooks.map(({ blockStyleFn }): EditorProps['blockStyleFn'] => blockStyleFn)
  )

  for (const blockStyleFn of blockStyleFns) {
    if (typeof blockStyleFn === 'undefined') continue
    const returnValue = blockStyleFn(store, block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue
  }

  return ''
}
