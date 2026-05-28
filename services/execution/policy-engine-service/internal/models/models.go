package models

type RiskDecision struct {
    RiskDecisionID    string
    ExecutionIntentID string
    Approved          bool
    RiskHash          string
    LineageHash       string
    TraceID           string
}

type PolicyDecision struct {
    PolicyDecisionID  string
    ExecutionIntentID string
    PolicyHash        string
    Approved          bool
    RejectionReason   string
    LineageHash       string
    TraceID           string
}
