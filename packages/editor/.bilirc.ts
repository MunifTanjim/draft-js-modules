import { Config } from 'bili'

const config: Config = {
  input: 'src/index.tsx',
  output: {
    moduleName: 'DraftHooks.Editor',
    sourceMap: false
  },
  globals: {
    'draft-js': 'Draft',
    react: 'React'
  }
}

export default config
