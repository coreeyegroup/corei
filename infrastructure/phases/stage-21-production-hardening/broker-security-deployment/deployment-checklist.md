# BROKER SECURITY DEPLOYMENT CHECKLIST

PRE-DEPLOY

[ ] Vault healthy

[ ] SCRAM users exist

[ ] kafka-runtime-tls exists

[ ] Recovery snapshots exist

[ ] Rollback script exists

DEPLOY

[ ] StatefulSet patched

[ ] Broker restarted

[ ] Broker healthy

VALIDATE

[ ] PLAINTEXT listener active

[ ] SASL_SSL listener active

[ ] Topic listing works

[ ] Produce works

[ ] Consume works
