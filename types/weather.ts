export interface WeatherData {
  msg: string
  code: number
  data: {
    location: {
      id: string
      name: string
      path: string
      longitude: number
      latitude: number
      timezone: number
    }
    daily: Array<{
      date: string
      high: number
      dayText: string
      dayCode: number
      dayWindDirection: string
      dayWindScale: string
      low: number
      nightText: string
      nightCode: number
      nightWindDirection: string
      nightWindScale: string
    }>
    now: {
      precipitation: number
      temperature: number
      pressure: number
      humidity: number
      windDirection: string
      windDirectionDegree: number
      windSpeed: number
      windScale: string
    }
    alarm: Array<{
      type: string
      level: string
      content: string
      publishTime: string
    }>
    lastUpdate: string
  }
}

