type Hook = import('../../types').Hook
type EditorProps = import('../../types').EditorProps
type StyleMap = import('draft-js').DraftStyleMap

function mergeStyleMap(
  styleMap: StyleMap,
  additionalStyleMap: StyleMap
): StyleMap {
  return {
    ...styleMap,
    ...Object.keys(additionalStyleMap).reduce(
      (mergedStyleMap: StyleMap, styleName: string): StyleMap => {
        mergedStyleMap[styleName] = Object.assign(
          {},
          styleMap[styleName] || {},
          additionalStyleMap[styleName]
        )
        return mergedStyleMap
      },
      {}
    )
  }
}

export const getCustomStyleMap = (
  hooks: Hook[],
  props: EditorProps
): StyleMap => {
  const customStyleMap = hooks.reduce<StyleMap>(
    (extendedCustomStyleMap: StyleMap, { customStyleMap }): StyleMap => {
      return customStyleMap
        ? mergeStyleMap(extendedCustomStyleMap, customStyleMap)
        : extendedCustomStyleMap
    },
    props.customStyleMap || {}
  )

  return customStyleMap
}
