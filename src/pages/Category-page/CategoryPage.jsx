import React, { useEffect } from "react"
import Sort from "../../components/Sort-popup/Sort"
import ProductCard from "../../components/Product-card/Product-card"
import { useSelector, useDispatch } from "react-redux"
import { LoadingPreview } from "../../components"
import { fetchProducts } from "../../api"

function CategoryPage() {
  const items = useSelector(({ products }) => products.items)
  const category = useSelector(({ category }) => category.category)
  const sortBy = useSelector(({ filters }) => filters.sortBy)
  const isLoaded = useSelector(({ products }) => products.isLoaded)

  const link = window.location.href.split("/").pop()
  const categoryLink = category ? category : link

  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({ top: 0 })
    dispatch(fetchProducts(categoryLink, sortBy))
  }, [sortBy])

  const sortItems = [
    { name: "популярности", type: "rating", order: "desc" },
    { name: "наличию", type: "available", order: "desc" },
    { name: "цене", type: "actualPrice", order: "asc" },
    { name: "алфавиту", type: "name", order: "asc" },
  ]

  return (
    <div className="container">
      <div className="category-page">
        <div className="category-page__header">
          <Sort sortItems={sortItems} activeSortType={sortBy} />
        </div>

        <div className="category-page__body">
          {isLoaded
            ? items.map((obj) => <ProductCard key={obj.id} {...obj} />)
            : Array(8)
                .fill(0)
                .map((_, index) => <LoadingPreview key={index} />)}
        </div>
      </div>
    </div>
  )
}

export default CategoryPage
