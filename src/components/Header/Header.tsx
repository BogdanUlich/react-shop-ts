import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import LeftMenu from "../Left-menu/Left-menu";
import { useSelector } from "react-redux";
import Fade from "../Fade/Fade";
import { Telegram, Instagram } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchInput from "../Search-input/Search-input";
import { AppState } from "../../store/redusers";

function Header() {
  const numRef = useRef();

  const [phoneNumbers, setPhoneNumbers] = useState<Array<string>>([
    "+380 (50) 300 00 00",
    "+380 (50) 200 00 00",
    "+380 (50) 200 00 00",
    "+380 (50) 200 00 00",
  ]);

  // POPUP
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);

  useEffect(() => {
    document.body.addEventListener("click", closePopup);
  }, []);

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup);
  };

  const closePopup = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(numRef.current)) {
      setVisiblePopup(false);
    }
  };
  // POPUP

  // SCROLLTOP
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const scrollTopRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", showScrollTopArrow);
  }, []);

  const showScrollTopArrow = () => {
    if (!showScrollTop && window.pageYOffset > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  // SCROLLTOP

  // LEFTMENU
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);

  const openLeftMenu = () => {
    setVisibleMenu(true);
    setVisibleFade(true);
    document.body.style.overflow = "hidden";
  };

  const closeLeftMenu = () => {
    setVisibleMenu(false);
    setVisibleFade(false);
    document.body.style.overflow = "auto";
  };
  // LEFTMENU

  // FADE
  const [visibleFade, setVisibleFade] = useState<boolean>(false);
  // FADE

  const { totalCount } = useSelector((state: AppState) => state.cart);

  return (
    <div>
      <header className="header">
        <div className="header__container container">
          <button className="header__menu" onClick={openLeftMenu}>
            <div className="header__menu-burger">
              <span></span>
            </div>
            <span>Меню</span>
          </button>
          <Link to="/" className="header__logo">
            Logo
          </Link>
          <SearchInput className={"header__search"} />
          <div className="header__contacts">
            <a href="" className="header__contacts-link">
              <Telegram />
            </a>
            <a href="" className="header__contacts-link">
              <Instagram />
            </a>
            <div className="header__numbers">
              <span
                className="header__number header__number_label"
                onClick={toggleVisiblePopup}
                ref={numRef}
              >
                {phoneNumbers[0]}
                {/* <FontAwesomeIcon
                  className={classNames(
                    "header__number-icon",
                    visiblePopup ? "open" : ""
                  )}
                  icon={faSortDown}
                /> */}
              </span>
              <div
                className={
                  visiblePopup
                    ? "header__numbers-list open"
                    : "header__numbers-list"
                }
              >
                {phoneNumbers.map((num, index) => (
                  <a
                    href={`tel:${num}`}
                    className="header__number"
                    key={`${num}_${index}`}
                  >
                    {num}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <Link className="header__cart" to="/checkout">
            <ShoppingCartIcon className="header__cart-icon" />
            <div
              className={
                totalCount
                  ? "header__cart-amount active"
                  : "header__cart-amount"
              }
            ></div>
          </Link>
        </div>
      </header>

      <div
        className={showScrollTop ? "scroll-top active" : "scroll-top"}
        onClick={() => scrollTop()}
        ref={scrollTopRef}
      >
        {/* <FontAwesomeIcon icon={faArrowCircleUp} /> */}
      </div>

      <LeftMenu onClick={closeLeftMenu} visibleMenu={visibleMenu} />

      <Fade onClick={closeLeftMenu} visibleFade={visibleFade} />
    </div>
  );
}

export default Header;
