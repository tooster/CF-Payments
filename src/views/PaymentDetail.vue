<template>
  <div>
    <h1> Temp </h1>
    <h3>Transaction {{this.$route.params.id}}</h3>
    <p>amount: {{transaction.amount}}€</p>
    <p>created: {{transaction.created}}</p>
    <p>status: {{transaction.status}}</p>
    <p>reference: {{transaction.reference}}</p>
  </div>
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
