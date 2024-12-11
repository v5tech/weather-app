import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const stationId = searchParams.get('stationid')
  
  if (!stationId) {
    return NextResponse.json({ error: 'Station ID is required' }, { status: 400 })
  }

  try {
    const response = await fetch(`https://weather.cma.cn/api/weather/view?stationid=${stationId}`)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}
