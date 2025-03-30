import React from "react"
import PropTypes from "prop-types"
import "./style.css"
import { formatPrice } from "../../utils"

function CartModal({ cart = [], onClose = () => {}, onRemoveFromCart = () => {}, totalSum = 0 }) {
  return (
    <div className="CartModal-overlay">
      <div className="CartModal">
        <div className="CartModal-header">
          <h2>Корзина</h2>
          <button className="CartModal-close" onClick={onClose}></button>
        </div>

        {cart.length === 0 ? (
          <div className="CartModal-empty">Корзина пуста</div>
        ) : (
          <ul className="CartModal-list">
            {cart.map((item) => (
              <li key={item.code} className="CartModal-item">
                <b>{item.title}</b>
                <div className="CartModal-actions">
                  <div className="CartModal-item-price">
                    <span>{item.quantity} шт</span>
                    <span>{formatPrice(item.price)} ₽</span>
                  </div>
                  <button className="CartModal-item-remove" onClick={() => onRemoveFromCart(item.code)}>
                    Удалить
                  </button>
                </div>
              </li>
            ))}
            <li className="CartModal-last-item">
              <b></b>
              <div className="CartModal-item-total-price">
                <div className="CartModal-total-text">
                  <span>Итого</span>
                  <span>{formatPrice(totalSum)} ₽</span>
                </div>
                <div className="empty"></div>
              </div>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      title: PropTypes.string,
      price: PropTypes.number,
      quantity: PropTypes.number,
    }),
  ).isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  totalSum: PropTypes.number.isRequired,
}

export default React.memo(CartModal)