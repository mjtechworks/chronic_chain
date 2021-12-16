package rest

import (
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/gorilla/mux"
)

// RegisterRoutes registers nameservice-related REST handlers to a router
func RegisterRoutes(cliCtx client.Context, r *mux.Router) {
	// this line is used by starport scaffolding
	r.HandleFunc("/nameservice/whois", buyNameHandler(cliCtx)).Methods("POST")
	r.HandleFunc("/nameservice/whois", listWhoisHandler(cliCtx, "nameservice")).Methods("GET")
	r.HandleFunc("/nameservice/whois/{key}", getWhoisHandler(cliCtx, "nameservice")).Methods("GET")
	r.HandleFunc("/nameservice/whois/{key}/resolve", resolveNameHandler(cliCtx, "nameservice")).Methods("GET")
	r.HandleFunc("/nameservice/whois", setWhoisHandler(cliCtx)).Methods("PUT")
	r.HandleFunc("/nameservice/whois", deleteWhoisHandler(cliCtx)).Methods("DELETE")

}
