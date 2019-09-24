<template>
  <div class="home">
    <div>
      {{message}}
      {{endpointProd}}
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
      apiKey: process.env.VUE_APP_API,
      profileId: process.env.VUE_APP_ID,
      endpoint: process.env.VUE_APP_URL,
      production: false,
      apiKeyProd: process.env.VUE_APP_API_PROD,
      profileIdProd: process.env.VUE_APP_ID_PROD,
      endpointProd: process.env.VUE_APP_URL_PROD,
    };
  },
  methods: {
    createPayment() {
      if (this.production) {
        this.axios.post(this.endpointProd, {
          apiKey: this.apiKeyProd,
          amount: this.transaction.amount,
          profileID: this.profileIdProd,
          successURL: 'http://test.test',
          failureURL: 'http://test.test',
          webhookURL: 'https://hooks.zapier.com/hooks/catch/5556062/obg4a6v/',
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
              url: `${response.data.paymentURL}`,
            });
          });
      } else {
        this.axios.post(this.endpoint, {
          apiKey: this.apiKey,
          amount: this.transaction.amount,
          profileID: this.profileId,
          successURL: 'http://test.test',
          failureURL: 'http://test.test',
          webhookURL: 'https://hooks.zapier.com/hooks/catch/5556062/obg4a6v/',
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
      }
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
