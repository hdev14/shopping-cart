import shop from '@/api/shop'

export default {
  namespaced: true,

  state: {
    all: []
  },

  mutations: {
    setProducts (state, products) {
      state.all = products
    },

    decrementProductInventory (_, product) {
      product.inventory--
    }
  },

  getters: {
    availableProducts (state, _) {
      return state.all.filter(p => p.inventory > 0)
    },
    productIsInStock () {
      return (product) => product.inventory > 0
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
    }
  }
}
