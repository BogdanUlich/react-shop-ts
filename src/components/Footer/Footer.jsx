import { Link } from "react-router-dom";
import TelegramIcon from "@mui/icons-material/Telegram";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
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
          Этот продукт содержит химические вещества, которые вызывают рак,
          врожденные дефекты или другие нарушения репродуктивной системы.
        </div>
        <div className="footer__icons">
          <a href="" className="footer__icon footer__icon_telegram">
            <TelegramIcon />
          </a>
          <a href="" className="footer__icon footer__icon_instagram">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
