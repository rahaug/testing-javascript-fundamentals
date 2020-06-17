import Item from '../item'
import { commerce, random } from 'faker/locale/en_US'

export default (overrides = {}) => {
  return new Item({
    ...{
      id: random.number(),
      brand: commerce.productAdjective(),
      name: commerce.product(),
      price: Number(commerce.price()),
      stock: random.number({ min: 0, max: 100 }),
    },
    ...overrides,
  })
}
