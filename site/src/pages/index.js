import React from 'react'
import DraftEditor from '../components/DraftEditor.js'
import Layout from '../components/layout'
import SEO from '../components/seo'

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <DraftEditor />
  </Layout>
)

export default HomePage
