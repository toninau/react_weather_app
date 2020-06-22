export const localDateString = (dt, timezone) => {
  const date = new Date((dt + timezone) * 1000)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: false
  })
  const dateFormatted = formatter.format(date)
  return dateFormatted
}