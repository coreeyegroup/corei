# KAFKA CUTOVER CHECKLIST

PRECONDITIONS

[ ] TLS Foundation Complete
[ ] SCRAM Foundation Complete
[ ] Vault Secrets Present
[ ] Client Inventory Complete
[ ] Broker Recovery Snapshot Complete

BROKER

[ ] TLS Secret Mounted
[ ] SASL_SSL Listener Added
[ ] SCRAM Enabled
[ ] Broker Restarted

CLIENTS

[ ] Market Data Updated
[ ] Persistence Writer Updated
[ ] Topic Jobs Updated

VALIDATION

[ ] Broker Healthy
[ ] Topics Accessible
[ ] Produce Success
[ ] Consume Success

ROLLBACK

[ ] Rollback Script Available
[ ] Snapshot Available
