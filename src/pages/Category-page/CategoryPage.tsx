import { useEffect } from 'react'
import ProductCard from '../../components/Product-card/Product-card'
import LoadingPreview from '../../components/Product-card/Loading-preview'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useParams } from 'react-router-dom'
import { setProducts, setProductsLoaded } from '../../store/slices/productSlice'
import axios from 'axios'
import { Sortitem } from '../../types'
import Select from '../../components/Select/Select'

const CategoryPage = () => {
    const items = useAppSelector((state) => state.products.items)
    const category = useAppSelector((state) => state.categories.category)
    const sortBy = useAppSelector((state) => state.filters.sortBy)
    const isLoaded = useAppSelector((state) => state.products.isLoaded)

    const { id } = useParams()
    const categoryLink = category ? category : id

    const dispatch = useAppDispatch()

    useEffect(() => {
        window.scrollTo({ top: 0 })
        dispatch(setProductsLoaded(false))
        axios
            .get(
                'http://elfbar-shop/?action=getCategoryProducts&category=' +
                    categoryLink +
                    '&sort=' +
                    sortBy.type +
                    '&order=' +
                    sortBy.order
            )
            .then(function (response) {
                dispatch(setProducts(response.data))
            })
    }, [sortBy])

    const sortItems: Sortitem[] = [
        { name: 'популярности', type: 'rating', order: 'desc' },
        { name: 'наличию', type: 'available', order: 'desc' },
        { name: 'цене', type: 'actualPrice', order: 'asc' },
        { name: 'алфавиту', type: 'name', order: 'asc' },
    ]

    return (
        <div className="container">
            <div className="category-page">
                <div className="category-page__header">
                    <Select sortItems={sortItems} activeSortType={sortBy} />
                </div>

                <div className="category-page__body">
                    {isLoaded
                        ? items.map((obj) => <ProductCard key={obj.id} {...obj} />)
                        : [...new Array(8)].map((_, index) => <LoadingPreview key={index} />)}
                </div>
            </div>
        </div>
    )
}

export default CategoryPage
