<template>
  <div class="container">
    <div class="table-container">
      <h1>Your Stake</h1>
      <TableValidators
        :validators="delegations.map(({ validator }) => validator)"
        :delegations="delegations"
        :rewards="rewards"
        class="table-validators"
      >
        <template v-slot:empty>
          <div class="no-results">
            <h3>No validators in your portfolio.</h3>
            <p>
              Head over to the
              <a @click="goToValidators()">validator list</a>&nbsp;to start staking.
            </p>
          </div>
        </template>
      </TableValidators>
      <!-- <UnstakeModal ref="UnstakeModal" /> -->
    </div>
  </div>
</template>

<script>
import TableValidators from '@/components/TableValidators'

export default {
  name: `Delegations`,
  components: { TableValidators },
  mounted() {
    // this.$store.dispatch('cosmos.staking.v1beta1/QueryDelegatorDelegations')
  },
  computed: {
    delegations: function () {
      console.log(
        this.$store.getters['cosmos.staking.v1beta1/getDelegatorDelegations']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        }),
      )
      return (
        this.$store.getters['cosmos.staking.v1beta1/getDelegatorDelegations']({
          params: {
            address: this.$store.getters['common/wallet/address'],
          },
        })?.delegationResponses ?? []
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
  },
  methods: {
    goToValidators() {
      this.$router.push('/validators')
    },
    openUnstakeModal() {
      this.$refs.UnstakeModal.open()
    },
  },
}
</script>
<style scoped>
.table-container {
  margin: 3rem auto;
  padding: 4rem;
  background-color: white;
  border-radius: 2rem;
}

h3 {
  margin: 2rem 0;
}

p {
  font-size: 1.2rem;
}

.tm-form-msg--desc {
  padding-bottom: 1rem;
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
