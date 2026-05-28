package services

func KillSwitchTriggered(
    dailyLoss int64,
    threshold int64,
) bool {

    return dailyLoss > threshold
}
