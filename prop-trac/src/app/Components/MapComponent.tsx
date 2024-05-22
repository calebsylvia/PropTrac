"use client";
import React from "react";
import { IPosition } from "@/Interfaces/Interfaces";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import downRed from "@/app/Assets/downRed.png";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";

const MapComponent = ({ lat, lng }: IPosition) => {
  const Map = ReactMapboxGl({
    accessToken: process.env.NEXT_PUBLIC_MAP_KEY!,
    scrollZoom: true,
    logoPosition: "bottom-right",
    minZoom: 15,
  });

  return (
    <>
      <Map
        style="mapbox://styles/mapbox/streets-v12"
        center={[lat, lng]}
        containerStyle={{
          height: "100%",
        }}
      >
        <Marker coordinates={[lat, lng]} anchor="bottom">
          <Image src={downRed} alt="Marker Icon"/>
        </Marker>
      </Map>
    </>
  );
};

export default MapComponent;
