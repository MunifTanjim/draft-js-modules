type DraftCustomRendererObject = import('../../types').DraftCustomRendererObject
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps
type Store = import('../../types').Store

export const getBlockRendererFn = (
  hooks: Hook[],
  props: EditorProps,
  store: Store
): NonNullable<RegularEditorProps['blockRendererFn']> => (
  ...parameters
): DraftCustomRendererObject | undefined => {
  const blockRendererFns = [props.blockRendererFn].concat(
    hooks.map(
      ({ blockRendererFn }): EditorProps['blockRendererFn'] => blockRendererFn
    )
  )

  for (const blockRenderFn of blockRendererFns) {
    if (typeof blockRenderFn === 'undefined') continue
    const returnValue = blockRenderFn(store, ...parameters)
    if (typeof returnValue === 'undefined') continue
    else return returnValue
  }
}
