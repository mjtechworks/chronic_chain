package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	cdctypes "github.com/cosmos/cosmos-sdk/codec/types"
	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"

	// this line is used by starport scaffolding # 1
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

func RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgStoreCode{}, "cht/MsgStoreCode", nil)
	cdc.RegisterConcrete(&MsgInstantiateContract{}, "cht/MsgInstantiateContract", nil)
	cdc.RegisterConcrete(&MsgExecuteContract{}, "cht/MsgExecuteContract", nil)
	cdc.RegisterConcrete(&MsgMigrateContract{}, "cht/MsgMigrateContract", nil)
	cdc.RegisterConcrete(&MsgUpdateAdmin{}, "cht/MsgUpdateAdmin", nil)
	cdc.RegisterConcrete(&MsgClearAdmin{}, "cht/MsgClearAdmin", nil)
	cdc.RegisterConcrete(&PinCodesProposal{}, "cht/PinCodesProposal", nil)
	cdc.RegisterConcrete(&UnpinCodesProposal{}, "cht/UnpinCodesProposal", nil)

	cdc.RegisterConcrete(&StoreCodeProposal{}, "cht/StoreCodeProposal", nil)
	cdc.RegisterConcrete(&InstantiateContractProposal{}, "cht/InstantiateContractProposal", nil)
	cdc.RegisterConcrete(&MigrateContractProposal{}, "cht/MigrateContractProposal", nil)
	cdc.RegisterConcrete(&UpdateAdminProposal{}, "cht/UpdateAdminProposal", nil)
	cdc.RegisterConcrete(&ClearAdminProposal{}, "cht/ClearAdminProposal", nil)
}

func RegisterInterfaces(registry cdctypes.InterfaceRegistry) {
	registry.RegisterImplementations(
		(*sdk.Msg)(nil),
		&MsgStoreCode{},
		&MsgInstantiateContract{},
		&MsgExecuteContract{},
		&MsgMigrateContract{},
		&MsgUpdateAdmin{},
		&MsgClearAdmin{},
		&MsgIBCCloseChannel{},
		&MsgIBCSend{},
	)
	registry.RegisterImplementations(
		(*govtypes.Content)(nil),
		&StoreCodeProposal{},
		&InstantiateContractProposal{},
		&MigrateContractProposal{},
		&UpdateAdminProposal{},
		&ClearAdminProposal{},
		&PinCodesProposal{},
		&UnpinCodesProposal{},
	)

	registry.RegisterInterface("ContractInfoExtension", (*ContractInfoExtension)(nil))

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)

func init() {
	RegisterLegacyAminoCodec(amino)
	cryptocodec.RegisterCrypto(amino)
	amino.Seal()
}
