import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  output: {
    format: ['esm', 'esm-min', 'umd', 'umd-min'],
    moduleName: 'DraftHooks.Hashtag',
    sourceMap: false
  },
  extendConfig: (config, { format }) => {
    if (/^es/.test(format)) config.output.fileName = '[name][min][ext]'
    return config
  },
  globals: {
    react: 'React'
  }
}

export default config
