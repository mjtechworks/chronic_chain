<template>
  <div>
    <Balances />
    <Delegations />
    <Undelegations />
  </div>
</template>

<script>
import Balances from '@/components/Balances'
import Delegations from '@/components/Delegations'
import Undelegations from '@/components/Undelegations'
export default {
  name: 'MyNFT',
  components: { Undelegations, Delegations, Balances },
  mounted() {
    console.log(this.wallet)
  },
  computed: {
    wallet() {
      return this.$store.getters
    },
  },
}
</script>

<style scoped>
.my-nft {
  display: flex;
}
</style>
