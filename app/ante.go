package app

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	"github.com/cosmos/cosmos-sdk/x/auth/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	channelKeeper "github.com/cosmos/ibc-go/modules/core/04-channel/keeper"
	ibcAnte "github.com/cosmos/ibc-go/modules/core/ante"

	cTypes "github.com/ChronicToken/cht/x/cht/types"

	cKeeper "github.com/ChronicToken/cht/x/cht/keeper"
)

// NewAnteHandler returns an AnteHandler that checks and increments sequence
// numbers, checks signatures & account numbers, and deducts fees from the first
// signer.
func NewAnteHandler(
	ak ante.AccountKeeper,
	bankKeeper types.BankKeeper,
	sigGasConsumer ante.SignatureVerificationGasConsumer,
	signModeHandler signing.SignModeHandler,
	txCounterStoreKey sdk.StoreKey,
	channelKeeper channelKeeper.Keeper,
	chronicConfig cTypes.ChronicConfig,
) sdk.AnteHandler {
	// copied sdk https://github.com/cosmos/cosmos-sdk/blob/v0.42.9/x/auth/ante/ante.go
	return sdk.ChainAnteDecorators(
		ante.NewSetUpContextDecorator(),                                          // outermost AnteDecorator. SetUpContext must be called first
		cKeeper.NewLimitSimulationGasDecorator(chronicConfig.SimulationGasLimit), // after setup context to enforce limits early
		cKeeper.NewCountTXDecorator(txCounterStoreKey),
		ante.NewRejectExtensionOptionsDecorator(),
		ante.NewMempoolFeeDecorator(),
		ante.NewValidateBasicDecorator(),
		ante.TxTimeoutHeightDecorator{},
		ante.NewValidateMemoDecorator(ak),
		ante.NewConsumeGasForTxSizeDecorator(ak),
		//ante.NewRejectFeeGranterDecorator(),
		ante.NewSetPubKeyDecorator(ak), // SetPubKeyDecorator must be called before all signature verification decorators
		ante.NewValidateSigCountDecorator(ak),
		//ante.NewDeductFeeDecorator(ak, bankKeeper),
		ante.NewSigGasConsumeDecorator(ak, sigGasConsumer),
		ante.NewSigVerificationDecorator(ak, signModeHandler),
		ante.NewIncrementSequenceDecorator(ak),
		ibcAnte.NewAnteDecorator(channelKeeper),
	)
}
