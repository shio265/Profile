'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Image from 'next/image'

interface Activity {
  name: string
  type: number
  state?: string | null
  details?: string | null
  emoji?: {
    animated: boolean
    name: string
    id: string
    imageURL: string
  }
  text?: string | null
  start_time?: {
    unix: number
    raw: string
  } | null
  end_time?: {
    unix: number
    raw: string
  } | null
  timestamps?: {
    start: number
    end: number
  }
  application_id?: string
  created_at?: number
  assets?: {
    large_image?: {
      hash: string
      image_url: string
      text: string
    }
    small_image?: {
      hash: string
      image_url: string
      text: string
    }
  }
}

interface LanyardData {
  metadata: {
    id: string
    username: string
    global_name: string
    avatar_url: string
  }
  activities: Activity[]
  status: string
  active_platforms: {
    desktop?: string
    mobile?: string
    web?: string
    spotify?: {
      track_id: string
      song: string
      artist: string
      album: string
      album_cover: string
      start_time: {
        unix: number
        raw: string
      }
      end_time: {
        unix: number
        raw: string
      }
      time: {
        current_human_readable: string
        end_human_readable: string
      }
    } | null
  }
}


function getActivityPrefix(type: number): string {
  switch (type) {
    case 0: return 'Playing'
    case 1: return 'Streaming'
    case 2: return 'Listening to'
    case 3: return 'Watching'
    case 4: return ''
    case 5: return 'Competing in'
    default: return ''
  }
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function parseTime(timeString: string): number {
  const [mins, secs] = timeString.split(':').map(Number)
  return mins * 60 + secs
}

export default function CurrentActivity() {
  const [data, setData] = useState<LanyardData | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const lastUpdateRef = useRef<number>(0)
  const lastTrackRef = useRef<string>('')
  const fetchDataRef = useRef<(() => Promise<void>) | null>(null)
  const totalDurationRef = useRef<number>(0)
  const refreshInterval = parseInt(process.env.LANYARD_REFRESH_INTERVAL || '10000', 10)

  // current activity
  const activity = useMemo(() => {
    if (!data || !data.activities || data.activities.length === 0) {
      return null
    }
    return data.activities.find(a => a.type !== 4) || null
  }, [data])

  // Spotify from active_platforms
  const spotifyData = data?.active_platforms?.spotify

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/lanyard', {
          cache: 'no-store'
        })
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error('Failed to fetch Lanyard data:', error)
      }
    }
    // Store fetchData in ref so it can be called from other effects
    fetchDataRef.current = fetchData
    fetchData()
    const interval = setInterval(fetchData, refreshInterval)

    return () => clearInterval(interval)
  }, [refreshInterval])

  // Increment time every second and sync with data
  useEffect(() => {
    if (!spotifyData && !activity?.timestamps) {
      if (currentTime !== 0) {
        setCurrentTime(0)
      }
      lastTrackRef.current = ''
      return
    }

    // Track identifier to detect new track/activity
    const trackId = spotifyData?.track_id || activity?.application_id || ''
    const isNewTrack = trackId !== lastTrackRef.current && trackId !== ''

    // Get current time from API
    let apiCurrentTime = 0
    if (spotifyData?.time?.current_human_readable) {
      apiCurrentTime = parseTime(spotifyData.time.current_human_readable)
    } else if (activity?.timestamps) {
      const now = Date.now()
      apiCurrentTime = (now - activity.timestamps.start) / 1000
    }

    // Get total duration and store in ref
    let totalDuration = 0
    if (spotifyData?.time?.end_human_readable) {
      totalDuration = parseTime(spotifyData.time.end_human_readable)
    } else if (activity?.timestamps) {
      totalDuration = (activity.timestamps.end - activity.timestamps.start) / 1000
    }
    totalDurationRef.current = totalDuration

    // Reset time when it's a new track
    if (isNewTrack) {
      setCurrentTime(apiCurrentTime)
      lastTrackRef.current = trackId
      lastUpdateRef.current = Date.now()
    }

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1
        // Cap at total duration to prevent overflow
        if (totalDurationRef.current > 0 && next >= totalDurationRef.current) {
          // Trigger data refresh when reaching the end
          if (fetchDataRef.current) {
            fetchDataRef.current()
          }
          return totalDurationRef.current
        }
        return next
      })
    }, 1000)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyData?.track_id, activity?.application_id])

  // Separate effect to sync time when API data changes significantly
  useEffect(() => {
    if (!spotifyData?.time?.current_human_readable || !lastTrackRef.current) {
      return
    }

    const apiCurrentTime = parseTime(spotifyData.time.current_human_readable)
    const timeDiff = Math.abs(apiCurrentTime - currentTime)

    // Sync if difference is significant (> 3 seconds), indicating a seek
    if (timeDiff > 3) {
      setCurrentTime(apiCurrentTime)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyData?.time?.current_human_readable])

  // Prioritize Spotify from active_platforms
  if (spotifyData) {
    const spotifyUrl = `https://open.spotify.com/track/${spotifyData.track_id}`
    const totalDuration = spotifyData.time?.end_human_readable 
      ? parseTime(spotifyData.time.end_human_readable) 
      : 0
    const progress = totalDuration > 0 ? Math.min((currentTime / totalDuration) * 100, 100) : 0
    
    return (
      <div className="w-full max-w-sm rounded-lg">
        <h2 className="text-right text-sm text-white/90 mb-2">Current Activity</h2>
        <div className="flex gap-2 mb-2">
          {/* Content */}
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-white/70">Listening to</p>

            <h3 className="text-sm truncate text-white mt-3">
              {spotifyData.song}
            </h3>
            
            <p className="text-xs text-white/70 truncate">
              By {spotifyData.artist}
            </p>

            <p className="text-xs text-white/70 truncate">
              On {spotifyData.album}
            </p>
          </div>

          {/* Album Cover */}
          {spotifyData.album_cover && (
            <a 
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 hover:opacity-80 transition-opacity"
            >
              <Image 
                src={spotifyData.album_cover} 
                alt={spotifyData.album}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover cursor-pointer"
              />
            </a>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full space-y-1">
          <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden">
            <div 
              className="bg-white h-full transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(Math.max(0, currentTime))}</span>
            <span>{formatTime(totalDuration)}</span>
          </div>
        </div>
      </div>
    )
  }

  if (!activity) {
    return null
  }

  const prefix = getActivityPrefix(activity.type)
  const isListening = activity.type === 2

  if (isListening) {
    return (
      <div className="w-full max-w-sm rounded-lg">
        <h2 className="text-right text-sm text-white/90 mb-2">Current Activity</h2>
        <div className="flex gap-2">
          {/* Content */}
          <div className="flex-1 min-w-0 text-right">
            {prefix && (
              <p className="text-xs text-white/70">{prefix}</p>
            )}

            <h3 className="text-sm truncate text-white mt-7">
              {activity.details}
            </h3>
            
            {activity.state && (
              <p className="text-xs text-white/70 truncate">
                By {activity.state}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          {activity.assets?.large_image?.image_url && (
            <div className="relative shrink-0">
              <Image 
                src={activity.assets.large_image.image_url} 
                alt={activity.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-lg object-cover"
              />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm rounded-lg">
      <h2 className="text-right text-sm font-semibold text-white/90 mb-3">Current Activity</h2>
      <div className="flex gap-3 p-0">
        {/* Content */}
        <div className="flex-1 min-w-0 text-right">
          {prefix && (
            <p className="text-xs text-white/70 mb-3">{prefix}</p>
          )}
          
          {activity.type === 4 && activity.emoji && (
            <span className="mr-1">
              <Image
                src={activity.emoji.imageURL} 
                alt={activity.emoji.name}
                width={16}
                height={16}
                className="inline-block w-4 h-4"
              />
            </span>
          )}

          <h3 className="font-semibold text-sm truncate text-white">
            {activity.name}
          </h3>
          
          {activity.state && (
            <p className="text-xs text-white/70 truncate">
              {activity.state}
            </p>
          )}
          
          {activity.details && (
            <p className="text-xs text-white/70 truncate">
              {activity.details}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        {activity.assets?.large_image?.image_url && (
          <div className="relative shrink-0">
            <Image 
              src={activity.assets.large_image.image_url} 
              alt={activity.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  )
}
