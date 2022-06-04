import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { CategoryPage, Main } from './pages'
import Cart from './pages/Cart/Cart'
import ProductPage from './pages/Product-page/Product-page'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/category-page/:id" element={<CategoryPage />} />
                    <Route path="/product-page/:id" element={<ProductPage />} />
                    <Route path="/checkout" element={<Cart />} />
                    {/* <Route path="*" element={<NotFoundPage/>} /> */}
                </Route>
            </Routes>
        </>
    )
}

export default App
