package services

func ApplyBrokerConstraints(
    quantity int64,
) int64 {

    minLot := int64(1)
    maxLot := int64(1000)

    if quantity < minLot {
        return minLot
    }

    if quantity > maxLot {
        return maxLot
    }

    return quantity
}
