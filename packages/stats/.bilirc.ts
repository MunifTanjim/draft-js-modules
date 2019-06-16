import { Config } from 'bili'

const config: Config = {
  input: 'src/index.tsx',
  output: {
    moduleName: 'DraftHooks.Stats',
    sourceMap: false
  },
  globals: {
    react: 'React'
  }
}

export default config
