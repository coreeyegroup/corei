class BootstrapValidator:

    REQUIRED_ENV_VARS = [
        "ENVIRONMENT",
        "SERVICE_NAME"
    ]

    def validate(self, env: dict):

        missing = []

        for var in self.REQUIRED_ENV_VARS:

            if var not in env:
                missing.append(var)

        if missing:

            raise RuntimeError(
                f"Missing env vars: {missing}"
            )

        return True
