export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-blog'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5d84ef47acf0e4aef1e1f8d3',
                  title: 'Sanity Studio',
                  name: 'portfolio-sanity-studio-f99dd6yy',
                  apiId: 'd0c0f6c7-99ce-4300-8518-954aeb513e60'
                },
                {
                  buildHookId: '5d84ef47acf0e4aecfe1f8c8',
                  title: 'Blog Website',
                  name: 'portfolio-sanity-web',
                  apiId: '83ecdc8a-2328-4d5d-9738-ab57c3bdd866'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/alexanderlim9/portfolio-sanity',
            category: 'Code'
          },
          {title: 'Frontend', value: 'https://portfolio-sanity-web.netlify.com', category: 'apps'}
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent blog posts', order: '_createdAt desc', types: ['post']},
      layout: {width: 'medium'}
    }
  ]
}
