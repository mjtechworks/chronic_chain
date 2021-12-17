package types

const (
	// ChtModuleEventType is stored with any contract TX that returns non empty EventAttributes
	ChtModuleEventType = "cht"
	// CustomContractEventPrefix contracts can create custom events. To not mix them with other system events they got the `wasm-` prefix.
	CustomContractEventPrefix = "cht-"

	EventTypeStoreCode         = "store_code"
	EventTypeInstantiate       = "instantiate"
	EventTypeExecute           = "execute"
	EventTypeMigrate           = "migrate"
	EventTypePinCode           = "pin_code"
	EventTypeUnpinCode         = "unpin_code"
	EventTypeSudo              = "sudo"
	EventTypeReply             = "reply"
	EventTypeGovContractResult = "gov_contract_result"
)

// event attributes returned from contract execution
const (
	AttributeReservedPrefix = "_"

	AttributeKeyContractAddr  = "_contract_address"
	AttributeKeyCodeID        = "code_id"
	AttributeKeyResultDataHex = "result"
	AttributeKeyFeature       = "feature"
)
