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

type GetStore = import('../../types').GetStore
type Hook = import('../../types').Hook
type HookProps = import('../../types').HookProps
type RegularEditorProps = import('../../types').RegularEditorProps

export function useHookedProps(
  hooks: Hook[],
  props: RegularEditorProps,
  getStore: GetStore
): HookProps {
  const hookedProps = useMemo(
    (): HookProps => ({
      blockRendererFn: getBlockRendererFn(hooks, props),
      blockRenderMap: getBlockRenderMap(hooks, props),
      blockStyleFn: getBlockStyleFn(hooks, props),
      customStyleMap: getCustomStyleMap(hooks, props),
      customStyleFn: getCustomStyleFn(hooks, props),
      handleKeyCommand: getHandleKeyCommand(hooks, props, getStore),
      handleReturn: getHandleReturn(hooks, props),
      handleBeforeInput: getHandleBeforeInput(hooks, props),
      handlePastedFiles: getHandlePastedFiles(hooks, props),
      handlePastedText: getHandlePastedText(hooks, props),
      handleDroppedFiles: getHandleDroppedFiles(hooks, props),
      handleDrop: getHandleDrop(hooks, props),
      keyBindingFn: getKeyBindingFn(hooks, props)
    }),
    [getStore, hooks, props]
  )

  return hookedProps
}
