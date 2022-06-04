import { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { Sortitem } from '../../types'
import { setSortBy } from '../../store/slices/filtersSlice'
import { sortBy } from '../../types/filters'

interface SelectProps {
    sortItems: Sortitem[]
    activeSortType: sortBy
}

const Select: FC<SelectProps> = ({ sortItems, activeSortType }) => {
    const activelabel = sortItems.find(function (obj) {
        if (obj.type === activeSortType.type) {
            return obj
        }
    })

    const [visiblePopup, setVisiblePopup] = useState<boolean>(false)

    const sortRef = useRef<HTMLHeadingElement>(null)

    const dispatch = useDispatch()

    const onSelectItem = (type: Sortitem) => {
        dispatch(setSortBy(type))
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
                <img src="" className={classNames('sort__icon', visiblePopup ? 'open' : '')} />
                Сортировка по:<span>{activelabel ? activelabel.name : sortItems[0].name}</span>
            </div>
            {visiblePopup && (
                <ul className="sort__popup">
                    {sortItems &&
                        sortItems.map((obj) => (
                            <li
                                className={classNames('sort__link', activeSortType.type === obj.type ? 'active' : '')}
                                key={`${obj.type}`}
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
