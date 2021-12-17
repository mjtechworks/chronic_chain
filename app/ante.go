package app

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	channelkeeper "github.com/cosmos/ibc-go/modules/core/04-channel/keeper"
	ibcante "github.com/cosmos/ibc-go/modules/core/ante"

	chtTypes "github.com/ChronicToken/cht/x/cht/types"

	chtkeeper "github.com/ChronicToken/cht/x/cht/keeper"
)

// NewAnteHandler returns an AnteHandler that checks and increments sequence
// numbers, checks signatures & account numbers, and deducts fees from the first
// signer.
func NewAnteHandler(
	ak ante.AccountKeeper,
	bankKeeper types.BankKeeper,
	feeKeeper ante.FeegrantKeeper,
	sigGasConsumer ante.SignatureVerificationGasConsumer,
	signModeHandler signing.SignModeHandler,
	txCounterStoreKey sdk.StoreKey,
	channelKeeper channelkeeper.Keeper,
	chtConfig chtTypes.ChtConfig,
) sdk.AnteHandler {
	// copied sdk https://github.com/cosmos/cosmos-sdk/blob/v0.42.9/x/auth/ante/ante.go
	return sdk.ChainAnteDecorators(
		ante.NewSetUpContextDecorator(),                                        // outermost AnteDecorator. SetUpContext must be called first
		chtkeeper.NewLimitSimulationGasDecorator(chtConfig.SimulationGasLimit), // after setup context to enforce limits early
		chtkeeper.NewCountTXDecorator(txCounterStoreKey),
		ante.NewRejectExtensionOptionsDecorator(),
		ante.NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.TxTimeoutHeightDecorator{},
		ante.NewValidateMemoDecorator(ak),
		ante.NewConsumeGasForTxSizeDecorator(ak),
		ante.NewSetPubKeyDecorator(ak), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(ak),
		ante.NewDeductFeeDecorator(ak, bankKeeper, feeKeeper),
		ante.NewSigGasConsumeDecorator(ak, sigGasConsumer),
		ante.NewSigVerificationDecorator(ak, signModeHandler),
		ante.NewIncrementSequenceDecorator(ak),
		ibcante.NewAnteDecorator(channelKeeper),
	)
}
