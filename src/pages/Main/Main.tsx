import axios from 'axios'
import { useEffect, useRef } from 'react'
import ProductCard from '../../components/Product-card/Product-card'
import LoadingPreview from '../../components/Product-card/Loading-preview'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { setProducts, setProductsLoaded } from '../../store/slices/productSlice'
import SimpleSlider from '../../components/Slider/Slick-slider'
import Categories from '../../components/Categories/Categories'

function Main() {
    const dispatch = useAppDispatch()

    const items = useAppSelector((state) => state.products.items)
    const isLoaded = useAppSelector((state) => state.products.isLoaded)

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(setProductsLoaded(false))
        axios.get('http://elfbar-shop/?action=getPopularProducts').then(function (response) {
            dispatch(setProducts(response.data))
        })
    }, [])

    const categoriesRef = useRef<HTMLHeadingElement>(null!)

    const executeScroll = () => {
        const categoriesHeight = categoriesRef.current.offsetTop - 55
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
                    {isLoaded
                        ? items.map((obj) => <ProductCard key={obj.id} {...obj} />)
                        : [...new Array(8)].map((_, index) => <LoadingPreview key={index} />)}
                </div>
            </section>
        </div>
    )
}

export default Main
