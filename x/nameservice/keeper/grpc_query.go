package keeper

import (
	"github.com/ChronicToken/cht/x/nameservice/types"
)

var _ types.QueryServer = Keeper{}
