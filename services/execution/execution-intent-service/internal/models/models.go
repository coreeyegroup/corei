package models

type TradeIntent struct {
    TradeIntentID   string
    StrategyID      string
    InstrumentID    string
    Side            string
    RequestedPrice  int64
    StopPrice       int64
    TargetPrice     int64
    SignalStrength  int64
    RiskPercentage  int64
    OriginType      string
    TraceID         string
}

type ExecutionIntent struct {
    ExecutionIntentID string
    TradeIntentID     string
    StrategyID        string
    InstrumentID      string
    Side              string
    RequestedPrice    int64
    StopPrice         int64
    TargetPrice       int64
    SignalStrength    int64
    RiskPercentage    int64
    ExecutionType     string
    AccountRoutingKey string
    OriginType        string
    LineageHash       string
    TraceID           string
}
