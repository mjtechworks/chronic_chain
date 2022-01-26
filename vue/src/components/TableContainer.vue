<template>
  <div class="container">
    <table v-if="length" class="table">
      <thead>
        <TableHeader :sort="sort" :properties="columns" :show-row-count="showRowCount" />
      </thead>
      <tbody>
        <slot></slot>
      </tbody>
    </table>
    <template v-else-if="!length">
      <slot name="empty">
        <tr class="no-results">
          No Results
        </tr>
      </slot>
    </template>
  </div>
</template>

<script>
import TableHeader from '@/components/TableHeader'
export default {
  name: 'TableContainer',
  components: { TableHeader },
  props: {
    length: {
      type: Number,
      default: () => 0,
    },
    columns: {
      type: Array,
      required: true,
    },
    search: {
      type: Boolean,
      default: false,
    },
    sort: {
      type: Object,
      default: () => {},
    },
    loaded: {
      type: Boolean,
      default: false,
    },
    showRowCount: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchTerm: false,
    }
  },
}
</script>

<style scoped>
table {
  table-layout: auto;
  border-collapse: collapse;
  min-width: 100%;
}

.no-results {
  padding: 2rem;
  height: 4rem;
  display: table-cell;
  color: #2d3748;
  font-size: 1.2rem;
}

.no-results h2 {
  font-weight: 600;
  padding-bottom: 0.5rem;
  color: #1a202c;
  font-size: 1.5rem;
}

thead {
  border-bottom: 1px solid #edf2f7;
}
</style>
