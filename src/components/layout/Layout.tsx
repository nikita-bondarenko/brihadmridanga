import React, { ReactElement, ReactNode } from 'react'
import Books from '../svg/Books'
import Zakladka from '../svg/Zakladka'
import Search from '../svg/Search'
import Settings from '../svg/Settings'
import { Link } from 'gatsby'


const svgClass = 'w-4 h-4 md:w-full'

const nav: { to: string, class?: string, text?: string, liClass?: string, child: ReactElement }[] = [
    {
        to: '/', class: 'hover:bg-gray-200 px-2  md:px-0', liClass: 'mr-auto -ml-3 md:ml-0 md:mr-0 ', child: <Books className={` w-12 h-12  md:h-8 md:w-full`} />
    },
    {
        to: '/search', class: 'hover:bg-gray-200 pr-7 pl-4 md:px-0',liClass: '', text: 'Поиск', child: <Search className={` w-6 h-6 md:w-full`} />
    },
    {
        to: '/bookmark', class: 'hover:bg-gray-200 pr-7 pl-4 md:px-0',liClass: '', text: 'Закладки', child: <Zakladka className={` ${svgClass}`} />
    },

    {
        to: '/settings', class: 'hover:bg-gray-200 pr-7 pl-4 md:px-0',liClass: '', text: 'Настройки', child: <Settings className={` ${svgClass}`} />
    },
]

export default function Layout({ children }: { children: ReactNode | ReactElement }) {
    return (
        <div className='min-h-[100vh] flex flex-col'>
            <header className='mb-10 shadow-md md:fixed md:bottom-0 md:left-0 md:right-0 md:mb-0 md:bg-white md:shadow-top-md'>
                <nav className='container '>
                    <ul className='flex justify-end items-center md:justify-around'>
                        {nav?.map((item, index) => <li key={index} className={`h-12 block md:flex-grow ${item.liClass || ''}`}>
                            <Link  to={item.to}  className={` transition-all flex gap-2   h-full items-center  ${item.class}`} >{item.child}
                                {item.text && <span className='text-sm font-medium md:hidden'>{item.text}</span>}
                            </Link>
                        </li>)}
                    </ul>
                </nav>
            </header>
            <main className='md:mt-10 '>
                {children}
            </main>
            <footer className=' py-5 border-t-2 border-black md:py-6 md:mb-16 mt-auto '>
                <div className='container flex gap-5 md:flex-col md:items-center'>
                <a target='_blank' className='  text-sm font-medium link-animation' href="https://mailto:naradadasosmi@gmail.com">naradadasosmi@gmail.com</a>
                <a target='_blank'  className='  text-sm font-medium link-animation' href="https://t.me/+pp7nefyEpaAyMjcy">telegram channel</a>
                </div>
                
            </footer>
            </div>
    )
}
