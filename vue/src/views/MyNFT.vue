<template>
  <div>
    <Balances />
  </div>
</template>

<script>
import Balances from '@/components/Balances'
export default {
  name: 'MyNFT',
  components: { Balances },
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
