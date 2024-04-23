'use client'
import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { IPosition } from '@/Interfaces/Interfaces'

const MapComponent = ({lat, lng}: IPosition) => {

  
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY!}>
        <Map defaultCenter={{lat, lng}}defaultZoom={14} key={new Date().getTime()}/>
      </APIProvider>
  )
}

export default MapComponent