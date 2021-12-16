package keeper

import (
	// this line is used by starport scaffolding # 1
	"fmt"

	"github.com/tendermint/tendermint/libs/log"

	"github.com/ChronicToken/cht/x/nameservice/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bank "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

// Keeper of the nameservice store
type Keeper struct {
	CoinKeeper bank.Keeper
	storeKey   sdk.StoreKey
	cdc        *codec.LegacyAmino
	// paramspace types.ParamSubspace
}

// NewKeeper creates a nameservice keeper
func NewKeeper(coinKeeper bank.Keeper, cdc *codec.LegacyAmino, key sdk.StoreKey) Keeper {
	keeper := Keeper{
		CoinKeeper: coinKeeper,
		storeKey:   key,
		cdc:        cdc,
		// paramspace: paramspace.WithKeyTable(types.ParamKeyTable()),
	}
	return keeper
}

// Logger returns a module-specific logger.
func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}
