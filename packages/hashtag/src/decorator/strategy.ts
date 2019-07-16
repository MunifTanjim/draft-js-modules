import { extractHashtags } from '../utils/extractHashtags'

type ContentBlock = import('draft-js').ContentBlock

export const hashtagStrategy = (
  contentBlock: ContentBlock,
  callback: Function
): void => {
  const plaintext = contentBlock.getText()
  const hashtags = extractHashtags(plaintext)

  hashtags.forEach(({ position: [startPos, endPos] }): void => {
    callback(startPos, endPos)
  })
}
