package cli

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client/flags"

	"github.com/spf13/cobra"

	"github.com/ChronicToken/cht/x/nameservice/types"
	"github.com/cosmos/cosmos-sdk/client"
)

// GetTxCmd returns the transaction commands for this module
func GetTxCmd() *cobra.Command {
	nameserviceTxCmd := &cobra.Command{
		Use:                        types.ModuleName,
		Short:                      fmt.Sprintf("%s transactions subcommands", types.ModuleName),
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}

	nameserviceTxCmd.AddCommand(GetCmdBuyName(),
		GetCmdSetWhois(),
		GetCmdDeleteWhois())
	flags.AddTxFlagsToCmd(nameserviceTxCmd)
	return nameserviceTxCmd
}
