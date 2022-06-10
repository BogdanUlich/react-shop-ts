import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api'
import loading from '../../assets/img/loading.gif'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { addItemToCart } from '../../store/slices/cartSlice'
import plus from '../../assets/img/icons/plus-circle.svg'
import minus from '../../assets/img/icons/minus-circle.svg'
import classNames from 'classnames'

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const isLoaded = useAppSelector((state) => state.products.isLoaded)
    const product = useAppSelector((state) => state.products.item)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(fetchProduct(id))
    }, [id])

    const [productAmount, setProductAmount] = useState(1)
    const productAmountInput = useRef<HTMLInputElement>(null)

    const onPlusItem = () => {
        setProductAmount((prev) => prev + 1)
    }
    const onMinusItem = () => {
        if (productAmount > 1) {
            setProductAmount((prev) => prev - 1)
        }
    }

    const onChangeAmount = (amount: any) => {
        if (!isNaN(Number(amount))) {
            setProductAmount(Number(productAmountInput.current?.value))
        }
    }

    const onAddToCart = () => {
        const obj = {
            id: product.id,
            name: product.name,
            img: product.img,
            actualPrice: product.actualPrice,
            link: product.link,
            quantity: productAmount,
            totalPrice: product.actualPrice * productAmount,
        }
        if (productAmount > 0) {
            dispatch(addItemToCart(obj))
        }
    }

    let discount = 100 - Math.floor((product.actualPrice * 100) / product.oldPrice)
    discount = discount < 0 ? 0 : discount

    return (
        <div className="product-page">
            <div className="product-page__container container">
                {isLoaded ? (
                    <div className="product">
                        <div className="product__column">
                            <div className="product__wrapper">
                                <img
                                    alt=""
                                    src={require('../../assets/img/products/' + product.img)}
                                    className="product__img"
                                />
                            </div>

                            <div className="product__description">
                                {product.description}
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati
                                    tempora repellendus earum praesentium, modi officiis dolorum dolor iure, quo
                                    aspernatur iste minus nemo accusamus aut ratione expedita aliquam tempore.
                                </p>

                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto obcaecati
                                    tempora repellendus earum praesentium, modi officiis dolorum dolor iure, quo
                                    aspernatur iste minus nemo accusamus aut ratione expedita aliquam tempore.
                                </p>

                                <ul className="product__description-list">
                                    <li className="product__description-title">Характеристики</li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                    <li>Lorem ipsum dolor sit amet consectetur adipisicing.</li>
                                </ul>
                            </div>
                        </div>

                        <div className="product__column">
                            <div className="product__info">
                                <h1 className="product__name">{product.name}</h1>

                                <div className="product__price">{product.actualPrice} грн.</div>

                                {discount > 0 ? (
                                    <div className="product__discount">
                                        <div className="product__old-price">{product.oldPrice} грн.</div>
                                        <div className="product__discount-value">Скидка {discount}%</div>
                                    </div>
                                ) : (
                                    ''
                                )}

                                <div className="product__label">Новинка</div>

                                <div className="product__amount">
                                    Количество:
                                    <span className="product__amount-container">
                                        <input
                                            type="text"
                                            className="product__amount-input"
                                            value={productAmount}
                                            ref={productAmountInput}
                                            onChange={(e) => onChangeAmount(e.target.value)}
                                        />

                                        <img
                                            src={plus}
                                            alt=""
                                            className="product__amount-btn product__amount-btn_plus"
                                            onClick={onPlusItem}
                                        />

                                        <img
                                            src={minus}
                                            alt=""
                                            className="product__amount-btn product__amount-btn_minus"
                                            onClick={onMinusItem}
                                        />
                                    </span>
                                </div>

                                <button
                                    onClick={onAddToCart}
                                    className={classNames(
                                        'product__btn btn-black',
                                        productAmount < 1 ? 'disabled' : ''
                                    )}
                                >
                                    В корзину
                                </button>
                            </div>
                        </div>

                        <div className="product__img-md">
                            <img alt="" src={require('../../assets/img/products/' + product.img)} />
                        </div>
                    </div>
                ) : (
                    <div className="product-loading">
                        <img src={loading} alt="loading" />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductPage
