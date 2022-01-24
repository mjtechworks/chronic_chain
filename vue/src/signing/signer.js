import { getWallet } from '@/common/keystore'
import { getLedger } from '@/common/ledger'
import { Secp256k1HdWallet } from '@cosmjs/launchpad'

export async function getSigner(signingType, { address, password }, chainId, ledgerTransport) {
  if (signingType === `local`) {
    const { wallet: serializedWallet } = getWallet(address)
    return await Secp256k1HdWallet.deserialize(serializedWallet, password)
  } else if (signingType === `ledger`) {
    const { ledger } = await getLedger(ledgerTransport)
    return ledger
  } else if (signingType === `keplr`) {
    return window.getOfflineSigner(chainId)
  }

  throw new Error(`Signing via ${signingType} is not supported`)
}
