import Vuex from 'vuex'
import Vue from 'vue'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
    checkoutStatus: null
  },

  getters: {
    availableProducts (state, _) {
      return state.products.filter(p => p.inventory > 0)
    },

    cartProducts (state, _) {
      return state.cart.map(item => {
        const product = state.products.find(p => p.id === item.id)
        return { ...item, ...product }
      })
    },

    cartTotal (state, getters) {
      return getters.cartProducts.reduce((total, p) => total + p.quantity * p.price, 0)
    },

    productIsInStock () {
      return (product) => product.inventory > 0
    }
  },

  actions,

  mutations: {
    setProducts (state, products) {
      state.products = products
    },

    pushProductToCart (state, productId) {
      state.cart.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (_, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    },

    emptyCart (state) {
      state.cart = []
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
  }
})
