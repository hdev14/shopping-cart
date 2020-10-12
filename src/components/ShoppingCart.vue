<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} - {{ product.price | currency }} - {{ product.quantity }}
      </li>
      <span>TOTAL: {{ total | currency }}</span>
      <button @click="$store.dispatch('checkout')">Checkout!</button>
      <span v-if="$store.state.checkoutStatus">{{ $store.state.checkoutStatus }}</span>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    products () {
      return this.$store.getters.cartProducts
    },
    total () {
      return this.$store.getters.cartTotal
    }
  }
}
</script>

<style>

</style>
