import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
    posts: allSanityPost(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

const IndexPage = props => {
  const {data, errors} = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
      .filter(filterOutDocsWithoutSlugs)
      .filter(filterOutDocsPublishedInTheFuture)
    : []

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.'
    )
  }

  return (
    <Layout>
      <SEO
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <div className='hero'>
          <h1 className='home-hero1'><b>I'm Alex.</b> I'm a creative developer, designer, and journalist telling stories through data and the web.</h1>
          <p className="home-hero2">
            I just wrapped up an apprenticeship at{" "}
            <a href="https://www.upstatement.com/" target="_blank">
              Upstatement
            </a>{" "}
            where I focused on data visualization. Before that, I’ve freelanced at{" "}
            <a href="https://www.bostonglobe.com/" target="_blank">
              The Boston Globe
            </a>{" "}
            and have worked at{" "}
            <a href="https://www.twosixlabs.com/" target="_blank">
              Two Six Labs
            </a>{" "}
            and{" "}
            <a href="https://web.northeastern.edu/scout/" target="_blank">
              Scout Studio
            </a>
            . I'm a senior at Northeastern University graduating in May 2020.
          </p>
          <p className="home-hero2">
            <b>I'm looking for a job!</b> Will you hire me?
          </p>
          <div className="contact">
            <ul>
              <li>
                <a
                  href="https://drive.google.com/file/d/1X82v2loB28Xqyb0WIS2EiOA_NMB39Xf7/view?usp=sharing"
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
        </div>
        {postNodes && (
          <BlogPostPreviewList
            title='Latest blog posts'
            nodes={postNodes}
            browseMoreHref='/archive/'
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
