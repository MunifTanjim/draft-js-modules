import React from 'react'
import HookedEditor from '../components/HookedEditor.js'
import Layout from '../components/layout'
import SEO from '../components/seo'

const HomePage = () => (
  <Layout>
    <SEO title="Home" />
    <HookedEditor />
  </Layout>
)

export default HomePage
