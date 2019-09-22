import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transactions: [
      {
        id: 'e0293640-b564-4b7b-a41f-7a94a81e3f79',
        created: '05/09/2019 - 12:34',
        amount: 10.55,
        status: 'PENDING',
        reference: 'PYMNT - 001',
      },
      {
        id: '899530c0-bcd0-4c25-b1cf-ffaa60709eb1',
        created: '05/09/2019 - 12:34',
        amount: 9.99,
        status: 'PENDING',
        reference: 'PYMNT - 002',
      },
      {
        id: '91b158d4-efcc-4cd6-885c-f6f51018ee0d',
        created: '05/09/2019 - 12:34',
        amount: 0.55,
        status: 'PENDING',
        reference: 'PYMNT - 003',
      },
      {
        id: '750ac278-46fe-4c6c-96c8-30bd5703881e',
        created: '05/09/2019 - 12:34',
        amount: 10.55,
        status: 'PENDING',
        reference: 'PYMNT - 004',
      },
      {
        id: 'f1dff0c6-7a83-42fb-a021-571dc2782238',
        created: '05/09/2019 - 12:34',
        amount: 10.55,
        status: 'PENDING',
        reference: 'PYMNT - 005',
      },
    ],
  },
  mutations: {
    CREATE_PAYMENT(state, transaction) {
      const transactions = state.transactions.concat(transaction);
      state.transactions = transactions;
    },
  },
  actions: {
    async createPayment({ commit }, payment) {
      commit('CREATE_PAYMENT', payment);
    },
  },
  modules: {
  },
});
