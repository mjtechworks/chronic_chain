package client

import (
	govClient "github.com/cosmos/cosmos-sdk/x/gov/client"

	"github.com/ChronicToken/cht/x/cht/client/cli"
	"github.com/ChronicToken/cht/x/cht/client/rest"
)

// ProposalHandlers define the cht cli proposal types and rest handler.
var ProposalHandlers = []govClient.ProposalHandler{
	govClient.NewProposalHandler(cli.ProposalStoreCodeCmd, rest.StoreCodeProposalHandler),
	govClient.NewProposalHandler(cli.ProposalInstantiateContractCmd, rest.InstantiateProposalHandler),
	govClient.NewProposalHandler(cli.ProposalMigrateContractCmd, rest.MigrateProposalHandler),
	govClient.NewProposalHandler(cli.ProposalUpdateContractAdminCmd, rest.UpdateContractAdminProposalHandler),
	govClient.NewProposalHandler(cli.ProposalClearContractAdminCmd, rest.ClearContractAdminProposalHandler),
}
