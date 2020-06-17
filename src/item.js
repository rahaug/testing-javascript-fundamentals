export default class Item {
  constructor(details) {
    const { id, brand, name, stock = 0, price, beforePrice } = details
    this.id = id
    this.brand = brand
    this.name = name
    this.stock = stock
    this.price = price
    this.beforePrice = beforePrice || price
  }

  get fullName() {
    return `${this.brand} ${this.name}`
  }

  get slug() {
    return this.fullName
      .toLocaleLowerCase()
      .replace(/\s+/g, ' ') // Remove duplicate spaces
      .replace(/ /g, '-') // Replace spaces with dashes
      .replace(/-+/g, '-') // Remove duplicated dashes
  }

  get inStock() {
    return this.stock > 0
  }

  get isDiscounted() {
    return this.price < this.beforePrice
  }

  get discount() {
    return this.beforePrice - this.price
  }
}
