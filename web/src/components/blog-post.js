import {format, distanceInWords, differenceInDays} from 'date-fns'
import React from 'react'
import {buildImageObj, displayTimeframe} from '../lib/helpers'
import {imageUrlFor} from '../lib/image-url'
import PortableText from './portableText'
import Container from './container'
import AuthorList from './author-list'
import Link from './variable-link'

import styles from './blog-post.module.css'

function BlogPost (props) {
  const {_rawBody, authors, categories, title, mainImage, publishedAt, externalLink, timeframe} = props
  return (
    <article className={styles.root}>
      {mainImage && mainImage.asset && (
        <div className={styles.mainImage}>
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(1200)
              .height(Math.floor((9 / 16) * 1200))
              .fit('crop')
              .auto('format')
              .url()}
            alt={mainImage.alt}
          />
        </div>
      )}
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBody && <PortableText blocks={_rawBody} />}
          </div>
          <aside className={styles.metaContent}>
            {externalLink && <Link to={externalLink}><h4>View live site</h4></Link>}
            <div className={styles.timeframe}>{displayTimeframe(timeframe)}</div>
            {authors && <AuthorList items={authors} title='Affiliation' />}
            {categories && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Focus Areas</h3>
                <ul>
                  {categories.map(category => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  )
}

export default BlogPost
