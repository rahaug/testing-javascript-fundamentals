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
  expect(cart.items).toContainEqual(
    expect.objectContaining({
      name: item.name,
      qty: 1,
    })
  )
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

it('matches snapshot', () => {
  const cart = createCart()
  expect(cart).toMatchSnapshot()
})

describe('checkout', () => {
  it('successfully submits order', async () => {
    api.isAuthenticated = jest.fn().mockResolvedValue(true)
    const item = createItem({ stock: 10 })
    cart.add(item)
    api.submitOrder = jest.fn().mockResolvedValue('/order-confirmation')

    const url = await cart.checkout({})
    expect(url).toBe('/order-confirmation')
  })

  it('throws if user is not authenticated - 1', async () => {
    api.isAuthenticated = jest.fn().mockRejectedValue(false)

    // This way can produce false positives, because the test will pass if cart.checkout does not throw an exception
    // To solve this, we use use expect.assertions to ensure that X assertions are executed
    // We could also use the fail() helper function from Jest, in the try block
    expect.assertions(2)
    try {
      await cart.checkout({})
      //fail('Checkout did not throw as expected')
    } catch (error) {
      expect(error.message).toContain('Unauthorized')
    }
    expect(api.isAuthenticated).toHaveBeenCalled()
  })

  it('throws if user is not authenticated - 2', async () => {
    api.isAuthenticated = jest.fn().mockRejectedValue(false)

    // Another way that catches and expect on the error directly
    await cart
      .checkout({})
      .catch((e) => expect(e).toEqual(Error('Unauthorized. Please log in')))

    expect(api.isAuthenticated).toHaveBeenCalled()
  })

  it('throws if user is not authenticated - 3 (recommended)', async () => {
    api.isAuthenticated = jest.fn().mockRejectedValue(false)
    await expect(cart.checkout({})).rejects.toThrowError('Unauthorized')
    expect(api.isAuthenticated).toHaveBeenCalled()
  })

  it('throws if cart is empty', async () => {
    api.isAuthenticated = jest.fn().mockResolvedValue(true)
    await expect(cart.checkout({})).rejects.toThrow('Cart is empty')
  })
})
