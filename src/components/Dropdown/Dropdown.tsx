import { FC, useEffect, useRef, useState } from "react"
import arrowDown from "../../assets/img/icons/arrow-down.svg"
import classNames from "classnames"

interface DropdownProps {
  listItems: string[]
  className: string
}

const Dropdown: FC<DropdownProps> = ({ listItems, className }) => {
  const [visiblePopup, setVisiblePopup] = useState<boolean>(false)

  const numRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    document.body.addEventListener("click", closePopup)
  }, [])

  const toggleVisiblePopup = () => {
    setVisiblePopup(!visiblePopup)
  }

  const closePopup = (event: any) => {
    const path = event.path || (event.composedPath && event.composedPath())
    if (!path.includes(numRef.current)) {
      setVisiblePopup(false)
    }
  }

  return (
    <div className={classNames(className, "dropdown")}>
      <span
        className="dropdown__label"
        onClick={toggleVisiblePopup}
        ref={numRef}
      >
        {listItems[0]}
        <img
          src={arrowDown}
          alt=""
          className={classNames("dropdown__arrow", visiblePopup ? "open" : "")}
        />
      </span>
      <div className={classNames("dropdown__list", visiblePopup ? "open" : "")}>
        {listItems.map((num, index) => (
          <a
            href={`tel:${num}`}
            className="hdropdown__list-item"
            key={`${num}_${index}`}
          >
            {num}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Dropdown
