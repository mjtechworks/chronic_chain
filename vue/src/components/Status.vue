<template>
  <div class="status" :class="label.toLowerCase()">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: `Status`,
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.status {
  text-transform: uppercase;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 1rem;
  width: fit-content;
  text-align: center;
}

.status.inactive {
  background: #feebc8;
  color: #9c4221;
}

.status.passed,
.status.active {
  background: #c6f6d5;
  color: #276749;
}

.status.rejected {
  background: #fed7d7;
  color: #9b2c2c;
}

.status.voting {
  background: #b2f5ea;
  color: #285e61;
}

.status.depositing {
  background: #e9d8fd;
  color: #553c9a;
}
</style>
