import createCart from '../src/cart'
import Item from '../src/item'
import createItem from '../src/factories/item-factory'
import api from '../src/api'

let cart
beforeEach(() => {
  cart = createCart()
})

it('can add item', () => {
  const item = new Item({ name: 'Game Boy' })

  cart.add(item)

  expect(cart.items).toHaveLength(1)
  expect(cart.items[0].name).toBe(item.name)
  expect(cart.items[0]).toHaveProperty('qty')
  expect(cart.items[0].qty).toBe(1)
})

it('increases qty when adding an already added item', () => {
  const item = new Item({ name: 'Game Boy' })

  cart.add(item)
  cart.add(item)

  expect(cart.items).toHaveLength(1)
  expect(cart.items[0].qty).toBe(2)
})

it('throws if trying to remove when item does not exists', () => {
  expect(() => cart.remove(123)).toThrowError(
    'Item 123 does not exist in the cart.'
  )
})

it('removes existing item', () => {
  const item = new Item({ name: 'Game Boy' })

  cart.add(item)
  cart.remove(item.id)

  expect(cart.items).toEqual([])
})
