import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgExecuteContract } from "./types/cht/tx";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgIBCSend } from "./types/cht/ibc";
import { MsgStoreCode } from "./types/cht/tx";
export declare const MissingWalletError: Error;
export declare const registry: Registry;
interface TxClientOptions {
    addr: string;
}
interface SignAndBroadcastOptions {
    fee: StdFee;
    memo?: string;
}
declare const txClient: (wallet: OfflineSigner, { addr: addr }?: TxClientOptions) => Promise<{
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }?: SignAndBroadcastOptions) => any;
    msgInstantiateContract: (data: MsgInstantiateContract) => EncodeObject;
    msgExecuteContract: (data: MsgExecuteContract) => EncodeObject;
    msgIBCCloseChannel: (data: MsgIBCCloseChannel) => EncodeObject;
    msgMigrateContract: (data: MsgMigrateContract) => EncodeObject;
    msgUpdateAdmin: (data: MsgUpdateAdmin) => EncodeObject;
    msgClearAdmin: (data: MsgClearAdmin) => EncodeObject;
    msgIBCSend: (data: MsgIBCSend) => EncodeObject;
    msgStoreCode: (data: MsgStoreCode) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
