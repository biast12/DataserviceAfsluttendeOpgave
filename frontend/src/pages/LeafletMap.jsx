import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const LeafletMap = ({lat, lon, zoom}) => {
  const mapContainerRef = useRef();
  const markerRef = useRef();

  useEffect(() => {
    if (!mapContainerRef.current) {
      // indlæs kort
      mapContainerRef.current = L.map("mapcontainer").setView([lat, lon], zoom);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapContainerRef.current);

      // placer en markør
      markerRef.current = L.marker([lat, lon]).addTo(mapContainerRef.current);
    } else {
        // flyt kortet
        mapContainerRef.current.setView([lat, lon], zoom);
        // flyt markøren
        markerRef.current.setLatLng([lat, lon]);
    }
  }, [lat, lon]);

  return (
    <article className="m-10 border card">
      <div className="card-body">
        <div id="mapcontainer" style={{ width: "500px", height: "500px" }}></div>
      </div>
    </article>
  );
};

export default LeafletMap;
