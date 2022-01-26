<template>
  <tr class="balance-row">
    <td :key="balance.denom">
      <div class="row">
        <h3 class="total">
          {{ bigFigureOrShortDecimals(balance.amount) }}
          {{ balance.denom }}
        </h3>
      </div>
    </td>

    <td v-if="!unstakingBalance" :key="balance.denom + '_rewards'" class="rewards">
      <h2 v-if="totalRewardsPerDenom && totalRewardsPerDenom[balance.denom] > 0.001">
        +{{ bigFigureOrShortDecimals(totalRewardsPerDenom[balance.denom]) }}
        {{ balance.denom }}
      </h2>
      <h2 v-else-if="!unstake">0</h2>
    </td>

    <!--    <td v-if="!unstakingBalance" :key="balance.denom + '_available'" class="available">-->
    <!--      <span v-if="balance.type === 'STAKE'" class="available-amount">-->
    <!--        {{ bigFigureOrShortDecimals(balance.available) }}-->
    <!--      </span>-->
    <!--    </td>-->

    <td v-if="!unstakingBalance" :key="balance.denom + '_actions'" class="actions">
      <div v-if="send" class="icon-button-container">
        <button class="icon-button" @click="$emit('open-send-modal')">
          <span class="sp-icon sp-icon-UpArrow" />
        </button>
        <span>Send</span>
      </div>
      <div v-if="stake" class="icon-button-container">
        <button class="icon-button" @click="$emit('open-stake-modal')">
          <span class="sp-icon sp-icon-UpArrow" />
        </button>
        <span>Stake</span>
      </div>
      <div v-if="unstake" class="icon-button-container">
        <button class="icon-button" @click="$emit('open-unstake-modal')">
          <span class="sp-icon sp-icon-DownArrow" />
        </button>
        <span>Unstake</span>
      </div>
    </td>
  </tr>
</template>
<script>
import { bigFigureOrShortDecimals } from '@/common/numbers'
import { fromNow } from '@/common/time'
// import network from '@/common/network'

export default {
  name: `BalanceRow`,
  props: {
    balance: {
      type: Object,
      required: true,
    },
    totalRewardsPerDenom: {
      type: Object,
      default: () => {},
    },
    stake: {
      type: Boolean,
      default: false,
    },
    unstake: {
      type: Boolean,
      default: false,
    },
    send: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    unstakingBalance() {
      return !!this.balance.endTime
    },
    image() {
      return undefined
    },
    hex() {
      const string = this.balance.denom
      let hash = 0
      for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash)
      }
      let colour = '#'
      for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xFF // prettier-ignore
        colour += ('00' + value.toString(16)).substr(-2)
      }
      return this.image ? '' : colour
    },
  },
  methods: {
    bigFigureOrShortDecimals,
    fromNow,
  },
}
</script>
<style scoped>
.balance-row {
  border-bottom: 1px solid #edf2f7;
}

.balance-row:not(:first-child) {
  margin-top: -1px;
}

.balance-row:not(:last-child) {
  border-bottom: 1px solid #edf2f7;
}

td {
  padding: 0.5rem 0.75rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  vertical-align: middle;
}

.row {
  display: flex;
  align-items: center;
  min-width: 12rem;
}

.rewards {
  color: #2f855a;
}

.total {
  color: #1a202c;
}

.chain {
  font-size: 10px;
  margin-left: 0.5rem;
  margin-top: 0.3rem;
}

.token-icon {
  width: 2.5rem;
  height: 2.5rem;
  max-width: 100%;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 50%;
  background-size: cover;
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
  font-size: 10px;
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
</style>
