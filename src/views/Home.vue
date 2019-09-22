<template>
  <div class="home">
    <div>
      <h1>Create a new transaction</h1>
      <div class="field">
        <label for="amount">Amount:</label>
        <input type="text" id="amount" v-model="transaction.amount">
        {{transaction.amount}}
      </div>
      <div class="field">
        <label for="reference">Reference:</label>
        <input type="text" id="reference" v-model="transaction.reference">
        {{transaction.reference}}
      </div>
      <input type="button" value="Create Payment" @click="createPayment">
    </div>

    <div>
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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {},
  data() {
    return {
      transaction: {},
      transactions: this.$store.state.transactions,
    };
  },
  methods: {
    createPayment() {
      this.$store.dispatch('createPayment', this.transaction);
    },
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
