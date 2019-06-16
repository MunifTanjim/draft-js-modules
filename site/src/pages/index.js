import { graphql } from 'gatsby'
import React from 'react'
import { Box } from 'rebass'
import HookedEditor from '../components/HookedEditor.js'
import Layout from '../components/layout'
import SEO from '../components/seo'

function Home({ data, location }) {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <SEO />
      <Box px={3}>
        <HookedEditor />
      </Box>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
