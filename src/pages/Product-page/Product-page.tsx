import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api'
import loading from '../../assets/img/loading.gif'
import { useAppDispatch, useAppSelector } from '../../hooks'

const ProductPage = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()

    const isLoaded = useAppSelector((state) => state.products.isLoaded)
    const product = useAppSelector((state) => state.products.item)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(fetchProduct(id))
    }, [])

    const onAddToCart = () => {
        const obj = {
            product: product.id,
            name: product.name,
            img: product.img,
            actualPrice: product.actualPrice,
        }
        // dispatch(addItemToCart(obj));
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
                                {/* <div className="product__amount">
                                Количество: <input type="text" placeholder="1" />
                            </div> */}
                                <button onClick={onAddToCart} className="product__btn btn-black">
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
