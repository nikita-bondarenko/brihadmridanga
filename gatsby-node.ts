import { CreatePagesArgs } from "gatsby"
import path from "path"

export type Breadcrumb = {
    text: string,
    to: string
}

exports.createPages = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
    const { createPage } = actions

    const result = await graphql<Queries.TemplatePageQuery>(
        `
    query TemplatePage {
        allWpCategory {
            nodes {
              id
              posts {
                nodes {
                  slug
                  date
                  id
                }
              }
            }
          }
        wpCategory(slug: {eq: "avtory"}) {
            wpChildren {
              nodes {
                name
                slug
                id
                wpChildren {
                  nodes {
                    id
                    name
                    slug
                    posts {
                      nodes {
                        slug
                        title
                        id
                        date(formatString: "")
                        meta {
                          metaTitle
                          metaDescription
                        }
                        post {
                            postMassiv {
                              blokImeetRemarki
                              originalRemarka
                              originalTekst
                              translationRemarka
                              translationTekst
                            }
                          }
                      }
                    }
                    description
                    order {
                      poryadkovyjNomer
                    }
                  }
                }
                description
                order {
                  poryadkovyjNomer
                }
              }
            }
            id
          }
        wpMenu(slug: {eq: "osnovnoe"}) {
            favicon {
              faviconIkonka {
                sourceUrl
              }
            }
          }
          site {
            siteMetadata {
              url
            }
          }
      }
    `
    )

    // Handle errors
    if (result.errors || !result) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }

    // Create pages for each markdown file.
    const bookTemplate = path.resolve(`./src/templates/book.tsx`)
    const chapterTemplate = path.resolve(`./src/templates/chapter.tsx`)
    const authorTemplate = path.resolve(`./src/templates/author.tsx`)



    result.data?.wpCategory?.wpChildren?.nodes.forEach((node) => {
        createPage({
            path: `/${node.slug}`,
            component: authorTemplate,
            context: {
                item: node,
                favicon: result?.data?.wpMenu?.favicon?.faviconIkonka?.sourceUrl,
                url: result?.data?.site?.siteMetadata?.url
            }
        })

        node?.wpChildren?.nodes?.forEach((book) => {

            const breadcrumbs : Breadcrumb[] = [{text: node.name || '', to: `/${node.slug}`}]
            createPage({
                path: `/${node.slug}/${book?.slug}/`,
                component: bookTemplate,
                context: {
                    item: book,
                    favicon: result?.data?.wpMenu?.favicon?.faviconIkonka?.sourceUrl,
                    url: result?.data?.site?.siteMetadata?.url,
                    breadcrumbs
                }
            })

            book.posts?.nodes?.forEach(chapter => {

                const breadcrumbs : Breadcrumb[] = [{text: node.name || '', to: `/${node.slug}`}, {text: book.name || '', to: `/${node.slug}/${book?.slug}/`}]

                const currentBook = result.data?.allWpCategory?.nodes?.find(item => item.id === book.id)

                createPage({
                    path: `/${node.slug}/${book?.slug}/${chapter.slug}`,
                    component: chapterTemplate,
                    context: {
                        item: chapter,
                        favicon: result?.data?.wpMenu?.favicon?.faviconIkonka?.sourceUrl,
                        url: result?.data?.site?.siteMetadata?.url,
                        breadcrumbs,
                        brothers: currentBook?.posts?.nodes?.sort((a,b) => a.date < b.date ? -1 : 1)
                    }
                })
            })
        })

    
    })


}