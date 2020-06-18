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

it('has the correct structure', () => {
  const item = createItem()

  expect(item).toEqual(
    expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      brand: expect.any(String),
      price: expect.any(Number),
      beforePrice: expect.any(Number),
      stock: expect.any(Number),
    })
  )
})

it('should not have double dashes in slug', () => {
  const item = createItem({ brand: 'Playmaxx', name: 'Bumblebee      Yo-yo' })
  expect(item.slug).not.toContain(expect.stringContaining('--'))
})
