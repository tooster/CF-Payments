<template>
  <v-container>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      transaction: {},
    };
  },
  methods: {
    createPayment() {
      this.$store.dispatch('createPayment', this.transaction);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
