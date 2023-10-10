import React, { Dispatch, ReactElement, ReactNode, SetStateAction, createRef, useEffect } from 'react';
import * as styles from './Modal.module.css'
import { stack } from '../../hooks/useClassName';
import Chrest from '../svg/Chrest';

type ModalProps = {
    open: boolean,
    children: ReactElement | ReactNode

    setOpen: (value: boolean) => void
}

const Modal = ({ children, open, setOpen }: ModalProps) => {

    return (
        <div onClick={() => setOpen(false)} className={stack(styles.modal, open && styles.open)}>
            <div className={stack(styles.body)}>
                <div className={stack('mx-auto max-w-[500px] py-20', styles.content)}>
                    <div onClick={e => e.stopPropagation()} className='relative bg-white px-10 py-7'>
                        {children}
                        <button onClick={() => setOpen(false)} className='link-animation-opacity absolute top-3 right-3'>
                            <Chrest className='w-7 h-7'></Chrest>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
