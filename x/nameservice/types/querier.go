package types

import "strings"

const QueryListWhois = "list-whois"
const QueryGetWhois = "get-whois"
const QueryResolveName = "resolve-name"

// QueryResResolve Queries Result Payload for a resolve query
type QueryResResolve struct {
	Value string `json:"value"`
}

func (r QueryResResolve) Reset() {
	r = QueryResResolve{}
}

func (r QueryResResolve) ProtoMessage() {}

// implement fmt.Stringer
func (r QueryResResolve) String() string {
	return r.Value
}

// QueryResNames Queries Result Payload for a names query
type QueryResNames []string

// implement fmt.Stringer
func (n QueryResNames) String() string {
	return strings.Join(n[:], "\n")
}
