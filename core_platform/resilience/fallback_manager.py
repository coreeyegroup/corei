#!/usr/bin/env python3

class FallbackManager:

    def fallback_response(self):

        return {
            "fallback": True
        }


if __name__ == "__main__":

    manager = FallbackManager()

    print(
        manager.fallback_response()
    )
