'use client'

import { AlertTriangle, MapPin, Cloud, CloudSun, Droplets, Gauge, Plane, Sun, Wind, CloudRain, CloudSnow, CloudLightning, CloudFog, Tornado, CloudHail, Thermometer, Snowflake, CloudDrizzle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { WeatherData } from "../types/weather"
import { SunEffect } from './SunEffect'
import { CloudEffect } from './CloudEffect'
import { RainEffect } from './RainEffect'
import { ThunderstormEffect } from './ThunderstormEffect'
import { RainSnowEffect } from './RainSnowEffect'
import { SnowEffect } from './SnowEffect'
import { FogEffect } from './FogEffect'
import { FreezingRainEffect } from './FreezingRainEffect'
import { SandstormEffect } from './SandstormEffect'
import { HazeEffect } from './HazeEffect'

export default function WeatherApp({ data }: { data: WeatherData }) {
  const { location, now, daily, alarm } = data.data
  const [city, province] = location.path.split(", ").slice(1)

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}/${date.getDate()}`
  }

  const getDayOfWeek = (dateStr: string, index: number) => {
    if (index === 0) return "今天"
    if (index === 1) return "明天"
    if (index === 2) return "后天"
    const date = new Date(dateStr)
    const days = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
    return days[date.getDay()]
  }

  const getWeatherIcon = (text: string) => {
    switch (text) {
      case "晴": return <Sun className="h-6 w-6 text-yellow-400" />
      case "多云": return <CloudSun className="h-6 w-6 text-gray-400" />
      case "阴": return <Cloud className="h-6 w-6 text-gray-500" />
      case "阵雨": return <CloudRain className="h-6 w-6 text-blue-400" />
      case "雷阵雨": return <CloudLightning className="h-6 w-6 text-yellow-500" />
      case "雷阵雨伴有冰雹": return <CloudHail className="h-6 w-6 text-purple-500" />
      case "雨夹雪": return <CloudSnow className="h-6 w-6 text-blue-300" />
      case "小雨": return <CloudDrizzle className="h-6 w-6 text-blue-300" />
      case "中雨": return <CloudRain className="h-6 w-6 text-blue-400" />
      case "大雨": return <CloudRain className="h-6 w-6 text-blue-500" />
      case "暴雨": case "大暴雨": case "特大暴雨": return <CloudRain className="h-6 w-6 text-blue-600" />
      case "阵雪": case "小雪": return <CloudSnow className="h-6 w-6 text-blue-200" />
      case "中雪": case "大雪": case "暴雪": return <CloudSnow className="h-6 w-6 text-blue-300" />
      case "雾": return <CloudFog className="h-6 w-6 text-gray-400" />
      case "冻雨": return <CloudHail className="h-6 w-6 text-blue-400" />
      case "沙尘暴": case "浮尘": case "扬沙": case "强沙尘暴": return <Wind className="h-6 w-6 text-yellow-600" />
      case "小到中雨": return <CloudRain className="h-6 w-6 text-blue-350" />
      case "中到大雨": return <CloudRain className="h-6 w-6 text-blue-450" />
      case "大到暴雨": return <CloudRain className="h-6 w-6 text-blue-550" />
      case "暴雨到大暴雨": return <CloudRain className="h-6 w-6 text-blue-650" />
      case "大暴雨到特大暴雨": return <CloudRain className="h-6 w-6 text-blue-700" />
      case "小到中雪": return <CloudSnow className="h-6 w-6 text-blue-250" />
      case "中到大雪": return <CloudSnow className="h-6 w-6 text-blue-350" />
      case "大到暴雪": return <CloudSnow className="h-6 w-6 text-blue-450" />
      case "霾": return <CloudFog className="h-6 w-6 text-yellow-700" />
      case "雨": return <CloudRain className="h-6 w-6 text-blue-400" />
      case "雪": return <Snowflake className="h-6 w-6 text-blue-300" />
      default: return <Cloud className="h-6 w-6 text-gray-400" />
    }
  }

  const getWeatherEffect = (text: string) => {
    switch (text) {
      case "晴": return <SunEffect />
      case "多云": return <CloudEffect />
      case "阴": return <CloudEffect dense={true} />
      case "阵雨": case "小雨": case "中雨": case "大雨": case "暴雨": case "大暴雨": case "特大暴雨":
      case "小到中雨": case "中到大雨": case "大到暴雨": case "暴雨到大暴雨": case "大暴雨到特大暴雨": case "雨":
        return <RainEffect intensity={text} />
      case "雷阵雨": return <ThunderstormEffect />
      case "雷阵雨伴有冰雹": return <ThunderstormEffect withHail={true} />
      case "雨夹雪": return <RainSnowEffect />
      case "阵雪": case "小雪": case "中雪": case "大雪": case "暴雪":
      case "小到中雪": case "中到大雪": case "大到暴雪": case "雪":
        return <SnowEffect intensity={text} />
      case "雾": return <FogEffect />
      case "冻雨": return <FreezingRainEffect />
      case "沙尘暴": case "浮尘": case "扬沙": case "强沙尘暴": return <SandstormEffect intensity={text} />
      case "霾": return <HazeEffect />
      default: return null
    }
  }

  const getBackgroundStyle = (text: string) => {
    switch (text) {
      case "晴": return "from-blue-400 to-blue-600"
      case "多云": return "from-gray-300 to-blue-400"
      case "阴": return "from-gray-400 to-gray-600"
      case "阵雨": case "小雨": return "from-gray-400 to-blue-500"
      case "中雨": case "大雨": return "from-gray-500 to-blue-600"
      case "暴雨": case "大暴雨": case "特大暴雨": return "from-gray-600 to-blue-700"
      case "雷阵雨": return "from-gray-700 to-purple-600"
      case "雷阵雨伴有冰雹": return "from-gray-700 to-purple-700"
      case "雨夹雪": return "from-gray-400 to-blue-300"
      case "阵雪": case "小雪": return "from-blue-100 to-blue-300"
      case "中雪": case "大雪": case "暴雪": return "from-blue-200 to-blue-400"
      case "雾": return "from-gray-300 to-gray-500"
      case "冻雨": return "from-blue-300 to-blue-500"
      case "沙尘暴": case "浮尘": case "扬沙": return "from-yellow-600 to-yellow-800"
      case "强沙尘暴": return "from-yellow-700 to-yellow-900"
      case "小到中雨": return "from-gray-400 to-blue-550"
      case "中到大雨": return "from-gray-500 to-blue-600"
      case "大到暴雨": return "from-gray-550 to-blue-650"
      case "暴雨到大暴雨": return "from-gray-600 to-blue-700"
      case "大暴雨到特大暴雨": return "from-gray-650 to-blue-750"
      case "小到中雪": return "from-blue-150 to-blue-350"
      case "中到大雪": return "from-blue-250 to-blue-450"
      case "大到暴雪": return "from-blue-350 to-blue-550"
      case "霾": return "from-yellow-700 to-yellow-900"
      case "雨": return "from-gray-500 to-blue-600"
      case "雪": return "from-blue-200 to-blue-400"
      default: return "from-blue-500 to-blue-700"
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundStyle(daily[0]?.dayText)} text-white p-4 relative overflow-hidden`}>
      {getWeatherEffect(daily[0]?.dayText)}
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              <div className="text-2xl font-medium">{location.name}</div>
            </div>
            <div className="text-sm text-white/80 pl-7">{location.path}</div>
          </div>
          <div className="text-xl">
            {data.data.lastUpdate.split(" ")[1]}
          </div>
        </div>

        {/* Current Temperature */}
        <div>
          <div className="text-8xl font-light mb-12">
            {now.temperature.toFixed(1)}°C
          </div>
        </div>

        {/* Current Weather Details */}
        <div className="grid grid-cols-5 gap-8 text-center mb-8">
          <div className="flex flex-col items-center gap-1">
            <Plane className="h-5 w-5 rotate-[20deg]" />
            <div className="text-sm">风向</div>
            <div className="text-sm">{now.windDirection}</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Droplets className="h-5 w-5" />
            <div className="text-sm">相对湿度</div>
            <div className="text-sm">{now.humidity}%</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Plane className="h-5 w-5" />
            <div className="text-sm">风速</div>
            <div className="text-sm">{now.windSpeed}m/s</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Gauge className="h-5 w-5" />
            <div className="text-sm">气压</div>
            <div className="text-sm">{now.pressure}hpa</div>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Droplets className="h-5 w-5" />
            <div className="text-sm">降水量</div>
            <div className="text-sm">{now.precipitation}mm</div>
          </div>
        </div>

        {/* Weather Alerts */}
        {alarm.length > 0 && (
          <div className="space-y-3 mt-4">
            {alarm.map((alert) => {
              const severityMatch = alert.title.match(/\[(.*?)\]/);
              const severityLevel = severityMatch ? severityMatch[1] : alert.severity;

              return (
                <Alert 
                  key={alert.id} 
                  className={`border-2`}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <AlertTitle className="flex items-center gap-2 text-base">
                    <span className="font-semibold">{alert.signaltype}{alert.signallevel}预警</span>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-black/10" style={{color: alert.severity}}>
                      {severityLevel}
                    </span>
                  </AlertTitle>
                  <AlertDescription>
                    <p className="mt-2 text-sm">{alert.title}</p>
                    <div className="flex justify-between text-xs mt-3 text-black/60">
                      <span className="text-white">发布时间: {alert.effective}</span>
                    </div>
                  </AlertDescription>
                </Alert>
              );
            })}
          </div>
        )}

        {/* Weather Forecast */}
        <div className="grid grid-cols-7 gap-4 text-center pt-4">
          {daily.map((day, index) => (
            <div key={day.date} className="space-y-2">
              <div>{getDayOfWeek(day.date, index)}</div>
              <div className="text-sm">{formatDate(day.date)}</div>
              <div className="flex flex-col items-center gap-1">
                {getWeatherIcon(day.dayText)}
                {getWeatherIcon(day.nightText)}
              </div>
              <div>
                {day.high}°/{day.low}°
              </div>
              <div className="text-sm">{day.dayText}</div>
              <div className="text-sm">{day.dayWindScale}</div>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-white/60 pt-2">
          最后更新: {data.data.lastUpdate}
        </div>
      </div>
    </div>
  )
}
