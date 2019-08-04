import { CompositeDecorator, EditorState } from 'draft-js'
import { useEffect, useMemo } from 'react'

type DraftDecorator = import('draft-js').DraftDecorator
type EditorProps = import('../types').EditorProps
type GetStore = import('../types').GetStore
type Module = import('../types').Module

export function useCompositeDecorator(
  modules: Module[],
  props: EditorProps,
  getStore: GetStore
): void {
  const compositeDecorator = useMemo((): Draft.CompositeDecorator => {
    const decoratorsList = modules.reduce<DraftDecorator[]>(
      (decoratorsList, { decorators = [] }): DraftDecorator[] => {
        decoratorsList.push(...decorators)
        return decoratorsList
      },
      []
    )

    if (props.decorators) decoratorsList.push(...props.decorators)

    return new CompositeDecorator(decoratorsList)
  }, [modules, props.decorators])

  useEffect((): void => {
    const store = getStore()
    const editorState = store.getEditorState()
    const decorator = editorState.getDecorator()

    if (decorator !== compositeDecorator) {
      store.setEditorState(
        EditorState.set(editorState, { decorator: compositeDecorator })
      )
    }
  }, [compositeDecorator, getStore])
}
