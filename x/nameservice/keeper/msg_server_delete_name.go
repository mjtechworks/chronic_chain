package keeper

import (
	"context"

	"github.com/ChronicToken/cht/x/nameservice/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) DeleteName(goCtx context.Context, msg *types.MsgDeleteName) (*types.MsgDeleteNameResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	// Try getting name information from the store
	whois, isFound := k.GetWhois(ctx, msg.Name)
	// If a name is not found, throw an error
	if !isFound {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "Name doesn't exist")
	}
	// If the message sender address doesn't match the name owner, throw an error
	if msg.Creator != whois.Owner {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Incorrect Owner")
	}
	// Otherwise, remove the name information from the store
	k.RemoveWhois(ctx, msg.Name)

	return &types.MsgDeleteNameResponse{}, nil
}
