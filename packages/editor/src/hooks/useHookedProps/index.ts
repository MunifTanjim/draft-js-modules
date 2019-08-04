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
type Module = import('../../types').Module
type RegularEditorProps = import('draft-js').EditorProps

export function useHookedProps(
  modules: Module[],
  props: EditorProps,
  getStore: GetStore
): RegularEditorProps {
  const hookedProps = useMemo((): RegularEditorProps => {
    const store = getStore()

    return {
      ...props,
      blockRendererFn: getBlockRendererFn(modules, props, store),
      blockRenderMap: getBlockRenderMap(modules, props),
      blockStyleFn: getBlockStyleFn(modules, props, store),
      customStyleFn: getCustomStyleFn(modules, props, store),
      customStyleMap: getCustomStyleMap(modules, props),
      handleKeyCommand: getHandleKeyCommand(modules, props, store),
      handleReturn: getHandleReturn(modules, props, store),
      handleBeforeInput: getHandleBeforeInput(modules, props, store),
      handlePastedFiles: getHandlePastedFiles(modules, props, store),
      handlePastedText: getHandlePastedText(modules, props, store),
      handleDroppedFiles: getHandleDroppedFiles(modules, props, store),
      handleDrop: getHandleDrop(modules, props, store),
      keyBindingFn: getKeyBindingFn(modules, props, store)
    }
  }, [getStore, modules, props])

  return hookedProps
}
