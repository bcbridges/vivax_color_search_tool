import { Marker, Popup, useMap } from "react-leaflet";
import { HouseIcon } from "./Icons";
import bounded_pins from "../helpers/bounded_pins";
import pins from "../data/watson_color_data_2022.json";
import { useCallback, useState, useEffect } from "react";

function Pins({ map }) {
  const [bounded_arr, set_bounded_arr] = useState(null);

  const onMove = useCallback(() => {
    let bounds = map.getBounds().toBBoxString().split(",");
    set_bounded_arr(bounded_pins(bounds, pins));
  });

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  useEffect(() => {
    let bounds = map.getBounds().toBBoxString().split(",");
    set_bounded_arr(bounded_pins(bounds, pins));
  }, []);

  return (
    <>
      {bounded_arr
        ? bounded_arr.map((pin) => {
            return (
              <Marker
                position={[pin.Lat, pin.Lon]}
                key={pin.KF_Job_ID}
                icon={HouseIcon}
              >
                <Popup>
                  <a
                    target="_blank"
                    href={`https://maps.google.com/?q=${pin.Address}+${pin.City}+${pin.State}+${pin.Zip}`}
                  >
                    {`${pin.Address}, ${pin.City}, ${pin.State} ${pin.Zip}`}
                  </a>
                </Popup>
              </Marker>
            );
          })
        : null}
    </>
  );
}

export default Pins;