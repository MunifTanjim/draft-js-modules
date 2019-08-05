import theme from 'gatsby-theme-dox/src/theme'

export const colors = {
  brand: `#843131`,
  dark: `#3b3738`,
  light: `#fdf3e7`
}

export default {
  ...theme,
  colors: {
    ...theme.colors,
    ...colors
  }
}
