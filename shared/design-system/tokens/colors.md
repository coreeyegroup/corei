# COREI Color Token Architecture

Version: 1.0
Status: FROZEN

========================================
TOKEN HIERARCHY
========================================

RAW TOKENS

    ↓

SEMANTIC TOKENS

    ↓

COMPONENT TOKENS

========================================
RAW TOKENS
========================================

Foundation colors only.

Examples:

foundation-black-950
foundation-black-900

foundation-gold-500
foundation-gold-600

foundation-green-500
foundation-red-500

========================================
SEMANTIC TOKENS
========================================

surface-primary
surface-secondary
surface-tertiary

text-primary
text-secondary
text-muted

border-primary
border-secondary

status-success
status-warning
status-danger
status-info

========================================
COMPONENT TOKENS
========================================

terminal-background

workspace-background

panel-background

navigation-background

toolbar-background

alert-critical
alert-warning
alert-info

========================================
RULES
========================================

Components never reference raw colors.

Components use semantic tokens.

Themes map semantic tokens to raw colors.

