// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgIBCSend } from "./types/cht/ibc";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgMigrateContract } from "./types/cht/tx";
const types = [
    ["/cht.MsgIBCSend", MsgIBCSend],
    ["/cht.MsgIBCCloseChannel", MsgIBCCloseChannel],
    ["/cht.MsgUpdateAdmin", MsgUpdateAdmin],
    ["/cht.MsgExecuteContract", MsgExecuteContract],
    ["/cht.MsgClearAdmin", MsgClearAdmin],
    ["/cht.MsgInstantiateContract", MsgInstantiateContract],
    ["/cht.MsgMigrateContract", MsgMigrateContract],
];
export const MissingWalletError = new Error("wallet is required");
const registry = new Registry(types);
const defaultFee = {
    amount: [],
    gas: "200000",
};
const txClient = async (wallet, { addr: addr } = { addr: "http://localhost:26657" }) => {
    if (!wallet)
        throw MissingWalletError;
    const client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry });
    const { address } = (await wallet.getAccounts())[0];
    return {
        signAndBroadcast: (msgs, { fee, memo } = { fee: defaultFee, memo: "" }) => client.signAndBroadcast(address, msgs, fee, memo),
        msgIBCSend: (data) => ({ typeUrl: "/cht.MsgIBCSend", value: data }),
        msgIBCCloseChannel: (data) => ({ typeUrl: "/cht.MsgIBCCloseChannel", value: data }),
        msgUpdateAdmin: (data) => ({ typeUrl: "/cht.MsgUpdateAdmin", value: data }),
        msgExecuteContract: (data) => ({ typeUrl: "/cht.MsgExecuteContract", value: data }),
        msgClearAdmin: (data) => ({ typeUrl: "/cht.MsgClearAdmin", value: data }),
        msgInstantiateContract: (data) => ({ typeUrl: "/cht.MsgInstantiateContract", value: data }),
        msgMigrateContract: (data) => ({ typeUrl: "/cht.MsgMigrateContract", value: data }),
    };
};
const queryClient = async ({ addr: addr } = { addr: "http://localhost:1317" }) => {
    return new Api({ baseUrl: addr });
};
export { txClient, queryClient, };
