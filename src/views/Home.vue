<template>
  <div class="home">
    <h1>Transactions</h1>
    <div class="transaction-list">
      <div v-for="transaction in transactions" :key="transaction.reference">
        <router-link :to="{ name: 'payment-detail', params: {id: transaction.id}}">
          <div class="transaction-list-item">
            <h3>{{transaction.reference}}</h3>
            {{transaction.amount}}€ |
            {{transaction.created}} |
            {{transaction.status}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      transactions: this.$store.state.transactions,
    };
  },
};
</script>

<style scoped lang="scss">
  .transaction-list {
    .transaction-list-item {
      border: 1px solid black;
      border-radius: 2px;
      margin: 2px 0px;
    }
  }
</style>
