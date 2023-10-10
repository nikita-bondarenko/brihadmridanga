import { HeadFC, Link } from 'gatsby'
import React from 'react'
import Seo from '../components/seo/Seo'

type AuthorProps = {
    pageContext: {
        item: Queries.WpCategory
        favicon: string
        url: string
    }
}

export const Head = (data: AuthorProps) => {
    return (
      <Seo favicon={data?.pageContext?.favicon || ''} url={data?.pageContext?.url || ''} title={`Брихад-Мриданга | ${data?.pageContext?.item?.name}`} description={data?.pageContext?.item?.description || ''}></Seo>)
  }



export default function author(data: AuthorProps) {
    return (
        <section className="container" >
            <h1 className="text-2xl font-bold mb-7 uppercase">{data?.pageContext?.item?.name}</h1>
            <ul className="list-none">
                {data?.pageContext?.item?.wpChildren?.nodes.sort((a, b) => a.order.poryadkovyjNomer < b.order.poryadkovyjNomer ? -1 : 1).map((book, index) => <li key={index}>
                    <Link className='link-animation-opacity' to={`/${data?.pageContext?.item?.slug}/${book.slug}`}>
                        <h3 className="text-lg font-medium mb-2">{book.name}</h3>
                    </Link>
                    <ul className="list-none pl-3">
                        {book.posts?.nodes.sort((a, b) => a.date < b.date ? -1 : 1)?.map((chapter, index) => <li>
                            <Link className='text-md font-medium mb-1 link-animation-opacity' to={`/${data?.pageContext?.item?.slug}/${book.slug}/${chapter.slug}`}>{chapter.title}</Link>
                        </li>)}
                    </ul>
                </li>)}
            </ul>
        </section>

    )
}
