import { DefaultDraftBlockRenderMap } from 'draft-js'

type BlockRenderMap = import('draft-js').DraftBlockRenderMap
type EditorProps = import('../../types').EditorProps
type Hook = import('../../types').Hook

export const getBlockRenderMap = (
  hooks: Hook[],
  props: EditorProps
): BlockRenderMap => {
  const blockRenderMap = hooks.reduce<BlockRenderMap>(
    (extendedBlockRenderMap, { blockRenderMap }): BlockRenderMap => {
      return blockRenderMap
        ? extendedBlockRenderMap.merge(blockRenderMap)
        : extendedBlockRenderMap
    },
    props.blockRenderMap
      ? DefaultDraftBlockRenderMap.merge(props.blockRenderMap)
      : DefaultDraftBlockRenderMap
  )

  return blockRenderMap
}
