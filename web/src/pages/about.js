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
      _rawBody(resolveReferences: {maxDepth: 5})
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
        <div className="contact">
            <ul>
              <li>
                <a
                  href="https://drive.google.com/file/d/1DtK-AqBvEWfK9PqL3Nwxq6LCIpaTYODb/view?usp=sharing"
                  target="_blank"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/alexander-lim/"
                  target="_blank"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/alexanderlim9" target="_blank">
                  Github
                </a>
              </li>
              <li>
                <a href="https://twitter.com/journalims" target="_blank">
                  Twitter
                </a>
              </li>
              <li>
                <a href="mailto:lim.a@husky.neu.edu">
                  Email
                </a>
              </li>
            </ul>
          </div>
      </Container>
    </Layout>
  )
}

export default AboutPage
