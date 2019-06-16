type DraftCustomRendererObject = import('../../types').DraftCustomRendererObject
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getBlockRendererFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<Draft.EditorProps['blockRendererFn']> => (
  block: Draft.ContentBlock
): DraftCustomRendererObject | undefined => {
  const blockRendererFns = [props.blockRendererFn].concat(
    hooks.map(
      ({ blockRendererFn }): Draft.EditorProps['blockRendererFn'] =>
        blockRendererFn
    )
  )

  for (const blockRenderFn of blockRendererFns) {
    if (typeof blockRenderFn === 'undefined') continue
    const returnValue = blockRenderFn(block)
    if (typeof returnValue === 'undefined') continue
    else return returnValue
  }
}
