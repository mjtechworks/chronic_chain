package nameservice

import (
	"github.com/ChronicToken/cht/x/nameservice/keeper"
	"github.com/ChronicToken/cht/x/nameservice/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// InitGenesis initializes the capability module's state from a provided genesis
// state.
func InitGenesis(ctx sdk.Context, k keeper.Keeper, genState types.GenesisState) {
	// Set all the whois
	for _, elem := range genState.WhoisList {
		k.SetWhois(ctx, elem)
	}
	// this line is used by starport scaffolding # genesis/module/init
}

// ExportGenesis returns the capability module's exported genesis.
func ExportGenesis(ctx sdk.Context, k keeper.Keeper) *types.GenesisState {
	genesis := types.DefaultGenesis()

	genesis.WhoisList = k.GetAllWhois(ctx)
	// this line is used by starport scaffolding # genesis/module/export

	return genesis
}
