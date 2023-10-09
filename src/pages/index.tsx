import * as React from "react"
import { graphql, Link, type HeadFC, type PageProps } from "gatsby"
import Seo from "../components/seo/Seo"

export const Head = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  return (
    <Seo favicon={data.wpMenu?.favicon?.faviconIkonka?.sourceUrl || ''} url={data?.site?.siteMetadata?.url || ''} title={'Брихад-Мриданга | Главная'} description={'Свежие переводы фундаментальных трудов гаудия-вайшнавов на русский язык'}></Seo>)
}

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  console.log(data?.wpCategory?.wpChildren)
  return (
    <section className="container" >
      <h1 className="text-2xl font-bold mx-0 uppercase w-fit">Труды гаудия-вайшнавов на русском</h1>
      {data?.wpCategory?.wpChildren?.nodes?.sort((a,b) => a.order.poryadkovyjNomer < b.order.poryadkovyjNomer ? -1 : 1)?.map((author, index) => <div className="mt-5" key={author.id}>
        <Link className="w-fit" to={`/${author.slug}`}>
          <h2 className="text-lg font-bold uppercase  w-fit">{author.name}</h2>
        </Link>
        <ul className="list-none  mt-2">
          {author?.wpChildren?.nodes.sort((a,b) => a.order.poryadkovyjNomer < b.order.poryadkovyjNomer ? -1 : 1).map((book, index) => <li key={index}>
            <Link className="w-fit" to={`/${author.slug}/${book.slug}`}>
              <h3 className="text-md font-medium  w-fit">{book.name}</h3>
            </Link>
            <ul className="list-none pl-5">
              {book.posts?.nodes.sort((a,b) => a.date < b.date ? -1 : 1)?.map((chapter, index) => <li key={chapter.slug}>
                <Link className="text-sm mt-1" to={`/${author.slug}/${book.slug}/${chapter.slug}`}>{chapter.title}</Link>
              </li>)}
            </ul>
          </li>)}
        </ul>
      </div>)}
    </section>
  )
}

export default IndexPage

export const query = graphql`
query IndexPage {
  site {
    siteMetadata {
      url
    }
  }
  wpMenu(slug: {eq: "osnovnoe"}) {
    favicon {
      faviconIkonka {
        sourceUrl
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
}`
