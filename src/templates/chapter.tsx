import { HeadFC, Link } from 'gatsby'
import React, { useState } from 'react'
import Seo from '../components/seo/Seo'
import { Breadcrumb } from '../../gatsby-node'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'
import book from './book'

type ChapterProps = {
    pageContext: {
        item: Queries.WpPost
        favicon: string
        url: string,
        breadcrumbs: Breadcrumb[],
        brothers: Queries.WpPost[]
    },
    path: string
}

export const Head = (data: ChapterProps) => {
    return (
        <Seo favicon={data?.pageContext?.favicon || ''} url={data?.pageContext?.url || ''} title={`${data?.pageContext?.breadcrumbs.reduce((str,item) => str + `${item.text} | `, '')}${data?.pageContext?.item?.meta?.metaDescription}`} description={data?.pageContext?.item?.meta?.metaDescription || ''}></Seo>)
}

export default function chapter(data: ChapterProps) {

    const item = data?.pageContext?.brothers?.find(item => item?.id === data?.pageContext?.item?.id)
console.log(data?.pageContext?.item?.id, data)
    if (!item) return

        const itemIndex = data?.pageContext?.brothers.indexOf(item)

        console.log(itemIndex)
    
        const chapterPrevSlug = data?.pageContext?.brothers[itemIndex - 1]?.slug
    
        const chapterNextSlug = data?.pageContext?.brothers[itemIndex + 1]?.slug

        const bookLink = data?.path?.split('/').filter(item => item?.length > 0).slice(0,-1).join('/')
    
    return (
        <section className="container" >
            <Breadcrumbs items={data?.pageContext?.breadcrumbs}></Breadcrumbs>
            <h1 className="text-2xl font-bold mb-4 uppercase">{data?.pageContext?.item?.title}</h1>
            <div className='-mx-3'>
                {data?.pageContext?.item?.post?.postMassiv?.map((item, index) => {
                    const [isOriginalShown, setIsOriginalShown] = useState(false)

                    const onClick = () => {
                        setIsOriginalShown(prev => !prev)
                    }
                    return <div onClick={onClick} className='chapter-block py-1 px-3 transition-all hover:bg-gray-200 cursor-pointer' id={`text-${index}`}>
                        {isOriginalShown ? <div>
                            <div className='mb-2' dangerouslySetInnerHTML={{ __html: item?.originalTekst || '' }} ></div>
                            {item?.blokImeetRemarki === 'true' && <div className='remark-text' dangerouslySetInnerHTML={{ __html: item?.originalRemarka || '' }}></div>}
                        </div>
                            : <div>
                                <div className='mb-2' dangerouslySetInnerHTML={{ __html: item?.translationTekst || '' }}></div>
                                {item?.blokImeetRemarki === 'true' && <div className='remark-text' dangerouslySetInnerHTML={{ __html: item?.translationRemarka || '' }}></div>}
                            </div>}
                    </div>
                }
                )}
            </div>
            <div>
               {chapterPrevSlug && <Link to={`/${bookLink}/${chapterPrevSlug}`}>Предыдущая глава</Link>}
              {chapterNextSlug &&  <Link to={`/${bookLink}/${chapterNextSlug}`}>Следующая глава</Link>}
            </div>
        </section>

    )
}
