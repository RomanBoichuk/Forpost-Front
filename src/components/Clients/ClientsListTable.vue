<template>
    <div class="clients-list">
        <div class="content-table">
            <div class="content-table__header">
                <div>
                  <button
                    class="btn btn-header"
                    @click="createNewClient()"
                  >New Client
                  </button>
                </div>
            </div>
            <div class="content-table__inner">
                <div class="table-inner">
                    <table class="table">
                        <thead class="table__header">
                            <tr>
                              <th class="table__th number">№</th>
                              <th class="table__th table-clients__name">Прізвище</th>
                              <th class="table__th table-clients__name">Ім'я</th>
                              <th class="table__th table-clients__name">По батькові</th>
                              <th class="table__th table-clients__ipn">IPN</th>
                              <th class="table__th">ACTION</th>
                              <th class="table__th">ACTION</th>
                            </tr>
                        </thead>
                        <tbody class="table__body">
                            <tr class="table__tr" v-for="(creditClient, index) in creditClientsData" :key="creditClient._id">
                              <td class="table__td table__number">{{index + 1}}</td>
                              <td class="table__td table-clients__name">{{ creditClient.client_firstName }}</td>
                              <td class="table__td">{{ creditClient.client_secondName }}</td>
                              <td class="table__td">{{ creditClient.client_surName }}</td>
                              <td class="table__td">{{ creditClient.client_IPN }}</td>
                              <td class="table__td">
                                  <button class="btn btn-delete">Delete</button>
                              </td>
                              <td class="table__td">
                                  <button class="btn btn-open" @click="openClientProfile(creditClient)">Open</button>
                              </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ClientsListTable',
  data () {
    return {
    }
  },
  props: [
    'creditClientsData'
  ],
  methods: {
    createNewClient () {
      this.$router.push('/clientAnketa')
    },
    openClientProfile (creditClient) {
      this.$router.push({
        name: 'ProfileClient',
        query: { id: creditClient._id, surname: creditClient.client_firstName }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.table{
  &__number{
    width: 30px;
    overflow: hidden;
  }
  &__name{
    max-width: 90px;
    overflow: hidden;
  }
  &__ipn{
    width: 196px;
  }
}
</style>
