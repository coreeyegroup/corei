#!/usr/bin/env python3

import time


class RetryOrchestrator:

    def retry(
        self,
        fn,
        attempts=3
    ):

        for attempt in range(attempts):

            try:
                return fn()

            except Exception:

                if attempt == attempts - 1:
                    raise

                time.sleep(0.1)


if __name__ == "__main__":

    orchestrator = RetryOrchestrator()

    counter = {"value": 0}

    def flaky():

        counter["value"] += 1

        if counter["value"] < 3:
            raise Exception("temporary")

        return "recovered"

    print(
        orchestrator.retry(flaky)
    )
