import { CompositeDecorator, EditorState } from 'draft-js'
import { useEffect, useMemo } from 'react'

type DraftDecorator = import('draft-js').DraftDecorator
type GetStore = import('../types').GetStore
type Hook = import('../types').Hook
type RegularEditorProps = import('../types').RegularEditorProps

export function useCompositeDecorator(
  hooks: Hook[],
  _props: RegularEditorProps,
  getStore: GetStore
): void {
  const compositeDecorator = useMemo((): Draft.CompositeDecorator => {
    const decoratorsList = hooks.reduce<DraftDecorator[]>(
      (decoratorsList, { decorators = [] }): DraftDecorator[] => {
        decoratorsList.push(...decorators)
        return decoratorsList
      },
      []
    )

    return new CompositeDecorator(decoratorsList)
  }, [hooks])

  useEffect((): void => {
    const decorator = getStore()
      .getEditorState()
      .getDecorator()

    if (decorator !== compositeDecorator) {
      getStore().setEditorState(
        (editorState): EditorState =>
          EditorState.set(editorState, { decorator: compositeDecorator })
      )
    }
  }, [compositeDecorator, getStore])
}
