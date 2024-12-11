'use client'

import { useState, useEffect, useRef } from 'react'
import { Command } from 'cmdk'
import { Search, MapPin, Loader2, X, Navigation } from 'lucide-react'

interface City {
  id: string
  name: string
  englishName: string
  country: string
}

interface CityResponse {
  msg: string
  code: number
  data: City[]
}

interface CitySearchProps {
  onCitySelect: (cityId: string) => void
  isLoading?: boolean
}

const RECENT_CITIES_KEY = 'recentCities'
const MAX_RECENT_CITIES = 5

export function CitySearch({ onCitySelect, isLoading }: CitySearchProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (value.length < 1) {
      setCities([])
      setError(null)
      return
    }

    setLoading(true)
    debounceTimer.current && clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/cities?q=${encodeURIComponent(value)}`)
        const data: CityResponse = await res.json()
        
        if (data.code === 0) {
          setCities(data.data)
          setError(null)
        } else {
          setError(data.msg || '加载城市失败')
          setCities([])
        }
      } catch (error) {
        console.error('Failed to fetch cities:', error)
        setError('加载城市失败')
        setCities([])
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      debounceTimer.current && clearTimeout(debounceTimer.current)
    }
  }, [value])

  const handleCitySelect = (city: City) => {
    onCitySelect(city.id)
    setOpen(false)
    setValue(city.name)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative w-full max-w-[400px]">
      <Command className="relative overflow-visible">
        <div className="group relative flex items-center rounded-full border-0 bg-gradient-to-r from-white/20 to-white/10 px-4 ring-1 ring-white/20 transition-all duration-300 hover:ring-white/30">
          {loading ? (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-white" />
          ) : (
            <Search className="h-4 w-4 shrink-0 text-white" />
          )}
          <Command.Input
            ref={inputRef}
            value={value}
            onValueChange={setValue}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="搜索全国城市天气..."
            className="flex h-12 w-full bg-transparent px-3 text-[15px] font-medium text-white placeholder:text-white/60 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isLoading}
          />
          {value && (
            <button
              onClick={() => setValue('')}
              className="rounded-full p-1.5 text-white opacity-0 transition-opacity hover:bg-white/20 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {open && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl bg-gradient-to-b from-white/20 to-white/10 p-1 shadow-xl ring-1 ring-white/20">
            {error ? (
              <div className="p-4 text-sm text-red-400">{error}</div>
            ) : value.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-white">
                <Search className="mb-2 h-10 w-10 opacity-60" />
                <div className="text-sm font-medium">输入城市名称开始搜索</div>
                <div className="mt-1 text-xs text-white/60">支持中文或拼音搜索</div>
              </div>
            ) : cities.length > 0 ? (
              <Command.List>
                {cities.map((city) => (
                  <Command.Item
                    key={city.id}
                    value={city.name}
                    onSelect={() => handleCitySelect(city)}
                    className="relative flex cursor-pointer select-none items-center rounded-xl px-3 py-2 text-sm text-white outline-none transition-colors hover:bg-white/20 data-[selected]:bg-white/20"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    <div>
                      <div className="font-medium">{city.name}</div>
                      <div className="text-xs text-white/60">
                        {city.englishName} · {city.country}
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            ) : !loading && (
              <div className="flex flex-col items-center justify-center py-6 text-white">
                <Navigation className="mb-2 h-10 w-10 opacity-60" />
                <div className="text-sm font-medium">未找到相关城市</div>
                <div className="mt-1 text-xs text-white/60">尝试搜索其他城市名称</div>
              </div>
            )}
          </div>
        )}
      </Command>
    </div>
  )
}
