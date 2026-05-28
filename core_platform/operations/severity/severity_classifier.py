#!/usr/bin/env python3


class SeverityClassifier:

    def classify(
        self,
        event: dict
    ):

        if event.get("service_down"):
            return "critical"

        if event.get("latency_ms", 0) > 1000:
            return "high"

        return "medium"


if __name__ == "__main__":

    classifier = SeverityClassifier()

    print(
        classifier.classify({
            "service_down": True
        })
    )
