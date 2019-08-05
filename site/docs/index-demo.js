/** @jsx jsx */
import { getHashtagModule } from '@draft-js-modules/hashtag'
import { getKaTeXModule } from '@draft-js-modules/katex'
import '@draft-js-modules/katex/dist/styles.css'
import { getStatsModule } from '@draft-js-modules/stats'
import 'draft-js/dist/Draft.css'
import 'katex/dist/katex.min.css'
import { jsx } from 'theme-ui'
import BaseEditor from '../src/components/BaseEditor'

const styles = {
  Container: {
    maxWidth: '100%'
  },
  EditorWrapper: {
    border: '1px solid #ddd',
    width: '100%',
    padding: '1em',
    minHeight: '100px',
    background: '#fff',
    color: '#000'
  },
  Hashtag: {
    color: theme => theme.colors.primary,
    cursor: 'pointer'
  }
}

const HashtagModule = getHashtagModule({
  Component: ({ children }) => <span children={children} sx={styles.Hashtag} />
})
const KaTeXModule = getKaTeXModule()
const { Stats, ...StatsModule } = getStatsModule()

const modules = [HashtagModule, KaTeXModule, StatsModule]

const Bottom = () => <Stats />

function DemoEditor() {
  return (
    <BaseEditor
      Bottom={Bottom}
      modules={modules}
      placeholder="Editor for Draft.js Modules"
    />
  )
}

export default DemoEditor
