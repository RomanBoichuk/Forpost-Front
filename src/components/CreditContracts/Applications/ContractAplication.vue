<template>
  <div class="aplication">
    <div class="aplication__wrapper">
      <v-icon color="#213342" class="aplication__icon-close" @click="closeModal">
        mdi-close-circle
      </v-icon>
      <!-- Відображення дваних клієнта коли заходимо з Profile -->
      <div v-if="clientDataProp" class="aplication__person-data pt-2 pb-2">
        <input type="text" class="aplication__client-input" v-model="clientDataProp.client_IPN">
        <p class="aplication__content-title aplication__heder-ipn">
          {{clientDataProp.client_firstName}} {{ clientDataProp.client_secondName }} {{ clientDataProp.client_surName }}
        </p>
      </div>
      <!-- Пошук клієнта по ІПН  коли з Profile не заходимо і створюємо новий договір-->
      <div v-else class="aplication__person-data pt-2 pb-2">
        <input type="text" class="aplication__client-input" v-model="clientIpnSearch">
        <p class="aplication__content-title aplication__heder-ipn">
          {{ searchClient.client_firstName }} {{ searchClient.client_secondName }} {{ searchClient.client_surName }}
        </p>
        <button class="btn btn-change" @click="searchClientData">ШУКАТИ</button>
      </div>
      <div class="d-flex ml-n1 mr-n1">
        <!-- DIV із внесенням даних по кредиту для оформлення(сума,процент, термін) -->
        <div class="aplication__content mr-2">
          <form @submit.prevent="sendCreditAplication">
            <div class="aplication__content-row">
              <p class="aplication__content-title">Сума кредиту</p>
              <input type="text" v-model="creditSum" class="aplication__content-input">
            </div>
            <div class="aplication__content-row">
              <p class="aplication__content-title">Термін кредиту</p>
              <select class="aplication__content-select" v-model="month">
                <option v-for="term in monthTerm" v-bind:value="term" :key="term">
                  {{ term }}
                </option>
              </select>
            </div>
            <div class="aplication__content-row">
              <p class="aplication__content-title">Процентна ставка</p>
              <select class="aplication__content-select" v-model="interest">
                <option v-for="persent in percents" v-bind:value="persent" :key="persent">
                  {{ persent }}
                </option>
              </select>
            </div>
            <button
              class="btn btn-change aplication__btn"
              :class="{ disabled: buttonDisabled }"
            >
              ОФОРМИТИ
            </button>
          </form>
        </div>
        <!-- DIV із розрахунком даних кредиту(сума,процент, термін, місячний платіж) -->
        <div class="aplication__content ml-2">
          <div class="aplication__content-row">
            <p class="aplication__content-title">Сума кредиту</p>
            <input type="text" class="aplication__content-input" v-model="creditSum" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Термін міс.</p>
            <input type="text" class="aplication__content-input" v-model="month" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Процентна ставка міс.</p>
            <input type="text" class="aplication__content-input" v-model="interest" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Платіж по тілу кредиту</p>
            <input type="text" class="aplication__content-input" v-model="PaymentsDetails.paymentCreditBodyMonth" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Проценти по кредиту</p>
            <input type="text" class="aplication__content-input" v-model="PaymentsDetails.paymentMonthProcents" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Всього платіж</p>
            <input type="text" class="aplication__content-input" v-model="PaymentsDetails.paymentCreditAll" :disabled="true">
          </div>
          <div class="aplication__content-row">
            <p class="aplication__content-title">Передплата</p>
            <input type="text" class="aplication__content-input" v-model="PaymentsDetails.overpaid" :disabled="true">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// import moment from 'moment'
// import Axios from 'axios'

