"use client";
import React from "react";
import { IPosition } from "@/Interfaces/Interfaces";
import downRed from "@/app/Assets/downRed.png";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

const MapComponent = ({ lat, lng }: IPosition) => {


  return (
    <>
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_KEY!}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 14
        }}
        style={{height: '100%'}}
      >
      </Map>
    </>
  );
};

export default MapComponent;
