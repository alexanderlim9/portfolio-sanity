import React from 'react'
import {graphql} from 'gatsby'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'
import PortableText from '../components/portableText'

import {responsiveTitle1} from '../components/typography.module.css'

export const query = graphql`
  query AboutPageQuery {
    sanityAbout(slug: {current: {eq: "about"}}) {
      title
      _rawBody
    }
  }
`

const AboutPage = props => {
  const {data, errors} = props
  const {_rawBody, title} = data.sanityAbout

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title='About' />
      <Container>
        <h1 className={responsiveTitle1}>{title}</h1>
        {_rawBody && <PortableText blocks={_rawBody} />}
      </Container>
    </Layout>
  )
}

export default AboutPage
