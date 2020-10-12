<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="https://imgur.com/JfPpwOA.gif" alt="loading...">
    <ul v-else>
      <li v-for="product in products" :key="product.id">
        {{product.title}} - {{product.price | currency }}
        <button
          @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
        >Add to cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      loading: false
    }
  },

  created () {
    this.loading = true
    this.fetchProducts().then(() => {
      this.loading = false
    })
  },

  computed: {
    ...mapState(['products']),

    ...mapGetters(['productIsInStock'])
  },

  methods: {
    ...mapActions(['fetchProducts', 'addProductToCart'])
  }
}
</script>

<style>

</style>
