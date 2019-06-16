type Hook = import('../../types').Hook
type RegularEditorProps = import('../../types').RegularEditorProps
type StyleMap = import('../../types').StyleMap

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
  props: RegularEditorProps
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
