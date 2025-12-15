import React, { useEffect, useRef } from "react";

export default function TrackingPage() {
  const mapRef = useRef(null);
  const minutesEl = useRef(null);
  const estText = useRef(null);
  const progressRing = useRef(null);

  const INITIAL_MINUTES = 5; // ✅ Changed from 18 to 5 minutes

  const routeCoords = [
    { lat: -33.9249, lng: 18.4241 },
    { lat: -33.9255, lng: 18.423 },
    { lat: -33.9268, lng: 18.422 },
    { lat: -33.9278, lng: 18.421 },
    { lat: -33.9289, lng: 18.42 },
    { lat: -33.9296, lng: 18.419 },
    { lat: -33.9302, lng: 18.418 },
    { lat: -33.9309, lng: 18.417 },
    { lat: -33.9316, lng: 18.416 },
    { lat: -33.9323, lng: 18.415 },
  ];

  /* GOOGLE MAP + ANIMATION */
  useEffect(() => {
    const loader = document.createElement("script");
    loader.src =
      "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap";
    loader.async = true;
    window.initMap = initMap;
    document.body.appendChild(loader);

    let map, riderMarker, animIndex = 0, animFraction = 0;

    function initMap() {
      map = new window.google.maps.Map(mapRef.current, {
        center: routeCoords[0],
        zoom: 15,
        disableDefaultUI: true,
      });

      new window.google.maps.Polyline({
        path: routeCoords,
        strokeColor: "#60a5fa",
        strokeOpacity: 0.7,
        strokeWeight: 4,
        map,
      });

      riderMarker = new window.google.maps.Marker({
        position: routeCoords[0],
        map,
        icon: {
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
          fillColor: "#10b981",
          fillOpacity: 1,
          scale: 1.6,
          strokeWeight: 0,
          anchor: new window.google.maps.Point(12, 24),
        },
      });

      setInterval(() => {
        const from = routeCoords[animIndex];
        const to = routeCoords[Math.min(animIndex + 1, routeCoords.length - 1)];

        if (animIndex >= routeCoords.length - 1) return;

        animFraction += 0.08;
        if (animFraction >= 1) {
          animIndex++;
          animFraction = 0;
        }

        const lat = from.lat + (to.lat - from.lat) * animFraction;
        const lng = from.lng + (to.lng - from.lng) * animFraction;

        riderMarker.setPosition({ lat, lng });
      }, 1000);
    }
  }, []);

  /* COUNTDOWN TIMER */
  useEffect(() => {
    let remaining = INITIAL_MINUTES * 60;
    const total = remaining;

    const timer = setInterval(() => {
      if (remaining <= 0) {
        clearInterval(timer);
        window.location.href = "/orderdelivered"; // ✅ Redirect when timer reaches 0
        return;
      }

      remaining--;

      const mins = Math.ceil(remaining / 60);
      minutesEl.current.textContent = mins;
      estText.current.textContent = mins + " mins";

      const percent = (remaining / total) * 360;
      progressRing.current.style.setProperty("--percent", percent + "deg");
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.page}>
      <style>{CSS}</style>

      <div className="card">
        {/* MAP */}
        <div className="map-card">
          <div ref={mapRef} id="map"></div>

          <button className="center-btn">Center</button>

          <div ref={progressRing} className="progress-ring">
            <div className="progress-inner">
              <div ref={minutesEl} className="minutes">{INITIAL_MINUTES}</div>
              <div className="min-text">min</div>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="content">
          <div className="status-row">
            <div className="you-dot"></div>
            <div>
              <div className="status-text">
                Almost there! Your order is being prepared.
              </div>
              <div className="sub-text">
                Tortilla House Road • Estimated time:{" "}
                <span ref={estText} className="est-text">{INITIAL_MINUTES} mins</span>
              </div>
            </div>
          </div>

          <div className="btn-row">
            <button className="btn blue-btn">Hide order status</button>
            <button className="btn yellow-btn">Reschedule Order</button>
          </div>

          <button className="btn red-btn cancel-btn">
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at center, #ffffff 0%, #fd6128 100%)",
    padding: "20px",
  },
};

const CSS = `
.card {
  width: 100%;
  max-width: 430px;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
}
.map-card {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: #ddd;
}
#map {
  width: 100%;
  height: 100%;
}
.center-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 8px 14px;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(4px);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}
.progress-ring {
  width: 35%;
  max-width: 180px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: conic-gradient(#34d399 var(--percent, 360deg), #e5e7eb 0deg);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
}
.progress-inner {
  width: 78%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.minutes {
  font-size: clamp(24px, 6vw, 36px);
  font-weight: 600;
}
.min-text {
  font-size: clamp(10px, 2.5vw, 12px);
  color: #666;
}
.you-dot {
  width: 14px;
  height: 14px;
  background: #06b6d4;
  border: 2px solid #fff;
  border-radius: 50%;
  animation: pulse 1.6s infinite;
  flex-shrink: 0;
}
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(6,182,212,.3); }
  70% { box-shadow: 0 0 0 12px rgba(6,182,212,0); }
  100% { box-shadow: 0 0 0 0 rgba(6,182,212,0); }
}
.content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.status-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.status-text {
  font-weight: 600;
  color: #222;
  font-size: clamp(14px, 3.5vw, 16px);
}
.sub-text {
  color: #555;
  font-size: clamp(12px, 3vw, 14px);
}
.est-text {
  font-weight: 600;
}
.btn-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.btn {
  padding: clamp(8px, 2vw, 10px);
  border-radius: 8px;
  border: none;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  font-size: clamp(12px, 3vw, 14px);
}
.blue-btn { background: #0284c7; }
.yellow-btn { background: #fbbf24; color: #222; }
.red-btn { background: #dc2626; }
.cancel-btn { margin-top: 12px; }

@media (max-width: 480px) {
  .progress-ring {
    width: 40%;
  }
  .status-row {
    gap: 8px;
  }
  .btn-row {
    grid-template-columns: 1fr;
  }
}
`;
