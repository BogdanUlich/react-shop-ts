import { Link } from 'react-router-dom'
import telegram from '../../assets/img/icons/telegram.png'
import instagram from '../../assets/img/icons/instagram.png'
import { FC } from 'react'

const Footer: FC = () => {
    return (
        <div className="footer">
            <div className="footer__container container">
                <div className="footer__links">
                    <Link to="/" className="footer__link">
                        Обмен и возврат
                    </Link>
                    <Link to="/" className="footer__link">
                        Доставка и оплата
                    </Link>
                </div>
                <div className="footer__text">
                    Этот продукт содержит химические вещества, которые вызывают рак, врожденные дефекты или другие
                    нарушения репродуктивной системы.
                </div>
                <div className="footer__icons">
                    <a href="" className="footer__icon footer__icon_telegram">
                        <img src={telegram} alt="" />
                    </a>
                    <a href="" className="footer__icon footer__icon_instagram">
                        <img src={instagram} alt="" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
