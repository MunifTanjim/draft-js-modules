type ContentBlock = import('draft-js').ContentBlock
type DraftCustomRendererObject = import('../../types').DraftCustomRendererObject
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getBlockRendererFn = (
  hooks: Hook[],
  props: RegularEditorProps
): NonNullable<RegularEditorProps['blockRendererFn']> => (
  block: ContentBlock
): DraftCustomRendererObject | undefined => {
  const blockRendererFns = [props.blockRendererFn].concat(
    hooks.map(
      ({ blockRendererFn }): RegularEditorProps['blockRendererFn'] =>
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
