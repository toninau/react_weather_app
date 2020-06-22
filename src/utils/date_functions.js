const optionType = (type) => {
  switch (type) {
  case 'basic': {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }
    return options
  }
  case 'forecast': {
    const options = {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
    return options
  }
  default:
    return undefined
  }
}

export const localDateString = (dt, timezone, type) => {
  const options = optionType(type)
  const date = new Date((dt + timezone) * 1000)
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  const dateFormatted = formatter.format(date)
  return dateFormatted
}