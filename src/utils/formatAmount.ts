export const formatAmount = (amount: number): string => {
  const formatter = new Intl.NumberFormat('ex-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0
  })

  return formatter.format(amount)
}