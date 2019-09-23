<template>
  <v-card class="mx-auto">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline my-4">{{transaction.created}}</div>
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
</template>

<script>
export default {
  name: 'TransactionCard',
  props: {
    transaction: Object,
  },
};
</script>
