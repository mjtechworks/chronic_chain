<template>
  <div>
<!--    <sp-block-display-full :block="block" />-->
  </div>
</template>

<script>
export default {
  name: 'BlockView',
  data() {
    return {
      blockId: '',
    }
  },
  mounted() {
    this.blockId = this.$route.params.id
    console.log(this)
    // this.$store.dispatch('common/blocks/addBlock', this.blockId)
  },
  computed: {
    block() {
      // console.log(this.$store.getters['common/blocks/getBlockByHeight'](this.blockId))
      return this.$store.getters['common/blocks/getBlockByHeight'](this.blockId) ?? {}
    },
  },
}
</script>

<style scoped>

</style>
