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
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }
    return options
  }
  case 'details': {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }
    return options
  }
  case 'chart': {
    const options = {
      weekday: 'short',
      hour: '2-digit',
      timeZone: 'UTC'
    }
    return options
  }
  case 'chart-info': {
    const options = {
      weekday: 'long',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false
    }
    return options
  }
  default:
    return undefined
  }
}

export const localDateString = (dt, type) => {
  const options = optionType(type)
  const date = new Date(dt * 1000)
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  const dateFormatted = formatter.format(date)
  return dateFormatted
}

export const userDateString = (dt) => {
  const date = new Date(dt)
  const formatter = new Intl.DateTimeFormat('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    day: '2-digit'
  })
  const dateFormatted = formatter.format(date)
  return dateFormatted
}

export const localDateArray = (dt, type) => {
  const options = optionType(type)
  const date = new Date(dt * 1000)
  const formatter = new Intl.DateTimeFormat('en-GB', options)
  const dateFormatted = formatter.formatToParts(date)
  const dateArray = dateFormatted.filter(d => d.type !== 'literal').map(d => d.value)
  return dateArray
}