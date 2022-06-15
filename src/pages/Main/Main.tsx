import { FC, useEffect, useRef } from 'react'
import ProductCard from '../../components/Product-card/Product-card'
import LoadingPreview from '../../components/Product-card/Loading-preview'
import { useAppDispatch, useAppSelector } from '../../hooks'
import SimpleSlider from '../../components/Slider/Slick-slider'
import Categories from '../../components/Categories/Categories'
import { fetchPopularProducts, productSelector } from '../../store/slices/productSlice'
import { ProductItem } from '../../types/products'

const Main: FC = () => {
    const dispatch = useAppDispatch()

    const { items, loading } = useAppSelector(productSelector)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(fetchPopularProducts())
    }, [])

    const categoriesRef = useRef<HTMLHeadingElement>(null!)

    const executeScroll = (): void => {
        const categoriesHeight: number = categoriesRef.current.offsetTop - 55
        window.scrollTo({ top: categoriesHeight, behavior: 'smooth' })
    }

    return (
        <div className="main" id="main">
            <section className="intro">
                <div className="intro__container container">
                    <div className="intro__info">
                        <h1 className="intro__title">EMPIRE POD</h1>
                        <p className="intro__text">
                            Официальный интернет-магазин одноразовых электронных сигарет, Elf Bar, HQD, BANG,
                            оригинальная продукция, большой ассортимент
                        </p>
                        <button onClick={executeScroll} className="intro__btn btn-black">
                            Каталог
                        </button>
                    </div>
                    <SimpleSlider />
                </div>
            </section>

            <Categories categoriesRef={categoriesRef} />

            <section className="popular-products">
                <h2 className="main-title">Популярные товары</h2>
                <div className="popular-products__container container">
                    {loading === 'success'
                        ? items.map((obj: ProductItem) => <ProductCard key={obj.id} {...obj} />)
                        : [...new Array(8)].map((_, index) => <LoadingPreview key={index} />)}
                </div>
            </section>
        </div>
    )
}

export default Main
