import React from 'react'

export type SvgProps = {
    className?: string
}

export default function Breadcrumb({ className }: SvgProps) {
    return (
        <svg className={className || ''} xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" xmlSpace="preserve">
            <path d="M8.4,42c-0.6,0-1-0.4-1-1V10.9c0-0.6,0.4-1,1-1h8.1c0.4,0,0.9,0.2,1.2,0.5L29.3,25c0.4,0.5,0.4,1.3,0,1.9  L17.6,41.5c-0.3,0.4-0.8,0.6-1.3,0.6L8.4,42z" />
            <path d="M44.3,25L32.6,10.5c-0.5-0.6-1.4-0.8-2.1-0.2l-2.3,1.9c-0.7,0.5-0.8,1.5-0.2,2.1L37.5,26L28,37.8  c-0.5,0.6-0.4,1.6,0.2,2.1l2.3,1.9c0.7,0.5,1.5,0.4,2.1-0.2L44.3,27C44.7,26.2,44.7,25.5,44.3,25z" />
        </svg>
    )
}
