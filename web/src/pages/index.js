import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewList from '../components/blog-post-preview-list'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {home_hero1, home_hero2} from '../components/typography.module.css'
import '../styles/home.css'

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
      sort: { fields: [order], order: ASC }
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
          disableCaseStudy
          externalLink
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
          <h1 className={home_hero1}><b>I'm Alex.</b> I'm a creative developer, designer, and journalist visualizing data and building narratives on the web.</h1>
          <p className={home_hero2}>
            I like trains, typography and pushing the boundaries of traditional prose journalism.
            Between the {" "}
            <a href="https://camd.northeastern.edu/research-scholarship-creative-practice/co-laboratory-for-data-impact/" target="_blank">
              Co-Lab for Data Impact
            </a>,{" "}
            <a href="https://www.upstatement.com/" target="_blank">
              Upstatement
            </a>,{" "}
            and {" "}
            <a href="https://www.twosixlabs.com/" target="_blank">
              Two Six Labs
            </a>,{" "}
            I've been learning how to bring design, data and code together to tell stories that can't be told with words alone.
            I'm a senior at Northeastern University graduating in May 2020.
          </p>
          <p className={home_hero2}>
            <b>I'm looking for a job!</b> Will you hire me?
          </p>
          <div className="contact">
            <ul>
              <li>
                <a
                  href="https://drive.google.com/file/d/1PKY7FUMfgsXd9ap8N_pCs1h9SzGwAAhj/view?usp=sharing"
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
        <div className="projects">
          <h2>Featured Projects</h2>
          {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage
