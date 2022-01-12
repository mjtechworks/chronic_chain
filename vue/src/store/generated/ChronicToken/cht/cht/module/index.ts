// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgStoreCode } from "./types/cht/tx";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgIBCSend } from "./types/cht/ibc";


const types = [
  ["/cht.MsgExecuteContract", MsgExecuteContract],
  ["/cht.MsgUpdateAdmin", MsgUpdateAdmin],
  ["/cht.MsgInstantiateContract", MsgInstantiateContract],
  ["/cht.MsgIBCCloseChannel", MsgIBCCloseChannel],
  ["/cht.MsgStoreCode", MsgStoreCode],
  ["/cht.MsgMigrateContract", MsgMigrateContract],
  ["/cht.MsgClearAdmin", MsgClearAdmin],
  ["/cht.MsgIBCSend", MsgIBCSend],
  
];
export const MissingWalletError = new Error("wallet is required");

export const registry = new Registry(<any>types);

const defaultFee = {
  amount: [],
  gas: "200000",
};

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError;
  let client;
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
  }else{
    client = await SigningStargateClient.offline( wallet, { registry });
  }
  const { address } = (await wallet.getAccounts())[0];

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgExecuteContract: (data: MsgExecuteContract): EncodeObject => ({ typeUrl: "/cht.MsgExecuteContract", value: MsgExecuteContract.fromPartial( data ) }),
    msgUpdateAdmin: (data: MsgUpdateAdmin): EncodeObject => ({ typeUrl: "/cht.MsgUpdateAdmin", value: MsgUpdateAdmin.fromPartial( data ) }),
    msgInstantiateContract: (data: MsgInstantiateContract): EncodeObject => ({ typeUrl: "/cht.MsgInstantiateContract", value: MsgInstantiateContract.fromPartial( data ) }),
    msgIBCCloseChannel: (data: MsgIBCCloseChannel): EncodeObject => ({ typeUrl: "/cht.MsgIBCCloseChannel", value: MsgIBCCloseChannel.fromPartial( data ) }),
    msgStoreCode: (data: MsgStoreCode): EncodeObject => ({ typeUrl: "/cht.MsgStoreCode", value: MsgStoreCode.fromPartial( data ) }),
    msgMigrateContract: (data: MsgMigrateContract): EncodeObject => ({ typeUrl: "/cht.MsgMigrateContract", value: MsgMigrateContract.fromPartial( data ) }),
    msgClearAdmin: (data: MsgClearAdmin): EncodeObject => ({ typeUrl: "/cht.MsgClearAdmin", value: MsgClearAdmin.fromPartial( data ) }),
    msgIBCSend: (data: MsgIBCSend): EncodeObject => ({ typeUrl: "/cht.MsgIBCSend", value: MsgIBCSend.fromPartial( data ) }),
    
  };
};

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr });
};

export {
  txClient,
  queryClient,
};
