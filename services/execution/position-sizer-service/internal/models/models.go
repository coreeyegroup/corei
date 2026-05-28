package models

type PolicyDecision struct {
    PolicyDecisionID  string
    ExecutionIntentID string
    Approved          bool
    PolicyHash        string
    LineageHash       string
    TraceID           string
}

type SizedExecutionIntent struct {
    SizedIntentID      string
    ExecutionIntentID  string
    ApprovedQuantity   int64
    RiskPercentage     int64
    ATRValue           int64
    AccountScale       int64
    SizeHash           string
    LineageHash        string
    TraceID            string
}
