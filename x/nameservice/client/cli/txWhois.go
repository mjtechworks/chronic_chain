package cli

import (
	"github.com/cosmos/cosmos-sdk/client/tx"

	"github.com/spf13/cobra"

	"github.com/ChronicToken/cht/x/nameservice/types"
	"github.com/cosmos/cosmos-sdk/client"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func GetCmdBuyName() *cobra.Command {
	return &cobra.Command{
		Use:   "buy-name [name] [price]",
		Short: "Buys a new name",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsName := string(args[0])
			cliCtx := client.GetClientContextFromCmd(cmd)

			coins, err := sdk.ParseCoinsNormalized(args[1])
			if err != nil {
				return err
			}

			msg := types.NewMsgBuyName(argsName, coins, cliCtx.GetFromAddress())
			err = msg.ValidateBasic()
			if err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(cliCtx, cmd.Flags(), []sdk.Msg{msg}...)
		},
	}
}

func GetCmdSetWhois() *cobra.Command {
	return &cobra.Command{
		Use:   "set-name [value] [name]",
		Short: "Set a new name",
		Args:  cobra.ExactArgs(2),
		RunE: func(cmd *cobra.Command, args []string) error {
			argsValue := args[0]
			argsName := args[1]
			cliCtx := client.GetClientContextFromCmd(cmd)
			msg := types.NewMsgSetName(argsName, argsValue, cliCtx.GetFromAddress())
			err := msg.ValidateBasic()
			if err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(cliCtx, cmd.Flags(), []sdk.Msg{msg}...)
		},
	}
}

func GetCmdDeleteWhois() *cobra.Command {
	return &cobra.Command{
		Use:   "delete-name [id]",
		Short: "Delete a new name by ID",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			clientCtx := client.GetClientContextFromCmd(cmd)

			msg := types.NewMsgDeleteName(args[0], clientCtx.GetFromAddress())
			err := msg.ValidateBasic()
			if err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), []sdk.Msg{msg}...)
		},
	}
}
