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
        url: 'https://www.cashfree.be/payment/en/66019f5a-2aa4-44fa-a203-33dc31b8b591?env=staging',
      },
    ],
  },
  mutations: {
    CREATE_PAYMENT(state, transaction) {
      state.transactions.push(transaction);
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
