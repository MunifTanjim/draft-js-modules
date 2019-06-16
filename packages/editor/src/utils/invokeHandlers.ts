export function invokeHandlers(
  handlers: (((...args: any) => Draft.DraftHandleValue) | undefined)[],
  parameters: any[]
): Draft.DraftHandleValue {
  for (const handler of handlers) {
    if (typeof handler === 'undefined') continue
    const handleValue = handler(...parameters)
    if (handleValue === 'handled') return handleValue
  }

  return 'not-handled'
}
