#!/usr/bin/env python3

class TracePropagation:

    def propagate(
        self,
        trace_id: str
    ):

        return {
            "trace_id": trace_id
        }


if __name__ == "__main__":

    propagation = TracePropagation()

    print(
        propagation.propagate("trace-001")
    )
