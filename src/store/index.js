import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

new Vuex.Store({
  state: {
    products: []
  },

  getters: {
    productCount () {

    }
  },

  actions: {
    fetchProducts () {

    }
  },

  mutations: {
    setProducts () {

    }
  }
})
