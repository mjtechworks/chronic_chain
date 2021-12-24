// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgStoreCode } from "./types/cht/tx";
import { MsgIBCSend } from "./types/cht/ibc";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
const types = [
    ["/cht.MsgMigrateContract", MsgMigrateContract],
    ["/cht.MsgExecuteContract", MsgExecuteContract],
    ["/cht.MsgInstantiateContract", MsgInstantiateContract],
    ["/cht.MsgUpdateAdmin", MsgUpdateAdmin],
    ["/cht.MsgStoreCode", MsgStoreCode],
    ["/cht.MsgIBCSend", MsgIBCSend],
    ["/cht.MsgClearAdmin", MsgClearAdmin],
    ["/cht.MsgIBCCloseChannel", MsgIBCCloseChannel],
];
export const MissingWalletError = new Error("wallet is required");
export const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    let client;
    if (addr) {
        client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    }
    else {
        client = await SigningStargateClient.offline(wallet, { registry });
    }
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgMigrateContract: (data) => ({ typeUrl: "/cht.MsgMigrateContract", value: MsgMigrateContract.fromPartial(data) }),
        msgExecuteContract: (data) => ({ typeUrl: "/cht.MsgExecuteContract", value: MsgExecuteContract.fromPartial(data) }),
        msgInstantiateContract: (data) => ({ typeUrl: "/cht.MsgInstantiateContract", value: MsgInstantiateContract.fromPartial(data) }),
        msgUpdateAdmin: (data) => ({ typeUrl: "/cht.MsgUpdateAdmin", value: MsgUpdateAdmin.fromPartial(data) }),
        msgStoreCode: (data) => ({ typeUrl: "/cht.MsgStoreCode", value: MsgStoreCode.fromPartial(data) }),
        msgIBCSend: (data) => ({ typeUrl: "/cht.MsgIBCSend", value: MsgIBCSend.fromPartial(data) }),
        msgClearAdmin: (data) => ({ typeUrl: "/cht.MsgClearAdmin", value: MsgClearAdmin.fromPartial(data) }),
        msgIBCCloseChannel: (data) => ({ typeUrl: "/cht.MsgIBCCloseChannel", value: MsgIBCCloseChannel.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
