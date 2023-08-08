<template>
  <div class="contracts">
    <contract-aplication
      v-if="modalCardVisible"
      @closeModal="closeContractAplication"
    />
    <h1>CREDIT CONTRACTS</h1>
    <contracts-list-table
    :creditContractsData="creditContracts"
    @showCreditAplicationModal="showCreditAplicationModal"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ContractsListTable from '../components/CreditContracts/ContractsListTable.vue'
import ContractAplication from '../components/CreditContracts/Applications/ContractAplication.vue'

export default {
  name: 'CreditContracts',
  components: {
    ContractsListTable,
    ContractAplication
  },
  data: () => ({
    modalCardVisible: false
  }),
  computed: {
    ...mapState([
      'creditContracts'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CREDIT_CONTRACTS_FROM_API'
    ]),
    showCreditAplicationModal () {
      this.modalCardVisible = true
    },
    closeContractAplication (data) {
      this.modalCardVisible = data
    }
  },
  mounted () {
    this.GET_CREDIT_CONTRACTS_FROM_API()
  }
}
</script>
