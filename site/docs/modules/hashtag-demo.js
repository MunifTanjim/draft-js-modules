import { getHashtagModule } from '@draft-js-modules/hashtag'
import React from 'react'
import BaseEditor from '../../src/components/BaseEditor'

const HashtagModule = getHashtagModule({
  Component: ({ children, style }) => <span style={style}>{children}</span>,
  props: { style: { color: 'rebeccapurple', cursor: 'pointer' } }
})

const modules = [HashtagModule]

const HashtagDemo = () => (
  <BaseEditor modules={modules} placeholder="Draft.js Hashtag Module" />
)

export default HashtagDemo
