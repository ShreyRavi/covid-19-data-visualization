import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

let geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const DynamicCOVIDMap = ({data}) => {
  
  const colorScale = scaleQuantile()
    .domain(data.map(d => d.cases))
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

  return (
    <div>
        <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
            {({ geographies }) =>
            geographies.map(geo => {
                const cur = data.find((s) => {
                    return parseFloat(s.fips) == parseFloat(geo.id)
                });
                return (
                <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={cur ? colorScale(cur.cases) : "#EEF"}
                />
                );
            })
            }
        </Geographies>
        </ComposableMap>
    </div>
  );
};

export default DynamicCOVIDMap;