import { useMemo } from 'react'
import { getBlockRendererFn } from './blockRendererFn'
import { getBlockRenderMap } from './blockRenderMap'
import { getBlockStyleFn } from './blockStyleFn'
import { getCustomStyleFn } from './customStyleFn'
import { getCustomStyleMap } from './customStyleMap'
import { getHandleBeforeInput } from './handleBeforeInput'
import { getHandleDrop } from './handleDrop'
import { getHandleDroppedFiles } from './handleDroppedFiles'
import { getHandleKeyCommand } from './handleKeyCommand'
import { getHandlePastedFiles } from './handlePastedFiles'
import { getHandlePastedText } from './handlePastedText'
import { getHandleReturn } from './handleReturn'
import { getKeyBindingFn } from './keyBindingFn'

type EditorProps = import('../../types').EditorProps
type GetStore = import('../../types').GetStore
type Hook = import('../../types').Hook
type RegularEditorProps = import('draft-js').EditorProps

export function useHookedProps(
  hooks: Hook[],
  props: EditorProps,
  getStore: GetStore
): RegularEditorProps {
  const hookedProps = useMemo((): RegularEditorProps => {
    const store = getStore()

    return {
      ...props,
      blockRendererFn: getBlockRendererFn(hooks, props, store),
      blockRenderMap: getBlockRenderMap(hooks, props),
      blockStyleFn: getBlockStyleFn(hooks, props, store),
      customStyleFn: getCustomStyleFn(hooks, props, store),
      customStyleMap: getCustomStyleMap(hooks, props),
      handleKeyCommand: getHandleKeyCommand(hooks, props, store),
      handleReturn: getHandleReturn(hooks, props, store),
      handleBeforeInput: getHandleBeforeInput(hooks, props, store),
      handlePastedFiles: getHandlePastedFiles(hooks, props, store),
      handlePastedText: getHandlePastedText(hooks, props, store),
      handleDroppedFiles: getHandleDroppedFiles(hooks, props, store),
      handleDrop: getHandleDrop(hooks, props, store),
      keyBindingFn: getKeyBindingFn(hooks, props, store)
    }
  }, [getStore, hooks, props])

  return hookedProps
}
