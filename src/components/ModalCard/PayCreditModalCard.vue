<template>
    <div class="aplication">
        <div class="aplication__wrapper">
            <h2 class="pt-2 pb-2">Оплата кредиту F138</h2>
            <p>{{dateOfPayment.toLocaleString("uk-UA", {year: 'numeric', month: 'long', day: 'numeric'}) }}</p>
            <v-icon color="#213342" class="aplication__icon-close" @click="closeModal">
                mdi-close-circle
            </v-icon>
            <div class="aplication__content ml-n1 mr-n1">
              <p class="aplication__content-title">Платник</p>
              <p class="aplication__content-text" ref="paymentPerson">
                {{ clientDataProp.client.client_firstName }}
                {{ clientDataProp.client.client_secondName }}
                {{ clientDataProp.client.client_surName }}
              </p>
              <p class="aplication__content-title">ІПН платника</p>
              <p class="aplication__content-text">{{ clientDataProp.client.client_IPN }}</p>
              <p class="aplication__content-title">рахунок зарахування</p>
              <p class="aplication__content-text">29091234567891F131</p>
              <hr class="mb-3">
              <p class="aplication__content-title">рахунок отримувача</p>
              <select name="select" style="margin-bottom: 5px;" v-model="selected">
                <option v-for="acount in recipientAсcount" v-bind:value="acount" :key="acount">
                  {{ acount }}
                </option>
              </select>
              <p class="aplication__content-title">Отримувач</p>
              <p class="aplication__content-text">Кредитна спілка "FORPOST"</p>
              <hr class="mb-3">
              <div class="aplication__content-pay">
                <p class="aplication__content-text">Сума платежу</p>
                <input type="text" class="aplication__content-input" v-model="paymentAmount">
              </div>
              <hr class="mb-3">
              <p class="aplication__content-title">Призначення:</p>
              <p class="aplication__content-text" ref="paymentPurpose">
                Погашення кредиту
                {{clientDataProp.contract_number}} від
                {{ creditCreateDate }} року
                {{ clientDataProp.client.client_firstName }}
                {{ clientDataProp.client.client_secondName }}
                {{ clientDataProp.client.client_surName }}
              </p>
            </div>
            <button class="btn" @click="payCredit()">ОПЛАТИТИ</button>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import io from 'socket.io-client'

export default {
  name: 'PayCreditModalCard',
  components: {},
  data: () => ({
    paymentAmount: '',
    dateOfPayment: '',
    selected: 10010002023,
    recipientAсcount: [10010002023, 26250002023, 26250004149],
    socket: io()
  }),
  props: {
    clientDataProp: {}
  },
  computed: {
    creditCreateDate () {
      const creditCreateDate = moment(this.clientDataProp.create_aplication_date).format('DD.MM.YYYY')
      return creditCreateDate
    }
  },
  methods: {
    closeModal () {
      this.$emit('closeModal', false)
    },
    paymentDate () {
      const dateOfPayment = new Date()
      this.dateOfPayment = dateOfPayment
    },
    async payCredit () {
      const paymentAmount = {
        payment_date: this.dateOfPayment,
        payment_client: this.$refs.paymentPerson.innerHTML,
        peyment_clientIPN: this.clientDataProp.client.client_IPN,
        payment_clientCreditAсcount: '29091234567891F131',
        payment_recipientAсcount: this.selected,
        payment_amount: this.paymentAmount,
        payment_purpose: this.$refs.paymentPurpose.innerHTML,
        contractId: this.clientDataProp._id
      }
      console.log('payment')
      console.log(paymentAmount)
      await this.$http.post('/payments', paymentAmount)
      this.socket = io('http://localhost:3000')
      this.socket.emit('paymentToServer', (payments) => {
      })
      this.$emit('closeModal', false)
      this.$router.push('/каса')
    }
  },
  mounted () {
    this.paymentDate()
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

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
        margin-top: 10px;
        max-width: 700px;
        padding: 5px;
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

    &__content {
        border-radius: $bradius;
        padding-left: 6px;
        padding-right: 6px;
        padding-bottom: 15px;
        padding-top: 15px;
        text-align: left;
        background: #f5f5f5;
        margin-bottom: 15px;
        position: relative;
    }
    &__content-title {
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 2px;
    }
    &__content-text {
        font-size: 16px;
        font-weight: 900;
        margin-bottom: 5px;
    }
    &__content-pay {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
    &__content-input {
        line-height: 20px;
        padding: 4px 8px;
        min-width: 0;
        width: 30%;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-left: 10px;
    }
}
</style>
