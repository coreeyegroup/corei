#!/usr/bin/env python3

class ExecutionRegistry:

    def register(
        self,
        service_name: str
    ):

        return {
            "registered": service_name
        }


if __name__ == "__main__":

    registry = ExecutionRegistry()

    print(
        registry.register("portfolio-service")
    )
