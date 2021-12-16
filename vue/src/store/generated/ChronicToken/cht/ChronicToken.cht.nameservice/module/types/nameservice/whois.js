/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';
export const protobufPackage = 'ChronicToken.cht.nameservice';
const baseWhois = { value: '', price: '' };
export const Whois = {
    encode(message, writer = Writer.create()) {
        if (message.value !== '') {
            writer.uint32(10).string(message.value);
        }
        if (message.price !== '') {
            writer.uint32(18).string(message.price);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = { ...baseWhois };
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.value = reader.string();
                    break;
                case 2:
                    message.price = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = { ...baseWhois };
        if (object.value !== undefined && object.value !== null) {
            message.value = String(object.value);
        }
        else {
            message.value = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = String(object.price);
        }
        else {
            message.price = '';
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.value !== undefined && (obj.value = message.value);
        message.price !== undefined && (obj.price = message.price);
        return obj;
    },
    fromPartial(object) {
        const message = { ...baseWhois };
        if (object.value !== undefined && object.value !== null) {
            message.value = object.value;
        }
        else {
            message.value = '';
        }
        if (object.price !== undefined && object.price !== null) {
            message.price = object.price;
        }
        else {
            message.price = '';
        }
        return message;
    }
};
