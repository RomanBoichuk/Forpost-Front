import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    creditClients: [],
    oneCreditClient: [],
    searchClient: 0,
    creditContracts: []
  },
  mutations: {
    // Запис усіх кредитних клієнтів у стор
    SET_CREDIT_CLIENTS_TO_STORE (state, creditClientsApiData) {
      state.creditClients = creditClientsApiData
    },
    // Запис одного кредитного клієнтів отриманого по id у стор
    SET_ONE_CREDIT_CLIENT_TO_STORE (state, oneCreditClient) {
      state.oneCreditClient = oneCreditClient
    },
    // Запис знайденого клієнта по ІПН в стор
    SET_SEARCH_CLIENT_TO_STORE (state, searchClient) {
      state.searchClient = searchClient
    },
    // Запис усіх КРЕДИТНИХ ДОГОВОРІВ у стор
    SET_CREDIT_CONTRACTS_TO_STORE (state, creditContractsApiData) {
      state.creditContracts = creditContractsApiData
    }
  },
  actions: {
    // Отримання усіх кредитних клієнтів з сервера та передача їх у mutation
    async GET_CREDIT_CLIENTS_FROM_API ({ commit }) {
      try {
        const creditClientsApiData = await Axios.get('http://localhost:3000/clients')
        commit('SET_CREDIT_CLIENTS_TO_STORE', creditClientsApiData.data)
      } catch (err) {
        console.log(err)
      }
    },
    // Отримання одного клієнта по id з сервера передача його у mutations для передачі в Profile
    async GET_ONE_CREDIT_CLIENT ({ commit }, id) {
      try {
        const oneCreditClient = await Axios.get('http://localhost:3000/clients/' + id)
        commit('SET_ONE_CREDIT_CLIENT_TO_STORE', oneCreditClient.data)
      } catch (err) {
        console.log(err)
      }
    },
    // Зміна даних по клієнту та відправка на сервер в базу даних
    UPDATE_CLIENT ({ commit }, { id, clientProfileData }) {
      console.log(id, clientProfileData)
      Axios.put('http://localhost:3000/clients/' + id, clientProfileData)
      console.log('ALLOHA')
    },
    // Пошук кдієнта по ІПН, отримання даних з сервера та передача даних в mutations
    async SEARCH_CLIENT ({ commit }, ipn) {
      try {
        const searchClient = await Axios.get(`http://localhost:3000/clients/search?ipn=${ipn}`)
        commit('SET_SEARCH_CLIENT_TO_STORE', searchClient.data)
      } catch (err) {
        console.log(err)
      }
    },
    // Отримання усіх кредитних ДОГОВОРІВ з сервера
    async GET_CREDIT_CONTRACTS_FROM_API ({ commit }) {
      console.log('get all credit contracts from API')
      try {
        const creditContractsApiData = await Axios.get('http://localhost:3000/creditcontracts')
        commit('SET_CREDIT_CONTRACTS_TO_STORE', creditContractsApiData.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  modules: {
  },
  getters: {
    // CLIENT_PROFILE: (state) => (id) => {
    //   return state.creditClients.filter(item => item._id === id)
    // }
  }
})
