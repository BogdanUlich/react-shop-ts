import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { searchProduct } from "../../api";
import { Link } from "react-router-dom";

const SearchInput = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [visibleSearchList, setVisibleSearchList] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    document.body.addEventListener("click", closeSearchList);
  }, []);

  const onInputChange = (productname) => {
    searchProduct(productname, showProducts, toggleVisibleSearchList);
    setInputValue(productname);
  };

  const onInputFocus = () => {
    products.length > 0 ? setVisibleSearchList(true) : null;
  };

  const clearInputValue = () => {
    setInputValue("");
    setProducts(false);
  };

  const showProducts = (obj) => {
    obj ? setProducts(Object.values(obj)) : setProducts(false);
  };

  const toggleVisibleSearchList = (visible) => {
    setVisibleSearchList(visible);
  };

  const closeSearchList = (event) => {
    const path = event.path || (event.composedPath && event.composedPath());
    if (!path.includes(inputRef.current)) {
      setVisibleSearchList(false);
    }
  };

  return (
    <div className={classNames("search", className)}>
      <input
        value={inputValue}
        type="text"
        className="search__input"
        placeholder="Введите название товара"
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={() => onInputFocus()}
        ref={inputRef}
      />
      <button className="search__btn">
        {inputValue ? (
          <FontAwesomeIcon icon={faTimes} onClick={clearInputValue} />
        ) : (
          <FontAwesomeIcon icon={faSearch} />
        )}
      </button>
      {visibleSearchList && (
        <div className="search__list">
          {products ? (
            products.map((obj) => (
              <Link
                to={`/product-page/${obj.link}`}
                className="search__list-link"
                key={obj.id}
              >
                {obj.name}
              </Link>
            ))
          ) : (
            <span className="search__list-item">Товары не найдены</span>
          )}
        </div>
      )}
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

export default SearchInput;
