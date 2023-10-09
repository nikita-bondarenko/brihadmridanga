import React from 'react'
import { Breadcrumb } from '../../../gatsby-node'
import { Link } from 'gatsby'
import BreadcrumbSvg from '../svg/Breadcrumb'

type Breadcrumbs = {
    items: Breadcrumb[]
}

export default function Breadcrumbs({ items }: Breadcrumbs) {
    return (
        <ul className='flex flex-wrap gap-2 -mt-2 mb-7 items-center'>
            {items?.map((item, index) => <React.Fragment key={index}>
                <li className='leading-none' >
                    <Link className='text-xs uppercase font-medium link-animation' to={item.to}>
                        {item.text}
                    </Link>
                </li>
                {index + 1 !== items?.length && <li>
                    <BreadcrumbSvg className='w-4 h-4 '></BreadcrumbSvg>
                </li>}
            </React.Fragment>
            )}
        </ul>
    )
}
