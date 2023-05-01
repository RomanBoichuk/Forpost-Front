<template>
  <div class="clients">
    <h1>CLIENTS</h1>
    <clients-list-table
      :creditClientsData="creditClients"
    />
  </div>
</template>

<script>
import ClientsListTable from '@/components/Clients/ClientsListTable.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Clients',
  components: {
    ClientsListTable
  },
  computed: {
    ...mapState([
      'creditClients'
    ])
  },
  methods: {
    ...mapActions([
      'GET_CREDIT_CLIENTS_FROM_API'
    ])
  },
  mounted () {
    this.GET_CREDIT_CLIENTS_FROM_API()
  }
}
</script>
