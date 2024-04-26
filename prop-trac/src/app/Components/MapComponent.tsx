'use client'
import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'
import { IPosition } from '@/Interfaces/Interfaces'

const MapComponent = ({lat, lng}: IPosition) => {

  
  
  
  return (

    <div style={{
      borderRadius: '20% !important',
      width: '100%',
      height: '100%'
    }}>
    <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_KEY!}>
        <Map defaultCenter={{lat, lng}} defaultZoom={14} key={new Date().getTime()}/>
    </APIProvider>
    </div>
  )
}

export default MapComponent