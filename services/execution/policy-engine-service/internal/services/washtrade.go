package services

func WashTradeDetected(
    buyCount int64,
    sellCount int64,
) bool {

    return buyCount == sellCount &&
        buyCount > 10
}
