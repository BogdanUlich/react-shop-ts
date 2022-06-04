import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks'
import cart from '../../assets/img/icons/shopping-cart.svg'
import telegram from '../../assets/img/icons/telegram.png'
import instagram from '../../assets/img/icons/instagram.png'
import logo from '../../assets/img/icons/logo.png'
import { setMenuVisibility } from '../../store/slices/leftMenuSlice'
import SearchInput from '../Search-input/Search-input'
import Dropdown from '../Dropdown/Dropdown'
import classNames from 'classnames'

const phoneNumbers: string[] = [
    '+380 (50) 300 00 00',
    '+380 (50) 250 00 00',
    '+380 (50) 260 00 00',
    '+380 (50) 270 00 00',
]

const Header = () => {
    const dispatch = useAppDispatch()

    const openLeftMenu = () => {
        dispatch(setMenuVisibility(true))
    }

    const { totalCount } = useAppSelector((state) => state.cart)

    return (
        <div>
            <header className="header">
                <div className="header__container container">
                    <button className="header__menu" onClick={openLeftMenu}>
                        <div className="header__menu-burger">
                            <span></span>
                        </div>
                    </button>

                    <Link to="/" className="header__logo">
                        <img src={logo} className="header__logo-icon" />
                    </Link>

                    <SearchInput className={'header__search'} />

                    <div className="header__contacts">
                        <a href="" className="header__contacts-link">
                            <img src={telegram} className="header__contacts-icon" />
                        </a>

                        <a href="" className="header__contacts-link">
                            <img src={instagram} className="header__contacts-icon" />
                        </a>

                        <Dropdown listItems={phoneNumbers} className={'header__dropdown'} />
                    </div>

                    <Link className="header__cart" to="/checkout">
                        <img src={cart} className="header__cart-icon" />

                        <div className={classNames('header__cart-amount', totalCount ? 'active' : '')}>
                            {totalCount}
                        </div>
                    </Link>
                </div>
            </header>
        </div>
    )
}

export default Header
