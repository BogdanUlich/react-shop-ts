import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { Sortitem } from '../../types'
import { setSortBy } from '../../store/slices/filtersSlice'
import { sortBy } from '../../types/filters'
import arrowDown from '../../assets/img/icons/arrow-down.svg'

interface SelectProps {
    sortItems: Sortitem[]
    activeSortType: sortBy
}

const Select: FC<SelectProps> = ({ sortItems, activeSortType }) => {
    const activelabel = sortItems.find(function (obj) {
        if (obj.name === activeSortType.name) {
            return obj
        }
    })

    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)

    const sortRef = useRef<HTMLHeadingElement>(null)

    const dispatch = useDispatch()

    const onSelectItem = (obj: Sortitem) => {
        dispatch(setSortBy(obj))
        setVisiblePopup(false)
    }

    useEffect(() => {
        document.body.addEventListener('click', closePopup)

        return () => {
            document.body.removeEventListener('click', closePopup)
        }
    }, [])

    const closePopup = (event: any) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(sortRef.current)) {
            setVisiblePopup(false)
        }
    }

    const toggleVisiblePopup = () => {
        setVisiblePopup(!visiblePopup)
    }

    return (
        <div className="sort">
            <div className="sort__label" ref={sortRef} onClick={toggleVisiblePopup}>
                Сортировка по:<span>{activelabel ? activelabel.name : sortItems[0].name}</span>
                <img src={arrowDown} className={classNames('sort__icon', visiblePopup ? 'open' : '')} />
            </div>
            {visiblePopup && (
                <ul className="sort__popup">
                    {sortItems &&
                        sortItems.map((obj) => (
                            <li
                                className={classNames('sort__link', activeSortType.name === obj.name ? 'active' : '')}
                                key={`${obj.name}`}
                                onClick={() => onSelectItem(obj)}
                            >
                                {obj.name}
                            </li>
                        ))}
                </ul>
            )}
        </div>
    )
}

export default Select
