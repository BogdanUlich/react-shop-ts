import classNames from 'classnames'
import { FC, ReactNode, useEffect, useState } from 'react'
import close from '../../assets/img/icons/times.svg'

interface ModalProps {
    loading: 'pending' | 'success' | 'error'
    children: ReactNode
}

const Modal: FC<ModalProps> = ({ children, loading }) => {
    const [visibleModal, setVisibleModal] = useState(false)

    useEffect(() => {
        if (loading === 'error') {
            setVisibleModal(true)
        }
    }, [loading])

    return (
        <>
            <div
                className={classNames('fade', visibleModal ? 'active' : '')}
                onClick={() => setVisibleModal(false)}
            ></div>

            <div className={visibleModal ? 'modal active' : 'modal'}>
                <div className="modal__header">
                    <div className="modal__title"></div>
                    <div className="modal__close" onClick={() => setVisibleModal(false)}>
                        <img src={close} alt="" />
                    </div>
                </div>
                <div className="modal__body">{children}</div>
            </div>
        </>
    )
}

export default Modal
