'use client'

import { useState, useEffect } from 'react'
import { MapPin, Maximize2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface MapPickerProps {
  latitude?: string
  longitude?: string
  onLocationChange: (lat: string, lng: string) => void
  error?: string
}

export function MapPicker({ latitude, longitude, onLocationChange, error }: MapPickerProps) {
  const [lat, setLat] = useState(latitude || '')
  const [lng, setLng] = useState(longitude || '')
  const [mapOpen, setMapOpen] = useState(false)
  const [leafletLoaded, setLeafletLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)

  useEffect(() => {
    setLat(latitude || '')
    setLng(longitude || '')
  }, [latitude, longitude])

  const handleLatChange = (value: string) => {
    setLat(value)
    onLocationChange(value, lng)
  }

  const handleLngChange = (value: string) => {
    setLng(value)
    onLocationChange(lat, value)
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLat = position.coords.latitude.toFixed(6)
          const newLng = position.coords.longitude.toFixed(6)
          setLat(newLat)
          setLng(newLng)
          onLocationChange(newLat, newLng)
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your current location. Please check your browser permissions.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  const openInGoogleMaps = () => {
    if (lat && lng) {
      window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank')
    }
  }

  // Load Leaflet when dialog opens
  useEffect(() => {
    if (mapOpen && !leafletLoaded) {
      // Load Leaflet CSS
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
      link.crossOrigin = ''
      document.head.appendChild(link)

      // Load Leaflet JS
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
      script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo='
      script.crossOrigin = ''
      script.async = true
      script.onload = () => setLeafletLoaded(true)
      document.head.appendChild(script)
    }
  }, [mapOpen, leafletLoaded])

  // Initialize map when Leaflet is loaded
  useEffect(() => {
    if (leafletLoaded && mapOpen && !map) {
      const defaultLat = parseFloat(lat) || 24.7136
      const defaultLng = parseFloat(lng) || 46.6753

      // Wait for DOM to be ready
      setTimeout(() => {
        const mapElement = document.getElementById('leaflet-map')
        if (mapElement && window.L) {
          // Initialize map
          const newMap = window.L.map('leaflet-map').setView([defaultLat, defaultLng], 12)

          // Add OpenStreetMap tiles
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(newMap)

          // Add marker
          const newMarker = window.L.marker([defaultLat, defaultLng], {
            draggable: true,
          }).addTo(newMap)

          // Update coordinates when marker is dragged
          newMarker.on('dragend', (e: any) => {
            const position = e.target.getLatLng()
            const newLat = position.lat.toFixed(6)
            const newLng = position.lng.toFixed(6)
            setLat(newLat)
            setLng(newLng)
            onLocationChange(newLat, newLng)
          })

          // Update marker position when map is clicked
          newMap.on('click', (e: any) => {
            const clickedLat = e.latlng.lat.toFixed(6)
            const clickedLng = e.latlng.lng.toFixed(6)
            newMarker.setLatLng(e.latlng)
            setLat(clickedLat)
            setLng(clickedLng)
            onLocationChange(clickedLat, clickedLng)
          })

          setMap(newMap)
          setMarker(newMarker)
        }
      }, 100)
    }
  }, [leafletLoaded, mapOpen, map, lat, lng, onLocationChange])

  // Update marker position when coordinates change externally
  useEffect(() => {
    if (marker && lat && lng) {
      const newLat = parseFloat(lat)
      const newLng = parseFloat(lng)
      if (!isNaN(newLat) && !isNaN(newLng)) {
        marker.setLatLng([newLat, newLng])
        if (map) {
          map.setView([newLat, newLng], map.getZoom())
        }
      }
    }
  }, [lat, lng, marker, map])

  // Cleanup map when dialog closes
  useEffect(() => {
    if (!mapOpen && map) {
      map.remove()
      setMap(null)
      setMarker(null)
    }
  }, [mapOpen, map])

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Location Coordinates (Optional)
        </Label>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={getCurrentLocation}
          >
            Use Current Location
          </Button>
          <Dialog open={mapOpen} onOpenChange={setMapOpen}>
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Maximize2 className="w-4 h-4 mr-2" />
                Select on Map
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl h-150">
              <DialogHeader>
                <DialogTitle>Select Location on Map</DialogTitle>
                <DialogDescription>
                  Click on the map or drag the marker to select the course location
                </DialogDescription>
              </DialogHeader>
              <div id="leaflet-map" className="w-full h-full rounded-lg" style={{ minHeight: '400px' }} />
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  Selected: {lat && lng ? `${lat}, ${lng}` : 'No location selected'}
                </div>
                <Button onClick={() => setMapOpen(false)}>Done</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="text"
            placeholder="e.g., 24.7136"
            value={lat}
            onChange={(e) => handleLatChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Range: -90 to 90</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="text"
            placeholder="e.g., 46.6753"
            value={lng}
            onChange={(e) => handleLngChange(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Range: -180 to 180</p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {lat && lng && (
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={openInGoogleMaps}
          className="w-full"
        >
          View on Google Maps
        </Button>
      )}
    </Card>
  )
}

// Add TypeScript declaration for Leaflet
declare global {
  interface Window {
    L: any
  }
}
