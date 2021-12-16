package types

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

var _ sdk.Msg = &MsgDeleteName{}

type MsgDeleteName struct {
	ID      string         `json:"id" yaml:"id"`
	Creator sdk.AccAddress `json:"creator" yaml:"creator"`
}

func (msg MsgDeleteName) Reset() {
	msg = MsgDeleteName{}
}

func (msg MsgDeleteName) String() string {
	return fmt.Sprintf(`MsgDeleteName:
	  ID:       	%s
	  Creator:      %v
	`, msg.ID, msg.Creator)
}

func (msg MsgDeleteName) ProtoMessage() {}

func NewMsgDeleteName(id string, creator sdk.AccAddress) MsgDeleteName {
	return MsgDeleteName{
		ID:      id,
		Creator: creator,
	}
}

func (msg MsgDeleteName) Route() string {
	return RouterKey
}

func (msg MsgDeleteName) Type() string {
	return "DeleteName"
}

func (msg MsgDeleteName) GetSigners() []sdk.AccAddress {
	return []sdk.AccAddress{sdk.AccAddress(msg.Creator)}
}

func (msg MsgDeleteName) GetSignBytes() []byte {
	bz := Amino.MustMarshalJSON(&msg)
	return sdk.MustSortJSON(bz)
}

func (msg MsgDeleteName) ValidateBasic() error {
	if msg.Creator.Empty() {
		return sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "creator can't be empty")
	}
	return nil
}
