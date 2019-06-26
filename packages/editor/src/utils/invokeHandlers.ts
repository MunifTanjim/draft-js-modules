type DraftHandleValue = import('draft-js').DraftHandleValue
type Store = import('../types').Store

type Handler = (...args: any) => DraftHandleValue

export function invokeHandlers(
  handlers: (Handler | undefined)[],
  parameters: any[],
  store: Store
): Draft.DraftHandleValue {
  for (const handler of handlers) {
    if (typeof handler === 'undefined') continue
    const handleValue = handler(store, ...parameters)
    if (handleValue === 'handled') return handleValue
  }

  return 'not-handled'
}
