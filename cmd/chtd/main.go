package main

import (
	"github.com/cosmos/cosmos-sdk/server"
	"os"

	"github.com/ChronicToken/cht/app"
)

func main() {
	rootCmd, _ := NewRootCmd()

	if err := Execute(rootCmd, app.DefaultNodeHome); err != nil {
		switch e := err.(type) {
		case server.ErrorCode:
			os.Exit(e.Code)

		default:
			os.Exit(1)
		}
	}
}
