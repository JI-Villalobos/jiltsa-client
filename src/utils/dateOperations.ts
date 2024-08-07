export const getCurrentDate = () => {
    const date = new Date()
    const fixed = date.getTimezoneOffset() * 60000
    const currentDate = new Date(Date.now() - fixed)

    return currentDate.toISOString()
}