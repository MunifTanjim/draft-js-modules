import { getKaTeXModule } from '@draft-js-modules/katex'
import React from 'react'
import BaseEditor from '../../src/components/BaseEditor'

const KaTeXModule = getKaTeXModule()

const modules = [KaTeXModule]

const KaTeXDemo = () => (
  <BaseEditor modules={modules} placeholder="Draft.js KaTeX Module" />
)

export default KaTeXDemo
