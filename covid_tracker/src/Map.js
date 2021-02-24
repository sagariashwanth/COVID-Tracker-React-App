import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./utils.js";

//--------------This function is added to change the map center
// when you select an particular country from dropdown------------------------------------//
function ChangeMap({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap>
        <ChangeMap center={center} zoom={zoom} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyroght">
        OpenStreetMap</a> contributors'
        />

        {/* Loop through the countries and draw those small circles and 
        you are doing some sort on utils.js file */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default Map;
