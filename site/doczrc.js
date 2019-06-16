import * as colors from './src/utils/colors'

export default {
  base: '/docs',
  files: './docs/*.{md,markdown,mdx}',
  title: 'Draft.js Hooks',
  description: 'Draft.js Hooks Documentation',
  theme: 'docz-theme-default',
  themeConfig: {
    colors: {
      primary: colors.primary
    }
  },
  menu: ['Getting Started']
}
