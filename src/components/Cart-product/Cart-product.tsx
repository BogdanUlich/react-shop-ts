import { FC } from "react";
import { Link } from "react-router-dom";
import {
  removeCartItem,
  plusCartItem,
  minusCartItem,
} from "../../store/actions/cart";
import CloseIcon from "@mui/icons-material/Close";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useDispatch } from "react-redux";

type PropsType = {
  name: string;
  img: string;
  price: number;
  quantity: number;
  id: number;
};

const CartProduct: FC<PropsType> = ({ name, img, price, quantity, id }) => {
  const dispatch = useDispatch();

  const deleteProduct = () => {
    if (window.confirm("Удалить товар из корзины?")) {
      dispatch(removeCartItem(id));
    }
  };
  const onPlusCartItem = () => {
    dispatch(plusCartItem(id));
  };
  const onMinusCartItem = () => {
    dispatch(minusCartItem(id));
  };

  return (
    <div className="cart-product">
      <Link to="/">
        <img
          src={require("../../assets/img/products/" + img)}
          alt=""
          className="cart-product__img"
        />
      </Link>
      <div className="cart-product__info space-between">
        <div className="cart-product__name space-between">
          <Link to="/">{name}</Link>
          <span onClick={deleteProduct} style={{ alignSelf: "flex-start" }}>
            <CloseIcon className="cart-product__delete" />
          </span>
        </div>
        <div className="cart-product__amount space-between">
          <span className="cart-product__amount-body">
            <span>Количество: {quantity}</span>
            <AddCircleOutlineIcon
              className="cart-product__amount-icon"
              onClick={onPlusCartItem}
            />
            <RemoveCircleOutlineIcon
              className="cart-product__amount-icon"
              onClick={onMinusCartItem}
            />
          </span>
          <span className="cart-product__total-price">
            <span>{price} грн</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
