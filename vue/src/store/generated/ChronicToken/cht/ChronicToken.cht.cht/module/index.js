// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgStoreCode } from "./types/cht/tx";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgIBCSend } from "./types/cht/ibc";
const types = [
    ["/ChronicToken.cht.cht.MsgMigrateContract", MsgMigrateContract],
    ["/ChronicToken.cht.cht.MsgStoreCode", MsgStoreCode],
    ["/ChronicToken.cht.cht.MsgExecuteContract", MsgExecuteContract],
    ["/ChronicToken.cht.cht.MsgInstantiateContract", MsgInstantiateContract],
    ["/ChronicToken.cht.cht.MsgClearAdmin", MsgClearAdmin],
    ["/ChronicToken.cht.cht.MsgUpdateAdmin", MsgUpdateAdmin],
    ["/ChronicToken.cht.cht.MsgIBCCloseChannel", MsgIBCCloseChannel],
    ["/ChronicToken.cht.cht.MsgIBCSend", MsgIBCSend],
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
        msgMigrateContract: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgMigrateContract", value: MsgMigrateContract.fromPartial(data) }),
        msgStoreCode: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgStoreCode", value: MsgStoreCode.fromPartial(data) }),
        msgExecuteContract: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgExecuteContract", value: MsgExecuteContract.fromPartial(data) }),
        msgInstantiateContract: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgInstantiateContract", value: MsgInstantiateContract.fromPartial(data) }),
        msgClearAdmin: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgClearAdmin", value: MsgClearAdmin.fromPartial(data) }),
        msgUpdateAdmin: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgUpdateAdmin", value: MsgUpdateAdmin.fromPartial(data) }),
        msgIBCCloseChannel: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgIBCCloseChannel", value: MsgIBCCloseChannel.fromPartial(data) }),
        msgIBCSend: (data) => ({ typeUrl: "/ChronicToken.cht.cht.MsgIBCSend", value: MsgIBCSend.fromPartial(data) }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
