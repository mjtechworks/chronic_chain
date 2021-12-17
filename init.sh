#!/usr/bin/env bash

chtd init test --chain-id=namechain

chtd config output json
chtd config indent true
chtd config trust-node true
chtd config chain-id namechain
chtd config keyring-backend test

chtd keys add user1
chtd keys add user2

chtd add-genesis-account $(chtd keys show user1 -a) 1000tcht,100000000cgas
chtd add-genesis-account $(chtd keys show user2 -a) 1000tcht,100000000cgas

chtd gentx user1 1tcht --keyring-backend test --chain-id namechain

echo "Collecting genesis txs..."
chtd collect-gentxs

echo "Validating genesis file..."
chtd validate-genesis