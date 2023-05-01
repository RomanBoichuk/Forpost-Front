<template>
    <div class="payments">
        <h1>PAYMENTS</h1>
        <payments-list-table
          :paymentsListData="paymentsList"
        />
    </div>
</template>

<script>
import PaymentsListTable from '@/components/Payments/PaymentsListTable.vue'
import io from 'socket.io-client'

export default {
  name: 'PAYMENTS',
  components: {
    PaymentsListTable
  },
  data () {
    return {
      socket: io(),
      paymentsList: [],
      socketIsOpen: false
    }
  },
  computed: {
  },
  methods: {
    receivedAllPeyments (payments) {
      this.paymentsList = payments
    }
  },
  mounted () {
    this.socket = io('http://localhost:3000')
    this.socket.on('paymentsToClient', (payments) => {
      this.receivedAllPeyments(payments)
    })
  }
}
</script>
