import { Config } from 'bili'

const config: Config = {
  input: 'src/index.tsx',
  output: {
    format: ['esm', 'esm-min', 'umd', 'umd-min'],
    moduleName: 'DraftModules.Stats',
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
