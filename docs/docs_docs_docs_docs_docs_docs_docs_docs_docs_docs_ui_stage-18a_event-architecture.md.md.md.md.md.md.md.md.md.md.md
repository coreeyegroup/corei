# COREI Event Architecture

Version: 1.0

Status: FROZEN

========================================
PURPOSE
========================================

Define event architecture for all COREI terminals.

Terminals are event-driven.

========================================
EVENT CLASSES
========================================

STATE EVENTS

ALERT EVENTS

AUDIT EVENTS

SYSTEM EVENTS

USER EVENTS

========================================
EVENT FLOW
========================================

Kafka

    ↓

Event Gateway

    ↓

WebSocket

    ↓

State Engine

    ↓

Terminal

========================================
STATE EVENTS
========================================

MARKET_INTELLIGENCE_UPDATED

SIGNAL_UPDATED

DECISION_UPDATED

RISK_UPDATED

PORTFOLIO_UPDATED

EXECUTION_UPDATED

POSITION_UPDATED

PERFORMANCE_UPDATED

SYSTEM_UPDATED

========================================
ALERT EVENTS
========================================

RISK_LIMIT_EXCEEDED

KILL_SWITCH_TRIGGERED

NODE_FAILURE

SERVICE_DEGRADED

TRADE_REJECTED

========================================
AUDIT EVENTS
========================================

RESTART_SERVICE

DEPLOY_RELEASE

APPROVE_TRADE

REJECT_TRADE

TRIGGER_KILL_SWITCH

========================================
EVENT PRIORITY
========================================

P1 Critical

P2 High

P3 Medium

P4 Informational

========================================
EVENT RULES
========================================

One Producer

Many Consumers

All operator actions create audit.
