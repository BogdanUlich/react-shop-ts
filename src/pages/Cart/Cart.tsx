import emptyCart from '../../assets/img/cart/empty-cart.png'
import { Link } from 'react-router-dom'
import { FC, useEffect } from 'react'
import CheckoutForm from '../../components/Checkout-form/CheckoutForm'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { clearCart } from '../../store/slices/cartSlice'
import trahBasket from '../../assets/img/icons/trash-basket.svg'
import CartProduct from '../../components/Cart-product/Cart-product'

const Cart: FC = () => {
    const dispatch = useAppDispatch()

    const onClearCart = (): void => {
        if (window.confirm('Вы действительно хотите очистить корзину?')) {
            dispatch(clearCart())
        }
    }

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const { totalPrice, totalCount, items } = useAppSelector((state) => state.cart)

    return (
        <div className="container">
            <div className="cart">
                {totalCount ? (
                    <div className="cart__container">
                        <div className="product-cart">
                            <div className="product-cart__body">
                                <h2 className="product-cart__title title space-between">
                                    <span>Корзина</span>
                                    <span onClick={onClearCart} className="product-cart__clear">
                                        <img src={trahBasket} alt="" className="product-cart__clear-icon" />
                                        <span>Очистить корзину</span>
                                    </span>
                                </h2>

                                <div className="product-cart__items">
                                    {items.map((obj) => (
                                        <CartProduct
                                            name={obj.name}
                                            actualPrice={obj.actualPrice}
                                            img={obj.img}
                                            link={obj.link}
                                            quantity={obj.quantity}
                                            id={obj.id}
                                            key={`${obj.id}_${obj.name}`}
                                            totalPrice={obj.totalPrice}
                                        />
                                    ))}
                                </div>
                                <div className="product-cart__total space-between">
                                    <span>Итого</span>
                                    <span>{totalPrice} грн</span>
                                </div>
                            </div>
                        </div>
                        <CheckoutForm addedItems={items} />
                    </div>
                ) : (
                    <div className="cart__empty">
                        <div className="cart__empty-title">В вашей корзине пока нет товаров</div>
                        <div className="cart__empty-img">
                            <img src={emptyCart} alt="" />
                        </div>
                        <Link to="/" className="cart__empty-btn btn-black">
                            Смотреть товары
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Cart
