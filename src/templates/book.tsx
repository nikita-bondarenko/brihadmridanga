import { HeadFC, Link } from 'gatsby'
import React from 'react'
import Seo from '../components/seo/Seo'
import { Breadcrumb } from '../../gatsby-node'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'

type BookProps = {
    pageContext: {
        item: Queries.WpCategory
        favicon: string
        url: string,
        breadcrumbs: Breadcrumb[]
    },
    path: string
}

export const Head = (data: BookProps) => {
    return (
        <Seo favicon={data?.pageContext?.favicon || ''} url={data?.pageContext?.url || ''} title={`Брихад-Мриданга | ${data?.pageContext?.item?.name}`} description={data?.pageContext?.item?.description || ''}></Seo>)
}

export default function book(data: BookProps) {
    return (
        <section className="container" >
            <Breadcrumbs items={data?.pageContext?.breadcrumbs}></Breadcrumbs>
            <h1 className="text-2xl font-bold mb-7 uppercase">{data?.pageContext?.item?.name}</h1>
            <ul className="list-none">
                {data?.pageContext?.item?.posts?.nodes.sort((a, b) => a.date < b.date ? -1 : 1).map((chapter, index) => <li key={index}>
                    <Link className='link-animation-opacity' to={`${data?.path}${chapter.slug}`}>
                        <h3 className="text-lg font-medium mb-2">{chapter.title}</h3>
                    </Link>
                </li>)}
            </ul>
        </section>

    )
}
