import { useEffect, FC, LegacyRef } from 'react'
import { Link } from 'react-router-dom'
import LoadingPreview from './Loading-preview'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { categorySelector, fetchCategories, selectCategory } from '../../store/slices/categoriesSlice'
import Modal from '../Modal-popup/Modal'
import { CategoryItem } from '../../types/category'
import fish from '../../assets/img/gifs/fish.gif'

interface CategoriesProps {
    categoriesRef: LegacyRef<HTMLHeadingElement>
}

const Categories: FC<CategoriesProps> = ({ categoriesRef }) => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])

    const { items, loading } = useAppSelector(categorySelector)

    const onSelectCategory = (category: string) => {
        dispatch(selectCategory(category))
    }
    return (
        <section className="categories">
            <h2 ref={categoriesRef} className="main-title">
                Каталог товаров
            </h2>

            <div className="categories__container container">
                {loading === 'success'
                    ? items.map((obj: CategoryItem) => (
                          <Link
                              to={`/category-page/${obj.link}`}
                              className="category"
                              key={`${obj.link}`}
                              onClick={() => onSelectCategory(obj.link)}
                          >
                              <img
                                  className="category__img"
                                  src={require('../../assets/img/products/' + obj.img)}
                                  alt=""
                              />
                              <div className="category__name">{obj.name}</div>
                              {!obj.shw ? <div className="category__label">Нет в наличии</div> : ''}
                          </Link>
                      ))
                    : [...new Array(4)].map((_, index) => <LoadingPreview key={index} />)}
            </div>

            <Modal loading={loading}>
                <img src={fish} alt="" className="img" />
                <span>К сожалению, произошла ошибка загрузки информации. Попробуйте повторить попытку позже.</span>
            </Modal>
        </section>
    )
}

export default Categories
