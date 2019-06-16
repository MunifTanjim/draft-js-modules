import { graphql, navigate, useStaticQuery } from 'gatsby'
import React from 'react'
import { Box, Button, Flex, Heading } from 'rebass'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../utils/theme'
import { Link } from '@reach/router'

const Header = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.colors.light};
  background: ${p => p.theme.colors.primary};
`

const HeaderText = styled(Heading)`
  color: ${p => p.theme.colors.light};
`

const Container = styled(Box)`
  max-width: 720px;
  margin: 0 auto;
`

const Footer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${p => p.theme.colors.light};
  background: ${p => p.theme.colors.dark};

  a {
    font-style: italic;
    color: ${p => p.theme.colors.light};
  }
`

function Layout({ children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Header as="header" py={5} mb={5}>
          <HeaderText fontSize={[6, 7]} onClick={() => navigate('/')}>
            {site.siteMetadata.title}
          </HeaderText>
          <HeaderText fontWeight={400}>
            {site.siteMetadata.description}
          </HeaderText>
          <Flex pt={4}>
            <Button variant="inverted" as={Link} to="docs">
              Docs
            </Button>
          </Flex>
        </Header>
        <Container>
          <main>{children}</main>
        </Container>
        <Footer as="footer" py={5} mt={5}>
          <span>
            © {new Date().getFullYear()} Munif Tanjim
            <br />
            Built with{' '}
            <a color="red" href="https://www.gatsbyjs.org">
              Gatsby
            </a>
          </span>
        </Footer>
      </React.Fragment>
    </ThemeProvider>
  )
}

export default Layout
