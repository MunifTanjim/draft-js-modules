type EditorProps = import('../../types').EditorProps
type Module = import('../../types').Module
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
  modules: Module[],
  props: EditorProps
): StyleMap => {
  const customStyleMap = modules.reduce<StyleMap>(
    (extendedCustomStyleMap: StyleMap, { customStyleMap }): StyleMap => {
      return customStyleMap
        ? mergeStyleMap(extendedCustomStyleMap, customStyleMap)
        : extendedCustomStyleMap
    },
    props.customStyleMap || {}
  )

  return customStyleMap
}
