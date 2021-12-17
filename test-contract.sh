#!/bin/bash

chtd query account $(chtd keys show user1 -a) --output json | jq ".value.coins[0]"
chtd query account $(chtd keys show user2 -a) --output json | jq ".value.coins[0]"

# Buy your first name using your coins from the genesis file
chtd tx nameservice buy-name user1.id 1tcht --from user1 -y | jq ".txhash" |  xargs $(sleep 6) chtd q tx

# Set the value for the name you just bought
chtd tx nameservice set-name user1.id 8.8.8.8 --from user1 -y | jq ".txhash" |  xargs $(sleep 6) chtd q tx

# Try out a resolve query against the name you registered
chtd query nameservice resolve user1.id | jq ".value"
# > 8.8.8.8

# Try out a whois query against the name you just registered
chtd query nameservice get-whois user1.id
# > {"value":"8.8.8.8","owner":"cosmos1l7k5tdt2qam0zecxrx78yuw447ga54dsmtpk2s","price":[{"denom":"nametoken","amount":"5"}]}

# user2 buys name from user1
chtd tx nameservice buy-name user1.id 10tcht --from user2 -y | jq ".txhash" |  xargs $(sleep 6) chtd q tx

# user2 decides to delete the name she just bought from user1
chtd tx nameservice delete-name user1.id --from user2 -y | jq ".txhash" |  xargs $(sleep 6) chtd q tx

# Try out a whois query against the name you just deleted
chtd query nameservice get-whois user1.id
# > could not resolve whois user1.id 