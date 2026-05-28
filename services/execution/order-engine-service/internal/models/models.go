package models

type SizedExecutionIntent struct {
    SizedIntentID      string
    ExecutionIntentID  string
    ApprovedQuantity   int64
    SizeHash           string
    PolicyHash         string
    RiskHash           string
    LineageHash        string
    TraceID            string
}

type ExecutionOrder struct {
    ExecutionOrderID   string
    ExecutionIntentID  string
    RequestedQuantity  int64
    ApprovedQuantity   int64
    OrderState         string
    BrokerRoute        string
    OrderHash          string
    LineageHash        string
    TraceID            string
}
