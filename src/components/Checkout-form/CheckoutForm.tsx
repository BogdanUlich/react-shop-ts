import { FC, useState } from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { createOrder, fetchCities, fetchWarehouses } from "../../api";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useSelector } from "react-redux";
import Modal from "../Modal-popup/Modal";
import Fade from "../Fade/Fade";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { AppState } from "../../store/redusers";

type PropsType = {
  addedItems: any;
};

const CheckoutForm: FC<PropsType> = ({ addedItems }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [selectedCity, setSelectedCity] = useState(false);
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState(false);
  const [visibleFade, setVisibleFade] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState();
  const items = useSelector((state: AppState) => state.cart.items);

  const onChooseCity = (id: number) => {
    fetchWarehouses(id, setWarehouses);
  };

  const optionsWarehouses = warehouses.map(function (obj) {
    return {
      value: obj.id,
      label: obj.name,
    };
  });

  const onSubmit = (data) => {
    const productsInfo = {};
    addedItems.map(
      (obj) =>
        (productsInfo[addedItems.indexOf(obj) + 1] = {
          id: obj.id,
          quantity: items[obj.id].items.length,
        })
    );
    data.products = productsInfo;
    createOrder(JSON.stringify(data), showModal, setOrderNumber);
    reset();
  };

  const showModal = () => {
    setVisibleModal(true);
    setVisibleFade(true);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setVisibleFade(false);
  };

  return (
    <div className="product-ordering">
      <h2 className="product-ordering__title title">Оплата и доставка</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="product-ordering__form"
      >
        <div className="product-ordering__input-group">
          <div className="product-ordering__input-wrapper">
            <label className="product-ordering__input-name">
              Имя <span>*</span>
              <input
                {...register("firstName", {
                  required: true,
                  pattern: /[А-Яа-я]/,
                })}
                className={classNames(
                  "product-ordering__input",
                  errors?.firstName && "product-ordering__input_warning"
                )}
                placeholder={
                  errors.firstName ? "Поле обязательно к заполнению" : ""
                }
                type="text"
              />
            </label>
          </div>
          <div className="product-ordering__input-wrapper">
            <label className="product-ordering__input-name">
              Фамилия <span>*</span>
              <input
                {...register("lastName", {
                  required: true,
                  pattern: /[А-Яа-я]/,
                })}
                className={classNames(
                  "product-ordering__input",
                  errors?.lastName && "product-ordering__input_warning"
                )}
                placeholder={
                  errors.lastName ? "Поле обязательно к заполнению" : ""
                }
              />
            </label>
          </div>
        </div>
        <label className="product-ordering__input-name">
          Номер телефона <span>*</span>
          <input
            {...register("phoneNumber", {
              required: true,
              pattern: /\+?[0-9\s\-\(\)]+/,
            })}
            className={classNames(
              "product-ordering__input",
              errors?.phoneNumber && "product-ordering__input_warning"
            )}
            type="tel"
          />
        </label>

        <h3 className="product-ordering__title">Укажите адрес доставки</h3>
        <div className="product-ordering__select-group">
          <AsyncSelect
            cacheOptions
            placeholder="Введите название города"
            getOptionLabel={(e) => e.name}
            getOptionValue={(e) => e.id}
            loadOptions={fetchCities}
            onChange={(e) => {
              onChooseCity(e.id);
              setSelectedCity(e.name);
              register("city", { value: e.name });
            }}
          />
          <Select
            options={optionsWarehouses}
            placeholder="Выберите отделение новой почты"
            onChange={(e) => {
              register("warehouse", { value: e.label });
              setSelectedWarehouse(e.label);
            }}
          />
        </div>
        <h3 className="product-ordering__title">Способ оплаты</h3>
        <div className="product-ordering__switch">
          <div className="product-ordering__switch-wrapper">
            <input
              className="product-ordering__switch-btn"
              type="radio"
              name="paymentType"
              value="1"
              {...register("paymentType")}
            />
            <div className="product-ordering__switch-name">
              Оплата на карту (после подтверждения заказа Вам будет отправлен
              номер карты)
            </div>
          </div>
          <div className="product-ordering__switch-wrapper">
            <input
              className="product-ordering__switch-btn"
              type="radio"
              name="paymentType"
              value="2"
              {...register("paymentType")}
            />
            <div className="product-ordering__switch-name">
              Наложенный платёж (оплата при получении)
            </div>
          </div>
        </div>
        <h3 className="product-ordering__title">Детали</h3>
        <textarea
          className="product-ordering__textarea"
          name=""
          id=""
          cols="30"
          rows="10"
          {...register("details")}
        ></textarea>
        <div
          className={
            selectedCity && selectedWarehouse
              ? "product-ordering__btn"
              : "product-ordering__btn disabled"
          }
        >
          <div className="product-ordering__btn-tooltip">
            Выберите адрес доставки
          </div>
          <input
            type="submit"
            className={
              selectedCity && selectedWarehouse
                ? "btn-black"
                : "btn-black disabled"
            }
            value="Оформить заказ"
          />
        </div>
      </form>
      <Modal visibleModal={visibleModal} onClick={closeModal}>
        <CheckCircleOutlineIcon className="modal__success-icon" />
        <div className="modal__text">{`Заказ ${orderNumber} оформлен успешно`}</div>
        <div className="modal__subtext">
          С вами свяжется менеджер для подтверждения заказа
        </div>
      </Modal>
      <Fade visibleFade={visibleFade} onClick={closeModal} />
    </div>
  );
};

export default CheckoutForm;
