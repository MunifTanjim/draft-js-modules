type EditorState = import('draft-js').EditorState

/**
 * Source: https://github.com/bestiejs/punycode.js/blob/9aeca525bba478206c6e1b5501e063f3db7bda7f/punycode.js#L88-L123
 *
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 * @see `punycode.ucs2.encode`
 * @see <https://mathiasbynens.be/notes/javascript-encoding>
 * @memberOf punycode.ucs2
 * @name decode
 * @param {String} string The Unicode input string (UCS-2).
 * @returns {Array} The new array of code points.
 */
function ucs2decode(string: string): number[] {
  const output = []
  let counter = 0
  const length = string.length
  while (counter < length) {
    const value = string.charCodeAt(counter++)
    if (value >= 0xd800 && value <= 0xdbff && counter < length) {
      // It's a high surrogate, and there is a next character.
      const extra = string.charCodeAt(counter++)
      // eslint-disable-next-line eqeqeq
      if ((extra & 0xfc00) == 0xdc00) {
        // Low surrogate.
        output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000)
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        output.push(value)
        counter--
      }
    } else {
      output.push(value)
    }
  }
  return output
}

// handle unicode characters
const decodeUnicode = (str: string): number[] => ucs2decode(str)

// new-line | carriage-return | line-feed
const breakRegex = /(?:\r\n|\r|\n)/g

function getCleanString(editorState: EditorState): string {
  const plainText = editorState.getCurrentContent().getPlainText('')
  const cleanString = plainText.replace(breakRegex, '').trim()

  return cleanString
}

export function getCharCount(editorState: EditorState): number {
  const cleanString = getCleanString(editorState)

  return decodeUnicode(cleanString).length
}

export function getWordCount(editorState: EditorState): number {
  const cleanString = getCleanString(editorState)

  // matches group of characters seperated by whitespace
  const wordArray = cleanString.match(/\S+/g)

  return wordArray ? wordArray.length : 0
}

export function getLineCount(editorState: EditorState): number {
  const blockArray = editorState.getCurrentContent().getBlocksAsArray()
  return blockArray.length
}
