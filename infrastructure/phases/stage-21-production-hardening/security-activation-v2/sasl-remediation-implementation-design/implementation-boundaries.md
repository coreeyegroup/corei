# IMPLEMENTATION BOUNDARIES

ALLOWED

manifest_generator.py

generated_manifest_validator.py

deployment_packager.py

FORBIDDEN

kubectl edit

kubectl exec runtime fixes

manual server.properties edits

manual secret mutation

manual deployment patching

GOAL

Generator owns configuration

Validator owns certification
