package types

import (
	"fmt"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

var MinNamePrice = sdk.Coins{sdk.NewInt64Coin("nametoken", 1)}

type Whois struct {
	Creator sdk.AccAddress `json:"creator" yaml:"creator"`
	ID      string         `json:"id" yaml:"id"`
	Value   string         `json:"value" yaml:"value"`
	Price   sdk.Coins      `json:"price" yaml:"price"`
}

func (w Whois) Reset() {
	w = Whois{}
}

func (w Whois) String() string {
	return fmt.Sprintf(`Update Contract Admin Proposal:
  Creator:       %s
  ID: %s
  Value:    %s
  Price:   %s
`, w.Creator.String(), w.ID, w.Value, w.String())
}

func (w Whois) ProtoMessage() {}

// NewWhois returns a new Whois with the minprice as the price
func NewWhois() Whois {
	return Whois{
		Price: MinNamePrice,
	}
}
