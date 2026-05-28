#!/usr/bin/env python3


class FallbackManager:

    def execute(
        self,
        primary,
        fallback
    ):

        try:
            return primary()

        except Exception:
            return fallback()


if __name__ == "__main__":

    manager = FallbackManager()

    def primary():
        raise Exception("failure")

    def fallback():
        return "fallback-success"

    print(
        manager.execute(
            primary,
            fallback
        )
    )
