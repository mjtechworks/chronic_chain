<template>
  <div class="container">
    <div class="table-container">
      <div class="header-container">
        <h1>Your Balances</h1>
        <!--      <SpButton-->
        <!--        id="claim-button"-->
        <!--        :disabled="!readyToWithdraw"-->
        <!--        value="Claim Rewards"-->
        <!--        @click.native="readyToWithdraw && openClaimModal()"-->
        <!--      />-->
      </div>
      <TableContainer :length="sortedBalances.length" :columns="properties" :sort="sort" :show-row-count="false">
        <BalanceRow
          v-for="balance in sortedBalances"
          :key="balance.id"
          :balance="balance"
          :total-rewards-per-denom="totalRewardsPerDenom"
          :send="true"
          @open-send-modal="openSendModal(balance.denom)"
        />
      </TableContainer>
      <!--    <SendModal ref="SendModal" :denoms="getAllDenoms" />-->
      <!--    <ClaimModal ref="ClaimModal" :address="session.address" :rewards="rewards" :balances="balances" />-->
    </div>
  </div>
</template>
<script>
import { orderBy } from 'lodash'
import TableContainer from '@/components/TableContainer'
import BalanceRow from '@/components/BalanceRow'
// import SendModal from '@/components/ActionModals/SendModal'

export default {
  name: `Balances`,
  components: { BalanceRow, TableContainer },
  data: () => ({
    sort: {
      property: `Available`,
      order: `desc`,
    },
  }),
  beforeMount() {
    console.log(this.$store.getters)
  },
  computed: {
    // ...mapState([`session`]),
    // ...mapState(`cosmos.bank.v1beta1`, ['balances', 'rewards']),
    balances() {
      if (!this.$store.getters['common/wallet/address']) return []
      return (
        this.$store.getters['cosmos.bank.v1beta1/getAllBalances']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        })?.balances ?? []
      )
    },
    rewards() {
      return (
        this.$store.getters['cosmos.distribution.v1beta1/getDelegationTotalRewards']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        })?.rewards ?? []
      )
    },
    readyToWithdraw() {
      return Boolean(Object.values(this.totalRewardsPerDenom).find((value) => value > 0))
    },
    getAllDenoms() {
      if (this.balances.length > 0) {
        const balances = this.balances
        return balances.map(({ denom }) => denom)
      } else {
        return ['cgas']
      }
    },
    totalRewardsPerDenom() {
      return this.rewards.reduce((all, reward) => {
        return {
          ...all,
          [reward.denom]: parseFloat(reward.amount) + (all[reward.denom] || 0),
        }
      }, {})
    },
    sortedBalances() {
      return orderBy(
        this.balances.map((balance) => ({
          ...balance,
          rewards: this.totalRewardsPerDenom[balance.denom] ? this.totalRewardsPerDenom[balance.denom].amount : 0,
        })),
        [this.sort.property],
        [this.sort.order],
      )
    },
    properties() {
      return [
        {
          title: `Total`,
          value: `total`,
        },
        {
          title: `Rewards`,
          value: `rewards`,
        },
        // {
        //   title: `Available`,
        //   value: `available`,
        // },
      ]
    },
  },
  methods: {
    openSendModal(denom = undefined) {
      this.$refs.SendModal.open(denom)
    },
    openClaimModal() {
      this.$refs.ClaimModal.open()
    },
  },
}
</script>
<style scoped>
h1 {
  padding-bottom: 0;
}

.table-container {
  width: 100%;
  padding: 3rem 4rem;
  margin: 0 auto;
  background-color: white;
  border-radius: 2rem;
}

.header-container {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 0 2rem;
  width: 100%;
}

.icon-button-container {
  margin-right: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 3rem;
}

.icon-button-container span {
  display: block;
  font-size: 0.7rem;
  text-align: center;
  color: #4a5568;
  padding-top: 2px;
}

.icon-button {
  border-radius: 50%;
  background: hsl(7, 88%, 60%);
  border: none;
  outline: none;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.25s ease;
}

.icon-button:hover {
  background: hsl(7, 88%, 55%);
  cursor: pointer;
}

.icon-button i {
  font-size: 14px;
  color: white;
  font-weight: 900;
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
