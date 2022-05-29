import { useEffect, FC } from "react";
import { Link } from "react-router-dom";
import { selectCategory } from "../../store/actions/category";
import { fetchCategory } from "../../api";
import LoadingPreview from "./Loading-preview";
import { useAppDispatch, useAppSelector } from "../../hooks";

type CategoriesType = {
  categoriesRef: object;
};

const Categories: FC<CategoriesType> = ({ categoriesRef }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const categories = useAppSelector((state) => state.category.items);
  const isLoaded = useAppSelector((state) => state.category.isLoaded);

  const onSelectCategory = (category: string) => {
    dispatch(selectCategory(category));
  };
  return (
    <section className="categories">
      <h2 ref={categoriesRef} className="main-title">
        Каталог товаров
      </h2>
      <div className="categories__container container">
        {isLoaded
          ? categories.map((obj) => (
              <Link
                to={`/category-page/${obj.link}`}
                className="category"
                key={`${obj.link}`}
                onClick={() => onSelectCategory(obj.link)}
              >
                <img
                  className="category__img"
                  src={require("../../assets/img/products/" + obj.img)}
                  alt=""
                />
                <div className="category__name">{obj.name}</div>
                {!obj.shw ? (
                  <div className="category__label">Нет в наличии</div>
                ) : (
                  ""
                )}
              </Link>
            ))
          : [...new Array(4)].map((_, index) => <LoadingPreview key={index} />)}
      </div>
    </section>
  );
};

export default Categories;
