import React, { Component } from "react"
import Slider from "react-slick"
import banner from "../../assets/img/banners/banner.jpg"
import banner2 from "../../assets/img/banners/banner2.jpg"

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div className="slider">
        <Slider {...settings}>
          <div className="slider__item">
            <img className="slider__img" src={banner} alt="" />
          </div>
          <div className="slider__item">
            <img className="slider__img" src={banner2} alt="" />
          </div>
        </Slider>
      </div>
    )
  }
}
