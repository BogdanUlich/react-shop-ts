import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { clearCart } from "../../store/actions/cart";
import emptyCart from "../../assets/img/cart/empty-cart.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import CheckoutForm from "../../components/Checkout-form/CheckoutForm";

function Cart() {
  const dispatch = useDispatch();

  const onClearCart = () => {
    if (window.confirm("Вы действительно хотите очистить корзину?")) {
      dispatch(clearCart());
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { totalPrice, totalCount, items } = useSelector(({ cart }) => cart);

  const addedItems = Object.keys(items).map((key) => {
    return items[key].items[0];
  });

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
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Очистить корзину
                  </span>
                </h2>

                <div className="product-cart__items">
                  {addedItems.map((obj) => (
                    <CartProduct
                      name={obj.name}
                      price={items[obj.id].totalPrice}
                      img={obj.img}
                      quantity={items[obj.id].items.length}
                      id={obj.id}
                      key={`${obj.id}_${obj.name}`}
                    />
                  ))}
                </div>
                <div className="product-cart__total space-between">
                  <span>Итого</span>
                  <span>{totalPrice} грн</span>
                </div>
              </div>
            </div>
            <CheckoutForm addedItems={addedItems} />
          </div>
        ) : (
          <div className="cart__empty">
            <div className="cart__empty-title">
              В вашей корзине пока нет товаров
            </div>
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
  );
}

export default Cart;
