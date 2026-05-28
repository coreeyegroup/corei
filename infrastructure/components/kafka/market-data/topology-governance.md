# MARKET DATA TOPOLOGY GOVERNANCE

Authoritative Kafka market-data topology.

Topics:
- raw_market_data_stream
- normalized_market_data_stream
- feature_store_updates
- market_session_stream
- market_validation_stream
- market_dead_letter_stream
- market_replay_stream
- historical_query_stream

Governance:
- deterministic retention
- replay-safe ordering
- explicit partition governance
- explicit replication governance
- no auto topic creation
