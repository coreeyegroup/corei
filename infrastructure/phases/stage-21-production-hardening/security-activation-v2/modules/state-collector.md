# STATE COLLECTOR MODULE

PURPOSE

Acquire live Kafka StatefulSet.

SOURCE

kubectl get statefulset kafka -n kafka -o yaml

OUTPUT

live-statefulset.yaml

LOCATION

state/security/kafka/v2/manifests/

FAILURE CONDITIONS

StatefulSet missing

kubectl failure

empty output

OUTPUT CONTRACT

Valid Kubernetes StatefulSet YAML

