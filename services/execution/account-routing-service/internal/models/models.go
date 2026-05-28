package models

type ExecutionIntent struct {
    ExecutionIntentID string
    TradeIntentID     string
    StrategyID        string
    InstrumentID      string
    Side              string
    RequestedPrice    int64
    StopPrice         int64
    TargetPrice       int64
    ExecutionType     string
    AccountRoutingKey string
    OriginType        string
    LineageHash       string
    TraceID           string
}

type Account struct {
    AccountID     string
    AccountGroup  string
    OperationMode string
    Enabled       bool
}

type PerAccountIntent struct {
    PerAccountIntentID string
    ExecutionIntentID  string
    AccountID          string
    AccountGroup       string
    OperationMode      string
    InstrumentID       string
    Side               string
    RequestedPrice     int64
    StopPrice          int64
    TargetPrice        int64
    LineageHash        string
    TraceID            string
}
