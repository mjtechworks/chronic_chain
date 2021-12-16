package cht_test

import (
	"testing"

	keepertest "github.com/ChronicToken/cht/testutil/keeper"
	"github.com/ChronicToken/cht/x/cht"
	"github.com/ChronicToken/cht/x/cht/types"
	"github.com/stretchr/testify/require"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.ChtKeeper(t)
	cht.InitGenesis(ctx, *k, genesisState)
	got := cht.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	// this line is used by starport scaffolding # genesis/test/assert
}
