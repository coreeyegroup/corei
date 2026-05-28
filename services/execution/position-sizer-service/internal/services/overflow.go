package services

func SafeMultiply(
    a int64,
    b int64,
) int64 {

    if a == 0 || b == 0 {
        return 0
    }

    result := a * b

    if result / a != b {
        return 0
    }

    return result
}
