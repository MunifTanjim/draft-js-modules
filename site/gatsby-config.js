/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: `Draft.js Modules`,
    description: `Extend Draft.js with Modules`,
    author: `Munif Tanjim`
  },
  plugins: [
    {
      resolve: `gatsby-theme-dox`,
      options: {
        basePath: `/`,
        contentPath: `docs`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `draft-js-modules`,
        short_name: `draft-js-modules`,
        start_url: `/`,
        background_color: `#fdf3e7`,
        theme_color: `#843131`,
        display: `minimal-ui`,
        icon: `static/draftjs-inverted.png`
      }
    }
  ]
}
