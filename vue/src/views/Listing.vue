<template>
  <div class="transactions">
    <div v-if="!transactionsLoaded" class="container">
      <Loader />
    </div>

    <Card v-else-if="!transactions.length" icon="receipt">
      <div slot="title">No transactions</div>
      <div slot="subtitle">
        {{ oldChainDataMessage }}
      </div>
    </Card>

    <template v-else>
      <EventList
        :events="transactions"
        :more-available="moreTransactionsAvailable"
        @loadMore="loadTransactions"
      />

      <div v-if="transactionsLoaded && transactionsLoading" class="loading-row">
        Loading...
      </div>

      <template v-if="transactionsLoaded && !moreTransactionsAvailable">
        <div class="container">
          <p>{{ oldChainDataMessage }}</p>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Listing',
}
</script>

<style scoped>

</style>
