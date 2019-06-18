/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: `Draft.js Hooks`,
    description: `Extend Draft.js with Hooks`,
    author: `Munif Tanjim`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `draft-js-hooks`,
        short_name: `draft-js-hooks`,
        start_url: `/`,
        background_color: `#fdf3e7`,
        theme_color: `#843131`,
        display: `minimal-ui`,
        icon: `static/draftjs-inverted.png`
      }
    }
  ]
}
