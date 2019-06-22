import { DefaultDraftBlockRenderMap } from 'draft-js'

type BlockRenderMap = import('../../types').DraftBlockRenderMap
type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps

export const getBlockRenderMap = (
  hooks: Hook[],
  props: RegularEditorProps
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
