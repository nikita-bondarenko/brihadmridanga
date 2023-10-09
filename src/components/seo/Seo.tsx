import React from "react"
import smallImageUrl from '../../static/share_1.jpg';
import bigImageUrl from '../../static/share_2.jpg';

interface SeoProps {
    url: string,
    description: string,
    title: string,
    favicon: string
}

const Seo = ({ url, description, title, favicon }: SeoProps) => {

    return (
        <>
            <html lang="ru" />
            <meta charSet="UTF-8" />
            <meta content="width=device-width, user-scalable=no" />
            <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
            <title>{title}</title>
            <meta name="description"
                content={description || ''} />
            <meta name="theme-color" content="#000000" />
            <meta property="og:url" content={url || ''} />
            <meta property="og:title" content={title || ''} />
            <meta property="og:description"
                content={description || ''} />
            <meta property="og:image"
                content={url + bigImageUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="ru_RU" />
            <meta property="og:image:alt" content="" />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:secure_url"
                content={url + bigImageUrl} />
            <meta name="description"
                content={description || ''} />
            <meta property="vk:image"
                content={url + smallImageUrl} />
            <meta name="twitter:title"
                content={title || ''} />
            <meta name="twitter:description"
                content={description || ''} />
            <meta name="twitter:card"
                content="summary_large_image" />
            <meta name="twitter:site"
                content="@" />
            <meta
                name="twitter:image"
                content={url + bigImageUrl} />
            <meta
                name="twitter:creator"
                content="@" />
            <link
                rel="shortcut icon"
                href={favicon || ''}
                type="image/vnd.microsoft.icon" />

        </>
    )
}

export default Seo
