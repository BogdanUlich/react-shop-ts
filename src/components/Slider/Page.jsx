import { useContext } from 'react'
import {SliderContext} from './Slider-context'

export const Page = ({ children }) => {
    const { width } = useContext(SliderContext)

    return <div className='slider__page'>{children}</div>
}
