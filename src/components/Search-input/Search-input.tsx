import { useState, useEffect, useRef, FC, useCallback } from 'react'
import classNames from 'classnames'
import { searchProduct } from '../../api'
import { Link } from 'react-router-dom'
import times from '../../assets/img/icons/times.svg'
import search from '../../assets/img/icons/search.svg'
import { ProductItem } from '../../types/products'
import debounce from 'lodash.debounce'

interface SearchInputProps {
    className: string
}

const SearchInput: FC<SearchInputProps> = ({ className }) => {
    const [products, setProducts] = useState<ProductItem[]>([])
    const [visibleSearchList, setVisibleSearchList] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState('')

    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.body.addEventListener('click', closeSearchList)
    }, [])

    const onInputUpdate = useCallback(
        debounce((productName: string) => {
            searchProduct(productName, showProducts)
        }, 300),
        []
    )

    const onInputChange = (productName: string) => {
        if (productName) {
            onInputUpdate(productName)
            toggleVisibleSearchList(true)
            setInputValue(productName)
        } else {
            toggleVisibleSearchList(false)
            setInputValue('')
        }
    }

    const onInputFocus = () => {
        if (products.length > 0) {
            setVisibleSearchList(true)
        }
    }

    const clearInputValue = () => {
        setInputValue('')
        setProducts([])
        inputRef.current?.focus()
    }

    const showProducts = (obj: any) => {
        obj ? setProducts(Object.values(obj)) : setProducts([])
    }

    const toggleVisibleSearchList = (visible: boolean) => {
        setVisibleSearchList(visible)
    }

    const closeSearchList = (event: any) => {
        const path = event.path || (event.composedPath && event.composedPath())
        if (!path.includes(inputRef.current)) {
            setVisibleSearchList(false)
        }
    }

    return (
        <div className={classNames('search', className)}>
            <input
                value={inputValue}
                type="text"
                className="search__input"
                placeholder="Введите название товара"
                onChange={(e) => onInputChange(e.target.value)}
                onFocus={onInputFocus}
                ref={inputRef}
            />

            <button className="search__btn">
                {inputValue ? (
                    <img src={times} className="search__btn-icon" alt="" onClick={clearInputValue} />
                ) : (
                    <img src={search} className="search__btn-icon" alt="" />
                )}
            </button>

            {visibleSearchList && (
                <div className="search__list">
                    {products.length > 0 ? (
                        products.map((obj) => (
                            <Link to={`/product-page/${obj.link}`} className="search__list-link" key={obj.id}>
                                {obj.name}
                            </Link>
                        ))
                    ) : (
                        <span className="search__list-item">Товары не найдены</span>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchInput
