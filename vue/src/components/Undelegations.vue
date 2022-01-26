<template>
  <div class='container'>
    <div v-if="!undelegations.length" class="table-container">
      <h1>Unstaking</h1>
      <TableContainer :length="undelegations.length" :columns="properties" :sort="sort">
        <ValidatorRow
          v-for="(undelegation, index) in undelegations"
          :key="undelegation.validatorAddress + undelegation.startHeight"
          :index="index"
          :validator="undelegation.validator"
          :undelegation="undelegation"
        />
      </TableContainer>
      <!-- <ModalWithdrawUnstaked ref="WithdrawModal" /> -->
    </div>
  </div>
</template>

<script>
import TableContainer from '@/components/TableContainer'
import ValidatorRow from '@/components/ValidatorRow'

export default {
  name: `Undelegations`,
  components: { ValidatorRow, TableContainer },
  data: () => ({
    sort: {
      property: `endTime`,
      order: `desc`,
    },
  }),
  computed: {
    undelegations() {
      console.log(
        this.$store.getters['cosmos.staking.v1beta1/getDelegatorUnbondingDelegations']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        }),
      )
      return (
        this.$store.getters['cosmos.staking.v1beta1/getDelegatorUnbondingDelegations']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        })?.balances ?? []
      )
    },
    balances() {
      return this.undelegations.map((undelegation) => {
        return {
          ...undelegation,
          total: undelegation.amount,
          denom: 'cgas',
        }
      })
    },
    readyUndelegations() {
      const now = new Date()
      return !!this.undelegations.find(({ endTime }) => {
        return new Date(endTime) <= now
      })
    },
    properties() {
      return [
        {
          title: `Status`,
          value: `status`,
        },
        {
          title: `Name`,
          value: `smallName`,
        },
        {
          title: `End Time`,
          value: `endTime`,
        },
      ]
    },
  },
  methods: {
    onWithdraw() {
      this.$refs.WithdrawModal.open()
    },
  },
}
</script>
<style scoped>
.table-container {
  margin: 0 auto;
  width: 100%;
  padding: 3rem 4rem;
  background: white;
  border-radius: 2rem;
}

@media screen and (max-width: 1023px) {
  .table-container {
    padding-left: 3rem;
    padding-right: 3rem;
  }
}

@media screen and (max-width: 667px) {
  .table-container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>
