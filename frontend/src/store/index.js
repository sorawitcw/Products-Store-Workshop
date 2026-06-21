import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: JSON.parse(localStorage.getItem("cart")) || []
  },

  mutations: {
    addToCart(state, product) {
      const existing = state.cart.find(
        item => item.productcode === product.productcode
      )

      if (existing) {
        existing.quantity++
      } else {
        state.cart.push({
          productcode: product.productcode,
          productname: product.productname,
          price: product.price,
          quantity: 1
        })
      }

      localStorage.setItem("cart", JSON.stringify(state.cart))
    }
  }
})