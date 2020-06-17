export default {
  isAuthenticated(user) {
    if (!user) {
      throw new Error('User is undefined')
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve(true) : reject(false)
      }, 1000)
    })
  },
  submitOrder(user, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve(`/user/${user.id}/confirmation`)
          : reject('Something went wrong')
      }, 1000)
    })
  },
}
