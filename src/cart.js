import api from './api'

export default function createCart() {
  return {
    coupon: null,
    items: [],
    add(item) {
      const localItem = this.items.find((product) => product.id === item.id)

      if (localItem) {
        localItem.qty += 1
      } else {
        item.qty = 1
        this.items.push(item)
      }
    },
    remove(id) {
      const item = this.items.find((product) => product.id === id)

      if (!item) {
        throw new Error(`Item ${id} does not exist in the cart.`)
      }

      // Increase quantity if item already exists in the cart
      if (item.qty > 1) {
        item.qty--
        return
      }

      this.items = this.items.filter((product) => product !== item)
    },
    orderTotal() {
      return this.items.reduce(
        (accumulator, current) => current.price * current.qty + accumulator,
        0
      )
    },
    itemCount() {
      return this.items.reduce(
        (accumulator, current) => current.qty + accumulator,
        0
      )
    },
    async checkout(user) {
      try {
        await api.isAuthenticated(user)
      } catch (e) {
        throw new Error('Unauthorized. Please log in')
      }

      if (this.items.length === 0) {
        throw new Error('Cart is empty')
      }

      const itemsOutOfStock = this.items.filter((item) => item.qty > item.stock)

      if (itemsOutOfStock.length > 0) {
        throw new Error(
          `Sorry! We're out of ${itemsOutOfStock[0].name} from ${itemsOutOfStock[0].brand}`
        )
      }
      // create order (POST /user/1337/order -> this.items)
      return api.submitOrder(user, this.items)
    },
  }
}
