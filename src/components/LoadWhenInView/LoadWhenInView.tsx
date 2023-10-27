import React, { ReactComponentElement, ReactElement, ReactNode, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'

export default function LoadWhenInView({ children }: { children: ReactNode | ReactElement }) {
    const [count, setCount] = useState(0)
    const [is, setIs] = useState<boolean>()
    useEffect(() => {
        if (typeof is === "boolean") {
            setCount(prev => prev + 1)
        }
    }, [is])

    useEffect(() => {
        if (count > 0) {
            console.log('section in view')
        }
    }, [count])
    return (
        <div className='relative'>
            <InView className='absolute left-[50%] top-[20vh]' onChange={value => setIs(value)}></InView>
            {count > 0 && children}
        </div>
    )
}
