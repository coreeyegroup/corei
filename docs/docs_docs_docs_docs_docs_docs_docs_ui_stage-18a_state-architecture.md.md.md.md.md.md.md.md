# COREI State Architecture

Version: 1.0

Status: FROZEN

========================================
PURPOSE
========================================

Define authoritative state ownership
for all COREI terminals.

UI consumes states.

UI does not create business states.

========================================
STATE HIERARCHY
========================================

PLATFORM_STATE

├── INFRASTRUCTURE_STATE
└── TRADING_STATE

========================================
INFRASTRUCTURE STATES
========================================

PLATFORM_HEALTH_STATE

OBSERVABILITY_STATE

SECURITY_STATE

DEPLOYMENT_STATE

INFRASTRUCTURE_INTELLIGENCE_STATE

========================================
TRADING STATES
========================================

MARKET_INTELLIGENCE_STATE

SIGNAL_STATE

DECISION_STATE

RISK_STATE

PORTFOLIO_STATE

EXECUTION_STATE

POSITION_STATE

PERFORMANCE_STATE

SYSTEM_STATE

========================================
STATE RULES
========================================

One Domain
One State Owner

UI never owns business state.

All states require:

state_id
state_version
timestamp
source_domain
lineage
