<template>
  <v-container>
    <v-card class="mx-auto pa-4">
      <v-row>
        <v-col>
          <h1>{{transaction.reference}}</h1>
          <p class="headline">amount: {{transaction.amount}}€</p>
          <p>created: {{transaction.created}}</p>
          <p>Transaction {{this.$route.params.id}}</p>
          <p>status: {{transaction.status}}</p>
        </v-col>
        <v-col>
          <qriously :value=transaction.url size="300" />
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    transaction() {
      return this.$store.state.transactions.find(tran => tran.id === this.$route.params.id);
    },
  },
};
</script>
