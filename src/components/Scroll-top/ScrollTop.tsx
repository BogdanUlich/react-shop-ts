import classNames from "classnames"
import { useEffect, useRef, useState } from "react"
import arrow from "../../assets/img/icons/scroll-top-arrow.png"

const ScrollTop = () => {
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false)

  const scrollTopRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    window.addEventListener("scroll", showScrollTopArrow)
  }, [])

  const showScrollTopArrow = () => {
    if (!showScrollTop && window.pageYOffset > 300) {
      setShowScrollTop(true)
    } else {
      setShowScrollTop(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={classNames("scroll-top", showScrollTop ? "active" : "")}
      onClick={() => scrollTop()}
      ref={scrollTopRef}
    >
      <img src={arrow} alt="" />
    </div>
  )
}

export default ScrollTop
