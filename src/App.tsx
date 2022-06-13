import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/Layouts/MainLayout'
import { CategoryPage, Main } from './pages'
import Cart from './pages/Cart/Cart'
import ProductPage from './pages/Product-page/Product-page'

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Main />} />
                    <Route path="/category-page/:link" element={<CategoryPage />} />
                    <Route path="/product-page/:link" element={<ProductPage />} />
                    <Route path="/checkout" element={<Cart />} />
                    {/* <Route path="*" element={<NotFoundPage/>} /> */}
                </Route>
            </Routes>
        </>
    )
}

export default App
