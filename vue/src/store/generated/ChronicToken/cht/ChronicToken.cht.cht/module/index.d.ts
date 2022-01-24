import { StdFee } from "@cosmjs/launchpad";
import { Registry, OfflineSigner, EncodeObject } from "@cosmjs/proto-signing";
import { Api } from "./rest";
import { MsgIBCCloseChannel } from "./types/cht/ibc";
import { MsgClearAdmin } from "./types/cht/tx";
import { MsgInstantiateContract } from "./types/cht/tx";
import { MsgMigrateContract } from "./types/cht/tx";
import { MsgStoreCode } from "./types/cht/tx";
import { MsgUpdateAdmin } from "./types/cht/tx";
import { MsgIBCSend } from "./types/cht/ibc";
import { MsgExecuteContract } from "./types/cht/tx";
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
    msgIBCCloseChannel: (data: MsgIBCCloseChannel) => EncodeObject;
    msgClearAdmin: (data: MsgClearAdmin) => EncodeObject;
    msgInstantiateContract: (data: MsgInstantiateContract) => EncodeObject;
    msgMigrateContract: (data: MsgMigrateContract) => EncodeObject;
    msgStoreCode: (data: MsgStoreCode) => EncodeObject;
    msgUpdateAdmin: (data: MsgUpdateAdmin) => EncodeObject;
    msgIBCSend: (data: MsgIBCSend) => EncodeObject;
    msgExecuteContract: (data: MsgExecuteContract) => EncodeObject;
}>;
interface QueryClientOptions {
    addr: string;
}
declare const queryClient: ({ addr: addr }?: QueryClientOptions) => Promise<Api<unknown>>;
export { txClient, queryClient, };
