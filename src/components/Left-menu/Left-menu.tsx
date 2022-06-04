import { Link } from "react-router-dom";
import phone from "../../assets/img/icons/phone.svg";
import home from "../../assets/img/icons/home.svg";
import times from "../../assets/img/icons/times.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import classNames from "classnames";
import { setMenuVisibility } from "../../store/slices/leftMenuSlice";
import SearchInput from "../Search-input/Search-input";

const LeftMenu = () => {
  const dispatch = useAppDispatch();
  const visibleMenu = useAppSelector((state) => state.leftMenu.visibility);

  const closemenu = () => {
    dispatch(setMenuVisibility(false));
  };

  return (
    <>
      <div
        className={classNames("fade", visibleMenu ? "active" : "")}
        onClick={closemenu}
      ></div>
      <div className={classNames("left-menu", visibleMenu ? "active" : "")}>
        <div className="left-menu__header">
          <Link className="left-menu__link" to="/">
            <img src={home} alt="" className="left-menu__icon" />
            <span className="left-menu__link-main">Главная</span>
          </Link>
          <img
            src={times}
            alt=""
            className="left-menu__icon"
            onClick={closemenu}
          />
        </div>
        <div className="left-menu__body">
          <SearchInput className={"left-menu__search"} />

          <div className="left-menu__contacts">
            <a href="" className="left-menu__link">
              <img src={phone} alt="" className="left-menu__icon" />
              <span className="left-menu__link-number">
                +380 (50) 300 00 00
              </span>
            </a>

            <a href="" className="left-menu__link">
              <img src={phone} alt="" className="left-menu__icon" />
              <span className="left-menu__link-number">
                +380 (50) 300 00 00
              </span>
            </a>

            <a href="" className="left-menu__link">
              <img src={phone} alt="" className="left-menu__icon" />
              <span className="left-menu__link-number">
                +380 (50) 300 00 00
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftMenu;
