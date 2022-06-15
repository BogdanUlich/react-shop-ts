import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import LeftMenu from '../Left-menu/Left-menu'
import ScrollTop from '../Scroll-top/ScrollTop'

const MainLayout: FC = () => {
    return (
        <div className="wrapper">
            <Header />
            <LeftMenu />
            <Outlet />
            <Footer />
            <ScrollTop />
        </div>
    )
}

export default MainLayout
