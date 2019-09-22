<template>
  <div class="home">
    <div>
      {{message}}
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
      message: null,
    };
  },
  methods: {
    createPayment() {
      this.axios.post('https://icapps-nodejs-cashfree-api-sta.herokuapp.com/api/internetpayments/', {
        apiKey: '8382cd46-3a8d-435d-a004-69fe7c9036b5',
        amount: this.transaction.amount,
        profileID: '2458b91a-5920-45f2-89e5-2ae16bc84db5',
        successURL: 'http://test.test',
        failureURL: 'http://test.test',
        webhookURL: 'http://test.test',
        clientReference: this.transaction.reference,
      })
        .then((response) => {
          this.message = response.data;

          this.$store.dispatch('createPayment', {
            id: response.data.transactionId,
            created: new Date(),
            amount: this.transaction.amount,
            status: 'UNPAID',
            reference: this.transaction.reference,
          });
        });
    },
  },
  computed: {
    transactions() { return this.$store.state.transactions; },
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
