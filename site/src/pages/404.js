/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import SEO from '../components/seo'
import { Link } from 'gatsby'

const NotFoundPage = () => (
  <Styled.root
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}
  >
    <SEO title="404: Not Found" />
    <Styled.h1>Not Found!</Styled.h1>
    <Styled.p>
      You just hit a route that doesn&#39;t exist... the sadness.
    </Styled.p>
    <Link to="/" sx={{ variant: 'styles.a' }}>
      Go Back!
    </Link>
  </Styled.root>
)

export default NotFoundPage