export default {
  name: 'ContractAplication',
  components: {},
  data: () => ({
    buttonDisabled: true,
    creditSum: '',
    month: 12,
    interest: 4,
    monthTerm: [6, 12, 18, 24, 30, 36],
    percents: [2, 2.5, 3, 4, 4.5, 5, 6, 7],
    clientIpnSearch: ''
  }),
  props: {
    clientDataProp: {}
  },
  computed: {
    PaymentsDetails () {
      const paymentCreditBodyMonth = Math.ceil(this.creditSum / this.month)
      const paymentMonthProcents = this.creditSum * (this.interest / 100)
      const paymentCreditAll = paymentCreditBodyMonth + paymentMonthProcents
      const overpaid = paymentMonthProcents * this.month
      const paymentsCreditDetails = {
        paymentCreditBodyMonth: paymentCreditBodyMonth,
        paymentMonthProcents: paymentMonthProcents,
        paymentCreditAll: paymentCreditAll,
        overpaid: overpaid
      }
      return paymentsCreditDetails
    },
    ...mapState([
      'searchClient'
    ])
  },
  methods: {
    closeModal () {
      this.$emit('closeModal', false)
    },
    async sendCreditAplication () {
      // const createCreditAplicationDate = new Date()
      // console.log(createCreditAplicationDate, 111)
      // var contractEndDate = new Date()
      // contractEndDate.setMonth(contractEndDate.getMonth() + this.selected)
      // console.log(contractEndDate, 222)
      // const creditDayTerm = Math.ceil((contractEndDate - createCreditAplicationDate) / 86400000) + 1
      // console.log(creditDayTerm, 333)
      // const createCreditAplicationDate1 = moment(createCreditAplicationDate).format('DD.MM.YYYY')
      // console.log(createCreditAplicationDate1, 4444)
      const creditContractData = {
        credit_sum: this.creditSum,
        credit_mounthTerm: this.month,
        credit_percent: this.interest,
        clientId: this.searchClient._id
      }
      await this.$http.post('/creditcontracts', creditContractData)
      console.log(creditContractData)
      console.log('secsesful send')
    },
    searchClientData () {
      const ipn = this.clientIpnSearch
      this.$store.dispatch('SEARCH_CLIENT', ipn)
    }
  },
  watch: {
    creditSum (newValue) {
      if (this.creditSum && this.clientDataProp) {
        this.buttonDisabled = false
      } else if (this.creditSum && this.searchClient) {
        this.buttonDisabled = false
      } else {
        this.buttonDisabled = true
      }
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';
.aplication {
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0;
  left: 0;
  background: rgba(249, 249, 250, 0.9);
  padding-top: 12px;
  padding-bottom: 50px;
  z-index: 11;
  &__wrapper {
    margin-left: auto;
    margin-right: auto;
    margin-top: 15px;
    max-width: 1300px;
    padding: 5px;
    padding-top: 25px;
    background: #F9F9FA;
    box-shadow: 0px 0px 4px rgba(33, 33, 33, 0.25);
    border-radius: 8px;
    position: relative;
  }
  &__icon-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(50%) translateY(-50%);
    font-size: 45px;
  }
  &__person-data {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    min-height: 76px;
    border-bottom: thin solid rgba(0, 0, 0, .12);
    border-top: thin solid rgba(0, 0, 0, .12);
  }
  &__content {
    width: 50%;
    border-radius: $bradius;
    padding-left: 6px;
    padding-right: 6px;
    padding-bottom: 15px;
    background: #f5f5f5;
    position: relative;
  }
  &__content-row {
    display: flex;
    padding: 15px;
    margin-top: 15px;
    align-items: center;
  }
  &__content-title {
    margin-right: 30px;
    padding: 12px 12px 12px 0;
    width: 150px;
    margin-bottom: 0;
    text-align: left;
  }
  &__content-input {
    width: 70%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    line-height: 25px;
  }
  &__content-select {
    width: 70%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    line-height: 25px;
  }
  &__btn {
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(-50%);
    margin-right: 21px;
  }
  &__client-input {
    width: 30%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    line-height: 25px;
    margin-right: 50px;
  }
  &__heder-ipn {
    width: 400px;
    margin-right: 329px;
  }
}
.disabled {
  pointer-events: none;
  color: rgba(0,0,0,.26)!important;
   background-color: rgba(0,0,0,.12)!important;
}
</style>
