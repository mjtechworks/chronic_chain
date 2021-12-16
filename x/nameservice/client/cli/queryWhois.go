package cli

import (
	"fmt"
	"github.com/cosmos/cosmos-sdk/client"

	"github.com/ChronicToken/cht/x/nameservice/types"
	"github.com/spf13/cobra"
)

func GetCmdListWhois(queryRoute string) *cobra.Command {
	return &cobra.Command{
		Use:   "list-whois",
		Short: "list all whois",
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx, err := client.GetClientQueryContext(cmd)
			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/%s", queryRoute, types.QueryListWhois), nil)
			if err != nil {
				fmt.Printf("could not list Whois\n%s\n", err.Error())
				return nil
			}
			//var out []types.Whois
			//cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintBytes(res)
		},
	}
}

func GetCmdGetWhois(queryRoute string) *cobra.Command {
	return &cobra.Command{
		Use:   "get-whois [key]",
		Short: "Query a whois by key",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx, err := client.GetClientQueryContext(cmd)
			key := args[0]

			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/%s/%s", queryRoute, types.QueryGetWhois, key), nil)
			if err != nil {
				fmt.Printf("could not resolve whois %s \n%s\n", key, err.Error())

				return nil
			}

			//var out types.Whois
			//cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintBytes(res)
		},
	}
}

// GetCmdResolveName queries information about a name
func GetCmdResolveName(queryRoute string) *cobra.Command {
	return &cobra.Command{
		Use:   "resolve [name]",
		Short: "resolve name",
		Args:  cobra.ExactArgs(1),
		RunE: func(cmd *cobra.Command, args []string) error {
			cliCtx, err := client.GetClientQueryContext(cmd)
			name := args[0]

			res, _, err := cliCtx.QueryWithData(fmt.Sprintf("custom/%s/%s/%s", queryRoute, types.QueryResolveName, name), nil)
			if err != nil {
				fmt.Printf("could not resolve name - %s \n", name)
				return nil
			}

			//var out types.QueryResResolve
			//cdc.MustUnmarshalJSON(res, &out)
			return cliCtx.PrintBytes(res)
		},
	}
}
