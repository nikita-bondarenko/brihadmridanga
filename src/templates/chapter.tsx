import { HeadFC, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Seo from '../components/seo/Seo'
import { Breadcrumb } from '../../gatsby-node'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'
import book from './book'
import FixedLayer from '../components/fixedlayer/FixedLayer'
import Modal from '../components/modal/Modal'

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
        <Seo favicon={data?.pageContext?.favicon || ''} url={data?.pageContext?.url || ''} title={`${data?.pageContext?.breadcrumbs.reduce((str, item) => str + `${item.text} | `, '')}${data?.pageContext?.item?.meta?.metaDescription}`} description={data?.pageContext?.item?.meta?.metaDescription || ''}></Seo>)
}

export default function chapter(data: ChapterProps) {

    const [chapterPrevSlug, setChapterPrevSlug] = useState<string | null>()
    const [chapterNextSlug, setChapterNextSlug] = useState<string | null>()
    const [bookLink, setBookLink] = useState<string>()
    const [selectedItemPath, setSelecteditemPath] = useState<string>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [bookmarkModalOpen, setBookmarkModalOpen] = useState<boolean>(false)
    const [isSelectedItemOriginalShown, setIsSelectedItemOriginalShown] = useState<boolean>(false)

    const onCloseModal = (value: boolean) => {
        setModalOpen(value)
    }

    useEffect(() => {
        if (data) {
            const item = data?.pageContext?.brothers?.find(item => item?.id === data?.pageContext?.item?.id)
            if (!item) return
            const itemIndex = data?.pageContext?.brothers.indexOf(item)
            const chapterPrevSlug = data?.pageContext?.brothers[itemIndex - 1]?.slug
            const chapterNextSlug = data?.pageContext?.brothers[itemIndex + 1]?.slug
            const bookLink = data?.path?.split('/').filter(item => item?.length > 0).slice(0, -1).join('/')
            setChapterPrevSlug(chapterPrevSlug)
            setChapterNextSlug(chapterNextSlug)
            setBookLink(bookLink)
        }
    }, [data])

    const onBookmarkButtonClick = () => {
        setModalOpen(false)
        setBookmarkModalOpen(true)
    }

    const onBookmarkSubmitClick = () => {
        setBookmarkModalOpen(false)
    }

    return (
        <>
            <section className="container h-full flex-grow flex flex-col" >
                <Breadcrumbs items={data?.pageContext?.breadcrumbs}></Breadcrumbs>
                <h1 className="text-2xl font-bold mb-4 uppercase">{data?.pageContext?.item?.title}</h1>
                <div className='flex flex-col justify-between flex-grow'>
                    <div className='-mx-3 mb-10'>
                        {data?.pageContext?.item?.post?.postMassiv?.map((item, index) => {
                            const [isOriginalShown, setIsOriginalShown] = useState(false)

                            const onClick = () => {
                                onCloseModal(true)
                                setSelecteditemPath(`${data?.path}#text-${index}`)
                                setIsSelectedItemOriginalShown(isOriginalShown)
                            }
                            return <div onClick={onClick} className='chapter-block w-fit pt-2 pb-3 px-3 transition-all hover:bg-gray-200 md:hover:bg-none cursor-pointer' id={`text-${index}`}>
                                {isOriginalShown ? <div className='w-fit'>
                                    <div className='w-fit' dangerouslySetInnerHTML={{ __html: item?.originalTekst || '' }} ></div>
                                    {item?.blokImeetRemarki === 'true' && <div className='remark-text' dangerouslySetInnerHTML={{ __html: item?.originalRemarka || '' }}></div>}
                                </div>
                                    : <div className='w-fit'>
                                        <div className='w-fit' dangerouslySetInnerHTML={{ __html: item?.translationTekst || '' }}></div>
                                        {item?.blokImeetRemarki === 'true' && <div className='remark-text' dangerouslySetInnerHTML={{ __html: item?.translationRemarka || '' }}></div>}
                                    </div>}
                            </div>
                        }
                        )}
                    </div>
                    <div className='mt-auto py-7 flex justify-between'>
                        {chapterPrevSlug && <Link className='uppercase text-xs font-medium link-animation-left' to={`/${bookLink}/${chapterPrevSlug}`}>Предыдущая глава</Link>}
                        {chapterNextSlug && <Link className='uppercase text-xs font-medium link-animation' to={`/${bookLink}/${chapterNextSlug}`}>Следующая глава</Link>}
                    </div>
                </div>
            </section>
            <FixedLayer>
                <Modal open={modalOpen} setOpen={onCloseModal}>
                    <h2>Выберите действие</h2>
                    <ul>
                        <li><button onClick={onBookmarkButtonClick}>Поставить закладку</button></li>
                        <li><button>{!isSelectedItemOriginalShown ? `Показать оригинал` : `Показать перевод`}</button></li>
                    </ul>
                </Modal>
                <Modal open={bookmarkModalOpen} setOpen={value => setBookmarkModalOpen(value)}>
                    <h2>Введите название закладки</h2>
                    <input type="text" />
                    <button onClick={onBookmarkSubmitClick}>Готово</button>
                </Modal>
            </FixedLayer>
        </>


    )
}
