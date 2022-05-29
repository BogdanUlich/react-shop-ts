import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"

const Modal = ({ visibleModal, children, onClick }) => {
  return (
    <div className={visibleModal ? "modal active" : "modal"}>
      <div className="modal__header">
        <div className="modal__title"></div>
        <div className="modal__close" onClick={onClick}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="modal__body">{children}</div>
    </div>
  )
}

Modal.propTypes = {
  onClick: PropTypes.func,
  visibleModal: PropTypes.bool,
  children: PropTypes.array,
}

export default Modal
