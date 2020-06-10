import React from 'react'
import {graphql} from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../lib/helpers'
import BlogPostPreviewGrid from '../components/blog-post-preview-grid'
import Container from '../components/container'
import GraphQLErrorList from '../components/graphql-error-list'
import SEO from '../components/seo'
import Layout from '../containers/layout'

import {faTwitter, faLinkedinIn, faGithub} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
    site: sanitySiteSettings(_id: {regex: "/(drafts.|)siteSettings/"}) {
      title
      description
      keywords
    }
    home: sanityHome {
      introPhoto {
        asset {
          url
        }
      }
      body
      currently
      intro
      previously
    }
    posts: allSanityPost(
      sort: {fields: [order], order: ASC}
      filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}}
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
  const homeNodes = (data || {}).home

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
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container className='grid-container'>
        <div className='hero'>
          <div className='heroLeft'>
            <h1 className='intro'>{homeNodes.intro}</h1>
            <p className='body'>{homeNodes.body}</p>
          </div>
          <div className='heroRight'>
            <img className='intro-photo' src={homeNodes.introPhoto.asset.url} />
          </div>
        </div>
        <div className='hero-sub'>
          <div className='cta'>
            <button>
              <a href='mailto:lim.a@northeastern.edu'>Get in touch</a>
            </button>
            <button>
              <a
                href='https://drive.google.com/file/d/162gMyfNwhVtobQYZltWFZCI3d8pRzeGP/view?usp=sharing'
                target='_blank'
              >
                View resume
              </a>
            </button>
            <div className='social'>
            <ul>
              <li>
                <a href='https://twitter.com/journalims' target='_blank'>
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
              </li>
              <li>
                <a href='https://www.linkedin.com/in/alexander-lim/' target='_blank'>
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
              </li>
              <li>
                <a href='https://github.com/alexanderlim9' target='_blank'>
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </li>
            </ul>
          </div>
          </div>
         
          <div className='currently'>
            <b>Currently</b> <br />
            {homeNodes.currently}
          </div>
          <div className='previously'>
            <b>Previously</b> <br />
            <a href="https://camd.northeastern.edu/research-scholarship-creative-practice/co-laboratory-for-data-impact/#:~:text=Co%2DLab%20for%20Data%20Impact,diversity%2C%20transparency%2C%20and%20sustainability." target="_blank">Co-Lab for Data Impact</a> <br />
            <a href="https://www.upstatement.com/" target="_blank">Upstatement</a> <br />
            <a href="https://www.twosixlabs.com/" target="_blank">Two Six Labs</a> <br />
            <a href="https://web.northeastern.edu/scout/" target="_blank">Scout Studio</a> <br />
            <a href="https://www.libertymutual.com/" target="_blank">Liberty Mutual</a>
            {/* {homeNodes.previously} */}
          </div>
        </div>
        <div className='projects'>
          <h2>Selected Work</h2>
          {postNodes && postNodes.length > 0 && <BlogPostPreviewGrid nodes={postNodes} />}
        </div>
      </Container>
    </Layout>
  )
}

export default IndexPage
