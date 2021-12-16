package cli

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/flags"

	// "strings"

	"github.com/spf13/cobra"

	"github.com/cosmos/cosmos-sdk/client"

	// sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/ChronicToken/cht/x/nameservice/types"
)

// GetQueryCmd returns the cli query commands for this module
func GetQueryCmd(queryRoute string) *cobra.Command {
	// Group nameservice queries under a subcommand
	nameserviceQueryCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("Querying commands for the %s module", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	nameserviceQueryCmd.AddCommand(
		GetCmdListWhois(queryRoute),
		GetCmdGetWhois(queryRoute),
		GetCmdResolveName(queryRoute),
	)

	flags.AddQueryFlagsToCmd(nameserviceQueryCmd)

	return nameserviceQueryCmd
}
