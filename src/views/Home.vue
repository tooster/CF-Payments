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
        <v-col v-for="transaction in transactions" :key="transaction.reference" :cols="3">
          <v-card class="mx-auto">
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">{{transaction.created}}</div>
                <v-list-item-title class="headline mb-1">
                  {{transaction.amount}}€
                </v-list-item-title>
                <v-list-item-subtitle>{{transaction.reference}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="info">{{transaction.status}}</v-btn>
              <v-btn text :to="{
                name: 'payment-detail',
                params: {id: transaction.id}
                }">Details</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import moment from 'moment';

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
            created: moment(new Date()).format('DD/MM/YYYY - HH:mm:ss'),
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
