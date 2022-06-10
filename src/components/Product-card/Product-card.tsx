import classNames from 'classnames'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../hooks'
import { addItemToCart } from '../../store/slices/cartSlice'
import { ProductItem } from '../../types/products'

const ProductCard: FC<ProductItem> = ({ available, name, actualPrice, oldPrice, id, img, link }) => {
    const dispatch = useAppDispatch()

    const onAddToCart = () => {
        const productItem = {
            id,
            name,
            img,
            actualPrice,
            link,
            quantity: 1,
            totalPrice: actualPrice,
        }
        dispatch(addItemToCart(productItem))
    }

    return (
        <div className="product-card">
            <Link to={`/product-page/${link}`} className="product-card__img">
                <img src={require('../../assets/img/products/' + img)} alt="" />
            </Link>
            <span className="product-card__description">
                <Link to={'/product-page/' + link} className="product-card__name">
                    {name}
                </Link>
                <span className="product-card__discount">
                    Старая цена <span>{oldPrice} грн</span>
                </span>
                <span className="product-card__price">{actualPrice} грн</span>
                <span className={classNames('product-card__buy', available ? 'active' : '')}>
                    <button onClick={onAddToCart} className="product-card__btn">
                        В корзину
                    </button>
                    <span className="product-card__unavailable">Нет в наличии</span>
                </span>
            </span>
        </div>
    )
}

export default ProductCard
