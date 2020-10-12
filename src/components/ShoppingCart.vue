<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
      <span>TOTAL: {{ total | currency }}</span>
      <button @click="checkout">Checkout!</button>
      <span v-if="checkoutStatus">{{ checkoutStatus }}</span>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('cart', {
      products: 'cartProducts',
      total: 'cartTotal'
    }),

    ...mapState({
      checkoutStatus: state => state.cart.checkoutStatus
    })
  },

  methods: {
    ...mapActions('cart', ['checkout'])
  }
}
</script>

<style>

</style>
