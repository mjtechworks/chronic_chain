/* eslint-disable */
import { signModeFromJSON, signModeToJSON } from '../../../cosmos/tx/signing/v1beta1/signing';
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import { Any } from '../../../google/protobuf/any';
import { CompactBitArray } from '../../../cosmos/crypto/multisig/v1beta1/multisig';
import { Coin } from '../../../cosmos/base/v1beta1/coin';
export const protobufPackage = 'cosmos.tx.v1beta1';
const baseTx = {};
export const Tx = {
    encode(message, writer = Writer.create()) {
        if (message.body !== undefined) {
            TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
        }
        if (message.authInfo !== undefined) {
            AuthInfo.encode(message.authInfo, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTx };
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.body = TxBody.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.authInfo = AuthInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTx };
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = TxBody.fromJSON(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.authInfo !== undefined && object.authInfo !== null) {
            message.authInfo = AuthInfo.fromJSON(object.authInfo);
        }
        else {
            message.authInfo = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.body !== undefined && (obj.body = message.body ? TxBody.toJSON(message.body) : undefined);
        message.authInfo !== undefined && (obj.authInfo = message.authInfo ? AuthInfo.toJSON(message.authInfo) : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTx };
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = TxBody.fromPartial(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.authInfo !== undefined && object.authInfo !== null) {
            message.authInfo = AuthInfo.fromPartial(object.authInfo);
        }
        else {
            message.authInfo = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    }
};
const baseTxRaw = {};
export const TxRaw = {
    encode(message, writer = Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxRaw };
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bodyBytes = reader.bytes();
                    break;
                case 2:
                    message.authInfoBytes = reader.bytes();
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxRaw };
        message.signatures = [];
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = bytesFromBase64(object.bodyBytes);
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = bytesFromBase64(object.authInfoBytes);
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bodyBytes !== undefined && (obj.bodyBytes = base64FromBytes(message.bodyBytes !== undefined ? message.bodyBytes : new Uint8Array()));
        message.authInfoBytes !== undefined && (obj.authInfoBytes = base64FromBytes(message.authInfoBytes !== undefined ? message.authInfoBytes : new Uint8Array()));
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxRaw };
        message.signatures = [];
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = object.bodyBytes;
        }
        else {
            message.bodyBytes = new Uint8Array();
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = object.authInfoBytes;
        }
        else {
            message.authInfoBytes = new Uint8Array();
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    }
};
const baseSignDoc = { chainId: '', accountNumber: 0 };
export const SignDoc = {
    encode(message, writer = Writer.create()) {
        if (message.bodyBytes.length !== 0) {
            writer.uint32(10).bytes(message.bodyBytes);
        }
        if (message.authInfoBytes.length !== 0) {
            writer.uint32(18).bytes(message.authInfoBytes);
        }
        if (message.chainId !== '') {
            writer.uint32(26).string(message.chainId);
        }
        if (message.accountNumber !== 0) {
            writer.uint32(32).uint64(message.accountNumber);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSignDoc };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bodyBytes = reader.bytes();
                    break;
                case 2:
                    message.authInfoBytes = reader.bytes();
                    break;
                case 3:
                    message.chainId = reader.string();
                    break;
                case 4:
                    message.accountNumber = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSignDoc };
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = bytesFromBase64(object.bodyBytes);
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = bytesFromBase64(object.authInfoBytes);
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = String(object.chainId);
        }
        else {
            message.chainId = '';
        }
        if (object.accountNumber !== undefined && object.accountNumber !== null) {
            message.accountNumber = Number(object.accountNumber);
        }
        else {
            message.accountNumber = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bodyBytes !== undefined && (obj.bodyBytes = base64FromBytes(message.bodyBytes !== undefined ? message.bodyBytes : new Uint8Array()));
        message.authInfoBytes !== undefined && (obj.authInfoBytes = base64FromBytes(message.authInfoBytes !== undefined ? message.authInfoBytes : new Uint8Array()));
        message.chainId !== undefined && (obj.chainId = message.chainId);
        message.accountNumber !== undefined && (obj.accountNumber = message.accountNumber);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSignDoc };
        if (object.bodyBytes !== undefined && object.bodyBytes !== null) {
            message.bodyBytes = object.bodyBytes;
        }
        else {
            message.bodyBytes = new Uint8Array();
        }
        if (object.authInfoBytes !== undefined && object.authInfoBytes !== null) {
            message.authInfoBytes = object.authInfoBytes;
        }
        else {
            message.authInfoBytes = new Uint8Array();
        }
        if (object.chainId !== undefined && object.chainId !== null) {
            message.chainId = object.chainId;
        }
        else {
            message.chainId = '';
        }
        if (object.accountNumber !== undefined && object.accountNumber !== null) {
            message.accountNumber = object.accountNumber;
        }
        else {
            message.accountNumber = 0;
        }
        return message;
    }
};
const baseTxBody = { memo: '', timeoutHeight: 0 };
export const TxBody = {
    encode(message, writer = Writer.create()) {
        for (const v of message.messages) {
            Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.memo !== '') {
            writer.uint32(18).string(message.memo);
        }
        if (message.timeoutHeight !== 0) {
            writer.uint32(24).uint64(message.timeoutHeight);
        }
        for (const v of message.extensionOptions) {
            Any.encode(v, writer.uint32(8186).fork()).ldelim();
        }
        for (const v of message.nonCriticalExtensionOptions) {
            Any.encode(v, writer.uint32(16378).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(Any.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.memo = reader.string();
                    break;
                case 3:
                    message.timeoutHeight = longToNumber(reader.uint64());
                    break;
                case 1023:
                    message.extensionOptions.push(Any.decode(reader, reader.uint32()));
                    break;
                case 2047:
                    message.nonCriticalExtensionOptions.push(Any.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(Any.fromJSON(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = String(object.memo);
        }
        else {
            message.memo = '';
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = Number(object.timeoutHeight);
        }
        else {
            message.timeoutHeight = 0;
        }
        if (object.extensionOptions !== undefined && object.extensionOptions !== null) {
            for (const e of object.extensionOptions) {
                message.extensionOptions.push(Any.fromJSON(e));
            }
        }
        if (object.nonCriticalExtensionOptions !== undefined && object.nonCriticalExtensionOptions !== null) {
            for (const e of object.nonCriticalExtensionOptions) {
                message.nonCriticalExtensionOptions.push(Any.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => (e ? Any.toJSON(e) : undefined));
        }
        else {
            obj.messages = [];
        }
        message.memo !== undefined && (obj.memo = message.memo);
        message.timeoutHeight !== undefined && (obj.timeoutHeight = message.timeoutHeight);
        if (message.extensionOptions) {
            obj.extensionOptions = message.extensionOptions.map((e) => (e ? Any.toJSON(e) : undefined));
        }
        else {
            obj.extensionOptions = [];
        }
        if (message.nonCriticalExtensionOptions) {
            obj.nonCriticalExtensionOptions = message.nonCriticalExtensionOptions.map((e) => (e ? Any.toJSON(e) : undefined));
        }
        else {
            obj.nonCriticalExtensionOptions = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseTxBody };
        message.messages = [];
        message.extensionOptions = [];
        message.nonCriticalExtensionOptions = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(Any.fromPartial(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = object.memo;
        }
        else {
            message.memo = '';
        }
        if (object.timeoutHeight !== undefined && object.timeoutHeight !== null) {
            message.timeoutHeight = object.timeoutHeight;
        }
        else {
            message.timeoutHeight = 0;
        }
        if (object.extensionOptions !== undefined && object.extensionOptions !== null) {
            for (const e of object.extensionOptions) {
                message.extensionOptions.push(Any.fromPartial(e));
            }
        }
        if (object.nonCriticalExtensionOptions !== undefined && object.nonCriticalExtensionOptions !== null) {
            for (const e of object.nonCriticalExtensionOptions) {
                message.nonCriticalExtensionOptions.push(Any.fromPartial(e));
            }
        }
        return message;
    }
};
const baseAuthInfo = {};
export const AuthInfo = {
    encode(message, writer = Writer.create()) {
        for (const v of message.signerInfos) {
            SignerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.fee !== undefined) {
            Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signerInfos.push(SignerInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.fee = Fee.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        if (object.signerInfos !== undefined && object.signerInfos !== null) {
            for (const e of object.signerInfos) {
                message.signerInfos.push(SignerInfo.fromJSON(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = Fee.fromJSON(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.signerInfos) {
            obj.signerInfos = message.signerInfos.map((e) => (e ? SignerInfo.toJSON(e) : undefined));
        }
        else {
            obj.signerInfos = [];
        }
        message.fee !== undefined && (obj.fee = message.fee ? Fee.toJSON(message.fee) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseAuthInfo };
        message.signerInfos = [];
        if (object.signerInfos !== undefined && object.signerInfos !== null) {
            for (const e of object.signerInfos) {
                message.signerInfos.push(SignerInfo.fromPartial(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = Fee.fromPartial(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    }
};
const baseSignerInfo = { sequence: 0 };
export const SignerInfo = {
    encode(message, writer = Writer.create()) {
        if (message.publicKey !== undefined) {
            Any.encode(message.publicKey, writer.uint32(10).fork()).ldelim();
        }
        if (message.modeInfo !== undefined) {
            ModeInfo.encode(message.modeInfo, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseSignerInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.publicKey = Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.modeInfo = ModeInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.sequence = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseSignerInfo };
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = Any.fromJSON(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.modeInfo !== undefined && object.modeInfo !== null) {
            message.modeInfo = ModeInfo.fromJSON(object.modeInfo);
        }
        else {
            message.modeInfo = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Number(object.sequence);
        }
        else {
            message.sequence = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.publicKey !== undefined && (obj.publicKey = message.publicKey ? Any.toJSON(message.publicKey) : undefined);
        message.modeInfo !== undefined && (obj.modeInfo = message.modeInfo ? ModeInfo.toJSON(message.modeInfo) : undefined);
        message.sequence !== undefined && (obj.sequence = message.sequence);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseSignerInfo };
        if (object.publicKey !== undefined && object.publicKey !== null) {
            message.publicKey = Any.fromPartial(object.publicKey);
        }
        else {
            message.publicKey = undefined;
        }
        if (object.modeInfo !== undefined && object.modeInfo !== null) {
            message.modeInfo = ModeInfo.fromPartial(object.modeInfo);
        }
        else {
            message.modeInfo = undefined;
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = 0;
        }
        return message;
    }
};
const baseModeInfo = {};
export const ModeInfo = {
    encode(message, writer = Writer.create()) {
        if (message.single !== undefined) {
            ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.single = ModeInfo_Single.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.multi = ModeInfo_Multi.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo };
        if (object.single !== undefined && object.single !== null) {
            message.single = ModeInfo_Single.fromJSON(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = ModeInfo_Multi.fromJSON(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.single !== undefined && (obj.single = message.single ? ModeInfo_Single.toJSON(message.single) : undefined);
        message.multi !== undefined && (obj.multi = message.multi ? ModeInfo_Multi.toJSON(message.multi) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo };
        if (object.single !== undefined && object.single !== null) {
            message.single = ModeInfo_Single.fromPartial(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = ModeInfo_Multi.fromPartial(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    }
};
const baseModeInfo_Single = { mode: 0 };
export const ModeInfo_Single = {
    encode(message, writer = Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo_Single };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo_Single };
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = signModeFromJSON(object.mode);
        }
        else {
            message.mode = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.mode !== undefined && (obj.mode = signModeToJSON(message.mode));
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo_Single };
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = 0;
        }
        return message;
    }
};
const baseModeInfo_Multi = {};
export const ModeInfo_Multi = {
    encode(message, writer = Writer.create()) {
        if (message.bitarray !== undefined) {
            CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.modeInfos) {
            ModeInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bitarray = CompactBitArray.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.modeInfos.push(ModeInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = CompactBitArray.fromJSON(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.modeInfos !== undefined && object.modeInfos !== null) {
            for (const e of object.modeInfos) {
                message.modeInfos.push(ModeInfo.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bitarray !== undefined && (obj.bitarray = message.bitarray ? CompactBitArray.toJSON(message.bitarray) : undefined);
        if (message.modeInfos) {
            obj.modeInfos = message.modeInfos.map((e) => (e ? ModeInfo.toJSON(e) : undefined));
        }
        else {
            obj.modeInfos = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseModeInfo_Multi };
        message.modeInfos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = CompactBitArray.fromPartial(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.modeInfos !== undefined && object.modeInfos !== null) {
            for (const e of object.modeInfos) {
                message.modeInfos.push(ModeInfo.fromPartial(e));
            }
        }
        return message;
    }
};
const baseFee = { gasLimit: 0, payer: '', granter: '' };
export const Fee = {
    encode(message, writer = Writer.create()) {
        for (const v of message.amount) {
            Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.gasLimit !== 0) {
            writer.uint32(16).uint64(message.gasLimit);
        }
        if (message.payer !== '') {
            writer.uint32(26).string(message.payer);
        }
        if (message.granter !== '') {
            writer.uint32(34).string(message.granter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseFee };
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.gasLimit = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.payer = reader.string();
                    break;
                case 4:
                    message.granter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseFee };
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromJSON(e));
            }
        }
        if (object.gasLimit !== undefined && object.gasLimit !== null) {
            message.gasLimit = Number(object.gasLimit);
        }
        else {
            message.gasLimit = 0;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = String(object.payer);
        }
        else {
            message.payer = '';
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = String(object.granter);
        }
        else {
            message.granter = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        message.gasLimit !== undefined && (obj.gasLimit = message.gasLimit);
        message.payer !== undefined && (obj.payer = message.payer);
        message.granter !== undefined && (obj.granter = message.granter);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseFee };
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(Coin.fromPartial(e));
            }
        }
        if (object.gasLimit !== undefined && object.gasLimit !== null) {
            message.gasLimit = object.gasLimit;
        }
        else {
            message.gasLimit = 0;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = object.payer;
        }
        else {
            message.payer = '';
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = object.granter;
        }
        else {
            message.granter = '';
        }
        return message;
    }
};
var globalThis = (() => {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    throw 'Unable to locate global object';
})();
const atob = globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(''));
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
    }
    return long.toNumber();
}
if (util.Long !== Long) {
    util.Long = Long;
    configure();
}
