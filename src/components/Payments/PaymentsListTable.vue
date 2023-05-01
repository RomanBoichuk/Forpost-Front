<template>
    <div class="table">
        <div class="content-table">
            <div class="content-table__header">
            </div>
            <div class="content-table__inner">
                <div class="table-inner">
                    <table class="table">
                        <thead class="table__header">
                            <tr>
                                <th class="table__th number">№</th>
                                <th class="table__th table-clients__name">Дата</th>
                                <th class="table__th table-clients__ipn">Дт. рах</th>
                                <th class="table__th table-clients__name">Кт. рах</th>
                                <th class="table__th table-clients__name">Платник</th>
                                <th class="table__th table-clients__name">Сума</th>
                                <th class="table__th table-clients__name">Призначення</th>
                            </tr>
                        </thead>
                        <tbody class="table__body">
                            <tr class="table__tr" v-for="(payment, index) in paymentsListData" :key="payment.id">
                                <td class="table__td table__number">{{ index + 1 }}</td>
                                <td class="table__td table-clients__name">
                                    {{ payment.payment_date }}
                                </td>
                                <td class="table__td">{{ payment.payment_clientCreditAсcount }}</td>
                                <td class="table__td">{{ payment.payment_clientCreditAсcount }}</td>
                                <td class="table__td">{{ payment.payment_client }}</td>
                                <td class="table__td">{{ payment.payment_amount }}</td>
                                <td class="table__td">{{ payment.payment_purpose }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import moment from 'moment'

export default {
  name: 'ClientsListTable',
  components: {
  },
  data () {
    return {
    }
  },
  props: [
    'paymentsListData'
  ],
  computed: {
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
.table {
    &__number {
        width: 30px;
        overflow: hidden;
    }

    &__name {
        max-width: 90px;
        overflow: hidden;
    }

    &__ipn {
        width: 196px;
    }
}

.btn-delete {
    width: 68px;

    &:hover {
        background: red;
        opacity: .8;
    }
}

.btn-open {
    width: 68px;

    &:hover {
        background: green;
        opacity: .8;
    }
}
</style>
