package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
)

// RegisterCodec registers concrete types on codec
func RegisterCodec(cdc *codec.LegacyAmino) {
	// this line is used by starport scaffolding # 1
	cdc.RegisterConcrete(MsgBuyName{}, "nameservice/BuyName", nil)
	cdc.RegisterConcrete(MsgSetName{}, "nameservice/SetName", nil)
	cdc.RegisterConcrete(MsgDeleteName{}, "nameservice/DeleteName", nil)
}

// ModuleCdc defines the module codec
var (
	Amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewProtoCodec(cdctypes.NewInterfaceRegistry())
)

func init() {
	RegisterCodec(Amino)
	cryptocodec.RegisterCrypto(Amino)
	Amino.Seal()
}
