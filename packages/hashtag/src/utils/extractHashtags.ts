import regexes from './hashtagRegex'

type Hashtag = { text: string; position: [number, number] }

export function extractHashtags(plaintext: string): Hashtag[] {
  const hashtagPositions: Hashtag[] = []

  if (!plaintext || !plaintext.match(regexes.hashSigns)) {
    return hashtagPositions
  }

  // TODO: replace String.prototype.replace with something more appropriate?
  plaintext.replace(
    regexes.validHashtag,
    (match, before, _hash, hashText, offset, chunk): any => {
      const after = chunk.slice(offset + match.length)

      if (!after.match(regexes.endHashtagMatch)) {
        const startPos = offset + before.length
        const endPos = startPos + hashText.length + 1

        hashtagPositions.push({
          text: hashText,
          position: [startPos, endPos]
        })
      }
    }
  )

  return hashtagPositions
}
