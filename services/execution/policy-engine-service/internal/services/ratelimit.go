package services

func RateLimitAllowed(
    currentOrders int64,
    maxOrders int64,
) bool {

    return currentOrders <= maxOrders
}
