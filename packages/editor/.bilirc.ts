import { Config } from 'bili'

const config: Config = {
  input: 'src/index.tsx',
  output: {
    format: ['esm', 'esm-min', 'umd', 'umd-min'],
    moduleName: 'DraftHooks.Editor',
    sourceMap: false
  },
  extendConfig: (config, { format }) => {
    if (/^es/.test(format)) config.output.fileName = '[name][min][ext]'
    return config
  },
  globals: {
    'draft-js': 'Draft',
    react: 'React'
  }
}

export default config
