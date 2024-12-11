'use client'

import { useState, useEffect } from 'react'
import WeatherApp from "../components/weather-app"
import { CitySearch } from "../components/CitySearch"

async function getWeatherData(cityId: string = '54511') {
  const res = await fetch(`/api/weather?stationid=${cityId}`)
  
  if (!res.ok) {
    throw new Error('Failed to fetch weather data')
  }
  
  return res.json()
}

export default function Page() {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleCitySelect = async (cityId: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getWeatherData(cityId)
      setWeatherData(data)
    } catch (err) {
      setError('Failed to fetch weather data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleCitySelect('54511')
  }, [])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-lg bg-red-500/10 p-4 text-red-500 backdrop-blur-sm">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute left-1/2 top-8 -translate-x-1/2 z-50">
        <CitySearch onCitySelect={handleCitySelect} isLoading={loading} />
      </div>
      {loading ? (
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg text-white/80">加载中...</div>
        </div>
      ) : weatherData && (
        <WeatherApp data={weatherData} />
      )}
    </div>
  )
}