import { CreatePagesArgs } from "gatsby"
import path from "path"
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }: CreatePagesArgs) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql<Queries.AllBlogPostQuery>(
    `
    query AllBlogPost {
      allWpMenuItem(filter: {parentId: {eq: null}}, sort: {order: ASC}) {
        nodes {
            label
            url
            childItems {
                nodes {
                    url
                    label
                    childItems {
                        nodes {
                            url
                            label
                        }
                    }
                }
            }
        }
    }
    wpMenu(slug: {eq: "osnovnoe"}) {
      favicon {
        favikon {
          sourceUrl
        }
      }
    }
     site {
      siteMetadata {
        title
        url
      }
    }
      allFile {
        nodes {
          name
          publicURL
        }
      }
      allWpCommonSection {
        nodes {
          slug
          online {
            onlineTekst
            onlineTekstKnopki
            onlineZagolovok
          }
          cookies {
            fieldGroupName
            cookiesPolitikaKonfidenczialnosti {
              mediaItemUrl
            }
          }
          footer {
            footerAdresSajta
            footerContactsZagolovok
            footerKopirajt
            footerMenuZagolovok
            footerSocialRemarka
            footerSocialZagolovok
            footerContactsSpisok {
              footerContactsEstKommentarij
              footerContactsHref
              footerContactsKommentarij
              footerContactsTekst
            }
            
            footerLogotip {
              altText
              sourceUrl
            }
            footerLogotipMobile {
              altText
              sourceUrl
            }
            footerPolitikaKonfidenczialnosti {
              mediaItemUrl
            }
            footerPublichnayaOferta {
              mediaItemUrl
            }
            footerSocialSpisok {
              footerSocialAdres
              footerSocialTekst
              footerSocialIkonka {
                altText
                sourceUrl
              }
            }
          }
          header {
            headerAdresSajta
            headerLogotipAlt
            headerTelefon
            headerLogotip {
              altText
              sourceUrl
            }
            headerLogotipMobile {
              altText
              sourceUrl
            }
          }
         
        }
      }
        allWpBlog {
          nodes {
            slug
            blog {
              blogPostContentTekst
              blogPostHeroKratkoeOpisanie
              blogPostHeroZagolovok
              blogPostMediaTekstNadIzobrazheniem
              blogPostMediaTekstPodVideo
              blogPostHeroImageKompyuter1x {
                altText
                sourceUrl
              }
              blogPostHeroImageKompyuter2x {
                altText
                sourceUrl
              }
              blogPostHeroImageTelefon1x {
                altText
                sourceUrl
              }
              blogPostHeroImageTelefon2x {
                altText
                sourceUrl
              }
              blogPostMediaIzobrazhenieDlyaKompyuteraX1 {
                altText
                sourceUrl
              }
              blogPostMediaIzobrazhenieDlyaKompyuteraX2 {
                altText
                sourceUrl
              }
              blogPostMediaIzobrazhenieDlyaTelefonaX1 {
                altText
                sourceUrl
              }
              blogPostMediaIzobrazhenieDlyaTelefonaX2 {
                altText
                sourceUrl
              }
              blogPostMediaVideo {
                mediaItemUrl
              }
              blogPostMediaZastavkaDlyaVideoKompyuter {
                altText
                sourceUrl
              }
              blogPostMediaZastavkaDlyaVideoKompyuterKopiya {
                altText
                sourceUrl
              }
              blogPostPreviewIzobrazhenieDlyaKompyuteraX1 {
                altText
                sourceUrl
              }
              blogPostPreviewIzobrazhenieDlyaKompyuteraX2 {
                altText
                sourceUrl
              }
              blogPostPreviewIzobrazhenieDlyaTelefonaX1 {
                altText
                sourceUrl
              }
              blogPostPreviewIzobrazhenieDlyaTelefonaX2 {
                altText
                sourceUrl
              }
            }
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
  const blogPostTemplate = path.resolve(`./src/templates/blogPost.tsx`)


  result.data?.allWpBlog.nodes.forEach((node) => {
    createPage({
      path:`/blog/${node.slug}`,
      component: blogPostTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        menuItems: result.data?.allWpMenuItem.nodes,
        site: result.data?.site,
        allFiles:  result.data?.allFile?.nodes,
        slug: 'blogPost',
        commonSections: result.data?.allWpCommonSection.nodes,
        allPosts: result.data?.allWpBlog.nodes,
        post: node,
        url: process.env.BASE_URL || 'http://localhost:9000',
        favicon: result.data?.wpMenu?.favicon?.favikon?.sourceUrl
      },
    })
  })
}