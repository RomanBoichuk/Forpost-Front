<template>
    <div class="contracts-table">
        <pay-credit-modal-card
          v-if="modalCardVisible"
          :clientDataProp="payCreditModalCardData"
          @closeModal="closePayCreditModelCard"
        />
        <div class="content-table">
            <div class="content-table__header">
                <button class="btn btn-header" @click="showCreditAplicationModal">NEW CONTRACT
                </button>
            </div>
            <div class="content-table__inner">
                <div class="table-inner">
                    <table class="table">
                        <thead class="table__header">
                            <tr>
                                <th class="table__th number">№</th>
                                <th class="table__th table-clients__name">Клієнт</th>
                                <th class="table__th table-clients__ipn">IPN</th>
                                <th class="table__th table-clients__name">№договору</th>
                                <th class="table__th table-clients__name">Дата видачі</th>
                                <th class="table__th table-clients__name">Дата погашення</th>
                                <th class="table__th table-clients__name">Термін</th>
                                <th class="table__th table-clients__name">Суми позики</th>
                                <th class="table__th table-clients__name">Залишок</th>
                                <th class="table__th table-clients__name">% ставка</th>
                                <th class="table__th">ACTION</th>
                                <th class="table__th">ACTION</th>
                                <th class="table__th">ACTION</th>
                            </tr>
                        </thead>
                        <tbody class="table__body">
                            <tr class="table__tr" v-for="(creditContract, index) in creditContractsData" :key="creditContract.id">
                                <td class="table__td table__number">{{ index + 1 }}</td>
                                <td class="table__td table-clients__name">
                                    {{ creditContract.client.client_firstName }}
                                    {{ creditContract.client.client_secondName }}
                                    {{ creditContract.client.client_surName }}
                                </td>
                                <td class="table__td">{{ creditContract.client.client_IPN }}</td>
                                <td class="table__td">{{ creditContract.contract_number }}</td>
                                <td class="table__td">{{ convertDateTime(creditContract.create_aplication_date)}}</td>
                                <td class="table__td">{{ convertDateTime(creditContract.credit_contract_end_date)}}</td>
                                <td class="table__td">{{ creditContract.credit_mounthTerm }}</td>
                                <td class="table__td">{{ creditContract.credit_sum }}</td>
                                <td class="table__td">8563,00</td>
                                <td class="table__td">{{ creditContract.credit_percent }}</td>
                                <td class="table__td">
                                    <button class="btn btn-delete"
                                      @click="showPayModalCard(creditContract)"
                                    >ОПЛАТИТИ
                                    </button>
                                </td>
                                <td class="table__td">
                                    <button class="btn btn-open">OPEN</button>
                                </td>
                                <td class="table__td">
                                    <button class="btn btn-open">ВИДАТИ</button>
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
import PayCreditModalCard from '../ModalCard/PayCreditModalCard.vue'
import moment from 'moment'

export default {
  name: 'ClientsListTable',
  components: {
    PayCreditModalCard
  },
  data () {
    return {
      modalCardVisible: false,
      payCreditModalCardData: {}
    }
  },
  props: [
    'creditContractsData'
  ],
  methods: {
    showCreditAplicationModal () {
      console.log('HELLO Contract')
      this.$emit('showCreditAplicationModal', false)
    },
    convertDateTime (data) {
      return moment(data).format('DD.MM.YYYY')
    },
    showPayModalCard (data) {
      console.log('showPayModalCard')
      this.payCreditModalCardData = data
      console.log(data, 111)
      this.modalCardVisible = true
    },
    closePayCreditModelCard (data) {
      this.modalCardVisible = data
    }
  },
  mounted () {
    this.convertDateTime()
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
</style>
