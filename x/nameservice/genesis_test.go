package nameservice_test

import (
	"testing"

	keepertest "github.com/ChronicToken/cht/testutil/keeper"
	"github.com/ChronicToken/cht/x/nameservice"
	"github.com/ChronicToken/cht/x/nameservice/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		WhoisList: []types.Whois{
			{
				Index: "0",
			},
			{
				Index: "1",
			},
		},
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.NameserviceKeeper(t)
	nameservice.InitGenesis(ctx, *k, genesisState)
	got := nameservice.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	require.Len(t, got.WhoisList, len(genesisState.WhoisList))
	require.Subset(t, genesisState.WhoisList, got.WhoisList)
	// this line is used by starport scaffolding # genesis/test/assert
}
