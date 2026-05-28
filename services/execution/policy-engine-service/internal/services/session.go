package services

import (
    "time"
)

func SessionAllowed() bool {

    currentHour := time.Now().UTC().Hour()

    if currentHour < 6 {
        return false
    }

    if currentHour > 20 {
        return false
    }

    return true
}
