import {format, isFuture} from 'date-fns'

export function cn (...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes (data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs ({slug}) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture ({publishedAt}) {
  return !isFuture(publishedAt)
}

export function getBlogUrl (disableCaseStudy, externalLink, slug) {
  if (disableCaseStudy == true) {
    return externalLink
  } else {
    return `/projects/${slug.current || slug}/`
  }
}

export function buildImageObj (source = {asset: {}}) {
  const imageObj = {
    asset: {_ref: source.asset._ref || source.asset._id}
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function toPlainText (blocks) {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export function previewType (disableCaseStudy) {
  if (disableCaseStudy == true) {
    return 'Live Site'
  } else {
    return 'Case Study'
  }
}

export function displayTimeframe (timeframe) {
  if (timeframe == null) {
    return 'Ongoing project'
  } else {
    return format(timeframe, 'MMMM YYYY')
  }
}
