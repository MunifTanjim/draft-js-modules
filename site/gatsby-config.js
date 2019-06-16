/* eslint-disable @typescript-eslint/camelcase */

module.exports = {
  siteMetadata: {
    title: `Draft.js Hooks`,
    author: `Munif Tanjim`,
    description: `Extend Draft.js Editor with Hooks`
  },
  __experimentalThemes: [
    {
      resolve: 'gatsby-theme-docz'
    }
  ],
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Draft.js Hooks`,
        short_name: `draft-js-hooks`,
        start_url: `/draft-js-hooks`,
        background_color: `#3B3738`,
        theme_color: `#843131`,
        display: `minimal-ui`,
        icon: `static/draftjs-logo.png`
      }
    }
  ]
}
