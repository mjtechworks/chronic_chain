package main

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/spf13/cobra"

	"github.com/ChronicToken/cht/x/cht/client/cli"
)

func AddGenesisChtMsgCmd(defaultNodeHome string) *cobra.Command {
	txCmd := &cobra.Command{
		Use:                        "add-chtd-genesis-message",
		Short:                      "cht genesis subcommands",
		DisableFlagParsing:         true,
		SuggestionsMinimumDistance: 2,
		RunE:                       client.ValidateCmd,
	}
	genesisIO := cli.NewDefaultGenesisIO()
	txCmd.AddCommand(
		cli.GenesisStoreCodeCmd(defaultNodeHome, genesisIO),
		cli.GenesisInstantiateContractCmd(defaultNodeHome, genesisIO),
		cli.GenesisExecuteContractCmd(defaultNodeHome, genesisIO),
		cli.GenesisListContractsCmd(defaultNodeHome, genesisIO),
		cli.GenesisListCodesCmd(defaultNodeHome, genesisIO),
	)
	return txCmd

}
