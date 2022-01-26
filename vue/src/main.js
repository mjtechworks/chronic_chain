import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vueLib from '@starport/vue'
import { SigningCosmosClient } from '@cosmjs/launchpad'

const app = createApp(App)
app.config.globalProperties._depsLoaded = true
app.use(store).use(router).use(vueLib).mount('#app')

window.onload = async () => {
  const chainId = process.env.VUE_APP_CHAIN_ID
  if (!window.getOfflineSigner || !window.keplr) {
    alert('Please install keplr extension.')
  } else {
    if (window.keplr.experimentalSuggestChain) {
      try {
        await window.keplr.experimentalSuggestChain({
          chainId: chainId,
          chainName: process.env.VUE_APP_CHAIN_NAME,
          rpc: process.env.VUE_APP_API_TENDERMINT,
          rest: process.env.VUE_APP_API_COSMOS,
          bip44: {
            coinType: 118,
          },
          bech32Config: {
            bech32PrefixAccAddr: process.env.VUE_APP_ADDRESS_PREFIX,
            bech32PrefixAccPub: process.env.VUE_APP_ADDRESS_PREFIX + 'pub',
            bech32PrefixValAddr: process.env.VUE_APP_ADDRESS_PREFIX + 'valoper',
            bech32PrefixValPub: process.env.VUE_APP_ADDRESS_PREFIX + 'valoperpub',
            bech32PrefixConsAddr: process.env.VUE_APP_ADDRESS_PREFIX + 'valcons',
            bech32PrefixConsPub: process.env.VUE_APP_ADDRESS_PREFIX + 'valconspub',
          },
          currencies: [
            {
              coinDenom: 'CHT',
              coinMinimalDenom: 'cgas',
              coinDecimals: 6,
              coinGeckoId: process.env.VUE_APP_ADDRESS_PREFIX,
            },
          ],
          feeCurrencies: [
            {
              coinDenom: 'CHT',
              coinMinimalDenom: 'cgas',
              coinDecimals: 6,
              coinGeckoId: process.env.VUE_APP_ADDRESS_PREFIX,
            },
          ],
          stakeCurrency: {
            coinDenom: 'CHT',
            coinMinimalDenom: 'cgas',
            coinDecimals: 6,
            coinGeckoId: process.env.VUE_APP_ADDRESS_PREFIX,
          },
          coinType: 118,
          gasPriceStep: {
            low: 0.01,
            average: 0.025,
            high: 0.03,
          },
        })
      } catch (e) {
        alert('Failed to suggest the chain')
        console.log(e)
      }
    }
    // Enabling before using the Keplr is recommended.
    // This method will ask the user whether to allow access if they haven't visited this website.
    // Also, it will request that the user unlock the wallet if the wallet is locked.
    await window.keplr.enable(chainId)

    const offlineSigner = window.keplr.getOfflineSigner(chainId)

    // You can get the address/public keys by `getAccounts` method.
    // It can return the array of address/public key.
    // But, currently, Keplr extension manages only one address/public key pair.
    // XXX: This line is needed to set the sender address for SigningCosmosClient.

    const accounts = await offlineSigner.getAccounts()

    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
    const cosmJS = new SigningCosmosClient(process.env.VUE_APP_API_COSMOS, accounts[0].address, offlineSigner)
  }
}
