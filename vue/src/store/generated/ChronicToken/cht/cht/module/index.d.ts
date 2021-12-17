import { StdFee } from "@cosmjs/launchpad";
import { OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgIBCSend } from "./types/cht/ibc";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgClearAdmin } from "./types/cht/tx";
export declare const MissingWalletError: Error;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => Promise<import("@cosmjs/stargate").BroadcastTxResponse>;
    msgExecuteContract: (data: MsgExecuteContract) => EncodeObject;
    msgInstantiateContract: (data: MsgInstantiateContract) => EncodeObject;
    msgMigrateContract: (data: MsgMigrateContract) => EncodeObject;
    msgUpdateAdmin: (data: MsgUpdateAdmin) => EncodeObject;
    msgIBCSend: (data: MsgIBCSend) => EncodeObject;
    msgIBCCloseChannel: (data: MsgIBCCloseChannel) => EncodeObject;
    msgClearAdmin: (data: MsgClearAdmin) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
