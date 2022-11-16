import {Component} from 'react'

import Payment from '../Payment'
import CartItem from '../CartItem'
import CartTotal from '../CartTotal'

import CartContext from '../../context/CartContext'

import './index.css'

class CartList extends Component {
  state = {
    isOrderPlaced: false,
  }

  orderPlaced = () => {
    this.setState(prevState => ({isOrderPlaced: !prevState.isOrderPlaced}))
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const stringifiedCartList = localStorage.getItem('cartData')
          const parsedCartList = JSON.parse(stringifiedCartList)
          return isOrderPlaced ? (
            <Payment />
          ) : (
            <div className="cart-content">
              <div className="cart-headers">
                <p className="cart-header-items">Item</p>
                <div className="quantity-price">
                  <p className="cart-header-quantity">Quantity</p>
                  <p className="cart-header-price">Price</p>
                </div>
              </div>
              <ul className="cart-list">
                {parsedCartList.map(eachItem => (
                  <CartItem
                    key={eachItem.id}
                    cartItem={eachItem}
                    value={value}
                  />
                ))}
              </ul>
              <CartTotal orderPlaced={this.orderPlaced} />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartList
