export default {
  name: 'home',
  type: 'document',
  title: 'Home',
  fields: [
    {
      name: 'intro',
      type: 'text',
      title: 'Intro'
    },
    {
      name: 'introPhoto',
      type: 'mainImage',
      title: 'Intro Photo'
    },
    {
      name: 'body',
      type: 'text',
      title: 'Body'
    },
    {
      name: 'currently',
      type: 'text',
      title: 'Currently'
    },
    {
      name: 'previously',
      type: 'text',
      title: 'Previously'
    }
  ]
}
