import { CompositeDecorator, EditorState } from 'draft-js'
import { useEffect, useMemo } from 'react'

type DraftDecorator = import('draft-js').DraftDecorator
type EditorProps = import('../types').EditorProps
type GetStore = import('../types').GetStore
type Hook = import('../types').Hook

export function useCompositeDecorator(
  hooks: Hook[],
  props: EditorProps,
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

    if (props.decorators) decoratorsList.push(...props.decorators)

    return new CompositeDecorator(decoratorsList)
  }, [hooks, props.decorators])

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
