import { DefaultDraftBlockRenderMap } from 'draft-js'

type BlockRenderMap = import('draft-js').DraftBlockRenderMap
type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module

export const getBlockRenderMap = (
  modules: Module[],
  props: EditorProps
): BlockRenderMap => {
  const blockRenderMap = modules.reduce<BlockRenderMap>(
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
