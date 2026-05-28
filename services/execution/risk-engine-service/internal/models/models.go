package models

type PerAccountIntent struct {
    PerAccountIntentID string
    ExecutionIntentID  string
    AccountID          string
    InstrumentID       string
    Side               string
    RequestedPrice     int64
    StopPrice          int64
    TargetPrice        int64
    OriginType         string
    LineageHash        string
    TraceID            string
}

type RiskLimits struct {
    MaxRiskPerTradePct       int64
    MaxDailyLossPct          int64
    MaxDrawdownPct           int64
    MaxOpenPositions         int64
    MaxMarginUtilizationPct  int64
}

type RiskDecision struct {
    RiskDecisionID   string
    ExecutionIntentID string
    RiskHash         string
    Approved         bool
    RejectionReason  string
    KillSwitchActive bool
    LineageHash      string
    TraceID          string
}
