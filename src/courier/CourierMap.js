import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CourierMap({
  location,
  surge,
  online,
  navigate,
}) {
  const mapRef = useRef(null);
  const courierMarkerRef = useRef(null);

  // 🔥 NEW (IMPORTANT)
  const zonesRef = useRef([]);            // store stable zones
  const surgeCircleRefs = useRef([]);    // store drawn circles

  const surgeControlRef = useRef(null);

  /* ================= INIT MAP ================= */
  useEffect(() => {
    if (!location) return;

    if (!mapRef.current) {
      mapRef.current = L.map("courierMap", {
        center: [location.lat, location.lng],
        zoom: 15,
      });

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ).addTo(mapRef.current);
    }
  }, [location]);

  /* ================= COURIER MARKER ================= */
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const map = mapRef.current;

    if (!courierMarkerRef.current) {
      courierMarkerRef.current = L.marker([
        location.lat,
        location.lng,
      ]).addTo(map);
    } else {
      courierMarkerRef.current.setLatLng([
        location.lat,
        location.lng,
      ]);
    }
  }, [location]);

  /* ================= 🔥 CREATE STABLE ZONES ================= */
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const map = mapRef.current;

    // ✅ Create ONLY once when online
    if (zonesRef.current.length === 0 && online) {
      const multipliers = ["1x", "2.4x", "2.3x", "3x"];

      zonesRef.current = Array.from({ length: 3 }).map(() => ({
        lat: location.lat + (Math.random() - 0.5) * 0.01,
        lng: location.lng + (Math.random() - 0.5) * 0.01,
        multiplier:
          multipliers[Math.floor(Math.random() * multipliers.length)],
      }));
    }

    // 🧹 Clear old circles safely
    surgeCircleRefs.current.forEach((item) => {
      if (item?.circle && map.hasLayer(item.circle)) {
        map.removeLayer(item.circle);
      }
    });

    surgeCircleRefs.current = [];

    let nearest = null;

    // 🔁 Draw zones
    zonesRef.current.forEach((z) => {

  if (
    typeof z.lat !== "number" ||
    typeof z.lng !== "number" ||
    Number.isNaN(z.lat) ||
    Number.isNaN(z.lng)
  ) {
    console.log("❌ Invalid zone:", z);
    return;
  }

  const distance = map.distance(
    [location.lat, location.lng],
    [z.lat, z.lng]
  );

  const circle = L.circle([z.lat, z.lng], {
    radius: 400,
    color: "red",
    fillColor: "red",
    fillOpacity: 0.25,
  }).addTo(map);
      circle.bindPopup(
        `🔥 ${z.multiplier}<br/>📍 ${(distance / 1000).toFixed(2)} km away`
      );

      // 🔥 Click → go to earnings
      circle.on("click", () => {
        navigate("/courierearnings", {
          state: { multiplier: z.multiplier, location: "Hot Zone" },
        });
      });

      surgeCircleRefs.current.push({ circle, distance });

      if (!nearest || distance < nearest.distance) {
        nearest = { circle, distance };
      }
    });

    // 🟠 Highlight nearest
    if (nearest) {
      nearest.circle.setStyle({
        color: "orange",
        fillColor: "orange",
        fillOpacity: 0.5,
      });
    }

  }, [location, online]);

    /* ================= 🔥 UPDATE ONLY MULTIPLIERS ================= */
  useEffect(() => {
    if (!zonesRef.current.length) return;

    const multipliers = ["1x", "2.4x", "2.3x", "3x"];

    zonesRef.current = zonesRef.current.map((z) => ({
      ...z,
      multiplier:
        multipliers[Math.floor(Math.random() * multipliers.length)],
    }));
  }, [surge]);

  /* ================= RESET WHEN OFFLINE ================= */
  useEffect(() => {
    if (!online) {
      zonesRef.current = [];
    }
  }, [online]);


  /* ================= 🔄 REGENERATE ZONES EVERY 30s ================= */
useEffect(() => {
  if (!online) return;

  const interval = setInterval(() => {
    zonesRef.current = []; // clear → will regenerate on next render
  }, 30000); // 30 seconds

  return () => clearInterval(interval);
}, [online]);


  /* ================= 🔥 SURGE BUTTON ================= */
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // ✅ Create button ONCE
    if (!surgeControlRef.current) {
      const surgeControl = L.control({ position: "topright" });

      surgeControl.onAdd = function () {
        const div = L.DomUtil.create("div");

        div.innerHTML = `
          <div id="surgeBtn" style="
            background:white;
            padding:8px 12px;
            border-radius:10px;
            font-weight:600;
            cursor:pointer;
            box-shadow:0 2px 6px rgba(0,0,0,0.2);
            animation:pulse 1.5s infinite;
          ">
            🔥 <span id="surgeValue">${online ? surge : "1x"}</span>
          </div>
        `;

        return div;
      };

      surgeControl.addTo(map);
      surgeControlRef.current = surgeControl;

      // Click once
      setTimeout(() => {
        const btn = document.getElementById("surgeBtn");
        if (btn) {
          btn.onclick = () =>
            navigate("/courierearnings", {
              state: { multiplier: surge, location: "Hot Zone" },
            });
        }
      }, 300);
    }

    // ✅ Update value only
    const valueEl = document.getElementById("surgeValue");
    if (valueEl) {
      valueEl.innerText = online ? surge : "1x";
    }

  }, [surge, online]);

  return (
    <>
      {/* Pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
        `}
      </style>

      {/* Map */}
      <div
        id="courierMap"
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "12px",
        }}
      />
    </>
  );
}