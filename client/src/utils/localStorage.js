const storageKey = 'weatherAppWeather'

export const saveState = (weather) => {
  try {
    const serializedState = JSON.stringify(weather)
    localStorage.setItem(storageKey, serializedState)
  } catch (err) {
    console.log(err)
  }
}

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(storageKey)
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}