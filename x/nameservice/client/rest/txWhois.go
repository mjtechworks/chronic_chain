package rest

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"net/http"

	"github.com/ChronicToken/cht/x/nameservice/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/rest"
)

type buyNameRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Buyer   string       `json:"buyer"`
	Name    string       `json:"name"`
	Price   string       `json:"price"`
}

func buyNameHandler(cliCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req buyNameRequest
		if !rest.ReadRESTReq(w, r, cliCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}
		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}
		addr, err := sdk.AccAddressFromBech32(req.Buyer)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		coins, err := sdk.ParseCoinsNormalized(req.Price)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		msg := types.NewMsgBuyName(req.Name, coins, addr)

		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		tx.WriteGeneratedTxResponse(cliCtx, w, baseReq, []sdk.Msg{msg}...)
	}
}

type setWhoisRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Name    string       `json:"name"`
	Value   string       `json:"value"`
	Creator string       `json:"creator"`
}

func setWhoisHandler(cliCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req setWhoisRequest
		if !rest.ReadRESTReq(w, r, cliCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}
		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}
		addr, err := sdk.AccAddressFromBech32(req.Creator)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		msg := types.NewMsgSetName(req.Name, req.Value, addr)

		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		tx.WriteGeneratedTxResponse(cliCtx, w, baseReq, []sdk.Msg{msg}...)
	}
}

type deleteWhoisRequest struct {
	BaseReq rest.BaseReq `json:"base_req"`
	Owner   string       `json:"owner"`
	Name    string       `json:"name"`
}

func deleteWhoisHandler(cliCtx client.Context) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var req deleteWhoisRequest
		if !rest.ReadRESTReq(w, r, cliCtx.LegacyAmino, &req) {
			rest.WriteErrorResponse(w, http.StatusBadRequest, "failed to parse request")
			return
		}
		baseReq := req.BaseReq.Sanitize()
		if !baseReq.ValidateBasic(w) {
			return
		}
		addr, err := sdk.AccAddressFromBech32(req.Owner)
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}
		msg := types.NewMsgDeleteName(req.Name, addr)

		err = msg.ValidateBasic()
		if err != nil {
			rest.WriteErrorResponse(w, http.StatusBadRequest, err.Error())
			return
		}

		tx.WriteGeneratedTxResponse(cliCtx, w, baseReq, []sdk.Msg{msg}...)
	}
}
