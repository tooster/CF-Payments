<template>
  <div class="home">
    <div>
      {{message}}
      {{ moment(new Date()).format("DD/MM/YYYY - HH:mm:ss") }}
      <h1>Create a new transaction</h1>
      <v-card class="pa-4">
        <v-text-field
              label="Amount"
              placeholder="10.00"
              prefix="€"
              outlined
              clearable
              type="number"
              v-model="transaction.amount"
            ></v-text-field>
        <v-text-field
              label="Reference"
              placeholder="Order #34"
              outlined
              clearable
              v-model="transaction.reference"
            ></v-text-field>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" @click="createPayment">Create</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <div>
      <h1>Transactions</h1>
      <v-row class="transaction-list">
        <v-col v-for="transaction in transactions" :key="transaction.reference">
          <TransactionCard v-bind:transaction=transaction></TransactionCard>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';
import TransactionCard from '../components/TransactionCard.vue';

export default {
  name: 'home',
  components: {
    TransactionCard,
  },
  data() {
    return {
      transaction: {},
      message: null,
    };
  },
  methods: {
    createPayment() {
      this.axios.post('https://icapps-nodejs-cashfree-api-sta.herokuapp.com/api/internetpayments/', {
        apiKey: '0be934cd-9e94-4df9-8426-72a4e8e03d34',
        amount: this.transaction.amount,
        profileID: 'ef57edf1-b866-41ac-aeb5-3d0351687703',
        successURL: 'http://test.test',
        failureURL: 'http://test.test',
        webhookURL: 'http://test.test',
        clientReference: this.transaction.reference,
      })
        .then((response) => {
          this.message = response.data;
          this.$store.dispatch('createPayment', {
            id: response.data.transactionId,
            created: moment(new Date()).format('DD/MM/YYYY - HH:mm:ss'),
            amount: this.transaction.amount,
            status: 'UNPAID',
            reference: this.transaction.reference,
            url: `${response.data.paymentURL}?env=staging`,
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
