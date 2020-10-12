import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    items: [],
    checkoutStatus: null
  },

  mutations: {
    pushProductToCart (state, productId) {
      state.items.push({
        id: productId,
        quantity: 1
      })
    },

    incrementItemQuantity (_, cartItem) {
      cartItem.quantity++
    },

    emptyCart (state) {
      state.items = []
    },

    setCheckoutStatus (state, status) {
      state.checkoutStatus = status
    }
  },

  getters: {
    cartProducts (state, _, rootState) {
      return state.items.map(item => {
        const product = rootState.products.all.find(p => p.id === item.id)
        return { ...item, ...product }
      })
    },

    cartTotal (_, getters) {
      return getters.cartProducts.reduce((total, p) => total + p.quantity * p.price, 0)
    }
  },

  actions: {
    checkout ({ state, commit }) {
      shop.buyProducts(state.items, () => {
        commit('emptyCart')
        commit('setCheckoutStatus', 'success')
      }, () => {
        commit('setCheckoutStatus', 'fail')
      })
    },

    addProductToCart ({ state, commit, _, rootGetters }, product) {
      if (!rootGetters['products/productIsInStock'](product)) {
        return
      }

      const cartItem = state.items.find(item => item.id === product.id)

      if (!cartItem) {
        commit('pushProductToCart', product.id)
      } else {
        commit('incrementItemQuantity', cartItem)
      }

      commit('products/decrementProductInventory', product, { root: true })
    }
  }
}
