import Vuex from 'vuex'
import Vue from 'vue'
import shop from '@/api/shop'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },

  getters: {
    availableProducts (state, getters) {
      return state.products.filter(p => p.inventory > 0)
    },

    cartProducts (state, getters) {
      return state.cart.map(item => {
        const product = state.products.find(p => p.id === item.id)
        return { ...item, ...product }
      })
    }
  },

  actions: {
    fetchProducts ({ commit }) {
      return new Promise((resolve, reject) => {
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    },

    addProductToCart ({ state, commit }, product) {
      if (!(product.inventory > 0)) {
        return
      }

      const cartItem = state.cart.find(item => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', product.id)
      } else {
        commit('incrementItemQuantity', cartItem)
      }

      commit('decrementProductInventory', product)
    }
  },

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

    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
    },

    decrementProductInventory (state, product) {
      product.inventory--
    }
  }
})
