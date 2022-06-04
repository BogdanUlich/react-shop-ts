import { FC } from 'react'
import { Link } from 'react-router-dom'
import times from '../../assets/img/icons/times.svg'
import minus from '../../assets/img/icons/minus-circle.svg'
import plus from '../../assets/img/icons/plus-circle.svg'
import { useDispatch } from 'react-redux'
import { minusCartItem, plusCartItem, removeCartItem } from '../../store/slices/cartSlice'

type PropsType = {
    name: string
    img: string
    actualPrice: number
    quantity: number
    id: number
    link: string
    totalPrice: number
}

const CartProduct: FC<PropsType> = (props) => {
    const dispatch = useDispatch()

    const deleteProduct = () => {
        if (window.confirm('Удалить товар из корзины?')) {
            dispatch(removeCartItem(props))
        }
    }
    const onPlusCartItem = () => {
        dispatch(plusCartItem(props))
    }
    const onMinusCartItem = () => {
        dispatch(minusCartItem(props))
    }

    return (
        <div className="cart-product">
            <Link to="/">
                <img src={require('../../assets/img/products/' + props.img)} alt="" className="cart-product__img" />
            </Link>
            <div className="cart-product__info space-between">
                <div className="cart-product__name space-between">
                    <Link to="/">{props.name}</Link>
                    <span onClick={deleteProduct} style={{ alignSelf: 'flex-start' }}>
                        <img src={times} alt="" className="cart-product__delete" />
                    </span>
                </div>
                <div className="cart-product__amount space-between">
                    <span className="cart-product__amount-body">
                        <span>Количество: {props.quantity}</span>
                        <img src={plus} alt="" className="cart-product__amount-icon" onClick={onPlusCartItem} />
                        <img src={minus} alt="" className="cart-product__amount-icon" onClick={onMinusCartItem} />
                    </span>
                    <span className="cart-product__total-price">
                        <span>{props.totalPrice} грн</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CartProduct
