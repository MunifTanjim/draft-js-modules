import TeXBlock from '../components/TeXBlock'

type BlockRendererFn = import('../types').KaTeXHook['blockRendererFn']
type Internals = import('../types').Internals

export const getBlockRendererFn = (internals: Internals): BlockRendererFn => (
  store,
  block
): ReturnType<BlockRendererFn> => {
  const isAtomic = block.getType() === 'atomic'
  const isTexBlock = block.getData().get('type') === 'TEXBLOCK'

  if (isAtomic && isTexBlock) {
    return {
      component: TeXBlock,
      editable: false,
      props: { store, internals }
    }
  }
}
