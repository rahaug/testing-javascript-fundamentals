import Item from '../src/item'
import createItem from '../src/factories/item-factory'

it('should return full name', () => {
  const item = new Item({ brand: 'RC', name: 'Cola' })
  expect(item.fullName).toBe('RC Cola')
})

it('should return slug', () => {
  const item = new Item({ brand: 'Super Soaker', name: '3000' })
  expect(item.slug).toBe('super-soaker-3000')
})

it('is marked as discounted when beforePrice is higher than price', () => {
  const item = new Item({ price: 99, beforePrice: 149 })
  expect(item.isDiscounted).toBe(true)
  expect(item.discount).toBeGreaterThan(0)
})
