import { HeadFC, Link } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Seo from '../components/seo/Seo'
import { Breadcrumb } from '../../gatsby-node'
import Breadcrumbs from '../components/breadcrumbs/Breadcrumbs'
import book from './book'
import FixedLayer from '../components/fixedlayer/FixedLayer'
import Modal from '../components/modal/Modal'
import { useBookmarks } from '../hooks/useBookmarks'
import { v4 } from 'uuid'
import { Bookmark } from '../types/types'

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

const bookmarkEmptyError = 'Необходимо заполнить поле'

const bookmarkTypeError = 'Зкладка с таким зазванием уже существует'


export default function chapter(data: ChapterProps) {

    const [chapterPrevSlug, setChapterPrevSlug] = useState<string | null>()
    const [chapterNextSlug, setChapterNextSlug] = useState<string | null>()
    const [bookLink, setBookLink] = useState<string>()
    const [selectedItemPath, setSelecteditemPath] = useState<string>()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [bookmarkModalOpen, setBookmarkModalOpen] = useState<boolean>(false)
    const [isSelectedItemOriginalShown, setIsSelectedItemOriginalShown] = useState<boolean>(false)
    const [bookmarkDefaultName, setBookmarkDefaultName] = useState<string>()
    const [bookmarkName, setBookmarkName] = useState<string>()
    const [bookmarkError, setBookmarkError] = useState<string | null>()

    const { bookmarks, setBookmarks } = useBookmarks()

    useEffect(() => {
        if (bookmarks) {
            console.log(bookmarks)
            setBookmarkDefaultName(`Закладка №${bookmarks.length + 1}`)
        }
    }, [bookmarks])


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
        setBookmarkName(bookmarkDefaultName)
    }

    const onBookmarkSubmitClick = () => {
        // setBookmarkModalOpen(false)
        if (bookmarkName?.trim().length === 0) {
            setBookmarkError(bookmarkEmptyError)
            return
        }
        if (bookmarks && bookmarks?.some(item => item.name === bookmarkName?.trim())) {
            setBookmarkError(bookmarkTypeError)
            return
        }
        setBookmarkError(null)
        const arr: Bookmark[] = JSON.parse(JSON.stringify(bookmarks))
        arr.push({ id: v4(), path: selectedItemPath || '', name: bookmarkName?.trim() || '' })
        setBookmarks(arr.sort((a, b) => a.name < b.name ? -1 : 1))
        setBookmarkModalOpen(false)
    }

    const onOriginalButtonClick = () => {
        setIsSelectedItemOriginalShown(prev => !prev)
        setModalOpen(false)
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

                            const path = `${data?.path}#text-${index}`

                            useEffect(() => {
                                if (path === selectedItemPath) {
                                    setIsOriginalShown(isSelectedItemOriginalShown)
                                }
                            }, [isSelectedItemOriginalShown])

                            const onClick = () => {
                                onCloseModal(true)
                                setSelecteditemPath(path)
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
                        <div>
                            {chapterPrevSlug && <Link className='uppercase text-xs font-medium link-animation-left' to={`/${bookLink}/${chapterPrevSlug}`}>Предыдущая глава</Link>}
                        </div>
                        <div>
                            {chapterNextSlug && <Link className='uppercase text-xs font-medium link-animation' to={`/${bookLink}/${chapterNextSlug}`}>Следующая глава</Link>}
                        </div>
                    </div>
                </div>
            </section>
            <FixedLayer>
                <Modal open={modalOpen} setOpen={onCloseModal}>
                    <h2 className='text-lg w-fit mx-auto mb-3'>Выберите действие:</h2>
                    <ul className='flex flex-col items-center'>
                        <li className='text-xs uppercase font-bold w-fit'><button className='hover:bg-gray-200 px-4 py-2 uppercase' onClick={onBookmarkButtonClick}>Поставить закладку</button></li>
                        <li className='text-xs uppercase font-bold w-fit'><button className='hover:bg-gray-200 px-4 py-2 uppercase' onClick={onOriginalButtonClick}>{!isSelectedItemOriginalShown ? `Показать оригинал` : `Показать перевод`}</button></li>
                    </ul>
                </Modal>
                <Modal open={bookmarkModalOpen} setOpen={value => setBookmarkModalOpen(value)}>
                    <h2 className='text-sm mx-auto mb-3'>Введите название, чтобы создать новую закладку</h2>
                    <div className='relative pb-4 mb-1'>
                        <input onChange={e => setBookmarkName(e.target.value || '')} className={`w-full text-lg px-4 py-1 h-10 rounded-lg border-[2px]  ${bookmarkError ? 'border-red-500' : 'border-gray-600'} `} value={bookmarkName || ''} type="text" />
                        <span className={`absolute bottom-0 left-0 text-xs transition-all text-red-500 ${bookmarkError ? '' : 'opacity-0'}`}>{bookmarkError}</span>
                    </div>
                    <button className='px-4 mx-auto text-xs uppercase mb-4 transition-all py-2 rounded-lg text-white bg-black hover:bg-gray-600' onClick={onBookmarkSubmitClick}>Готово</button>
                    <h2 className='text-sm mx-auto mb-3'>Или перезапишите уже существующую</h2>
                    <ul className=''>
                        {bookmarks?.map((item, index) => {
                            const onClick = () => {
                                const arr: Bookmark[] = JSON.parse(JSON.stringify(bookmarks))
                                arr[index].path = selectedItemPath || ''
                                setBookmarks(arr.sort((a, b) => a.name < b.name ? -1 : 1))
                                setBookmarkModalOpen(false)
                            }

                            return <li key={item.id}>
                                <button onClick={onClick} className='text-ellipsis text-xs px-4 py-2 hover:bg-gray-200'>{item.name}</button>
                            </li>
                        })
                        }
                    </ul>
                </Modal>
            </FixedLayer>
        </>


    )
}
