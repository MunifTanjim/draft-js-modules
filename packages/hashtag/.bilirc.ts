import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  output: {
    moduleName: 'DraftHooks.Hashtag',
    sourceMap: false
  },
  globals: {
    react: 'React'
  }
}

export default config
