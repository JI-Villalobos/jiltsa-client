export default function DateFormat(timestamp: string): string{
  const date: Date = new Date(timestamp)
  const year: string = date.getFullYear().toString()
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const day: string = String(date.getDate()).padStart(2, '0')

  return `${day}-${month}-${year}`
}
