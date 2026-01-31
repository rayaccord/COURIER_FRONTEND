import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function CourierMap({ location, incomingOrder }) {
  const mapRef = useRef(null);
  const courierMarkerRef = useRef(null);
  const restaurantMarkerRef = useRef(null);
  const customerMarkerRef = useRef(null);
  const routeLineRef = useRef(null);

  // Initialize map once
  useEffect(() => {
    if (!location) return; // guard against undefined
    if (!mapRef.current) {
      mapRef.current = L.map("courierMap", {
        center: [location.lat, location.lng],
        zoom: 15,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, [location]);

  // Update markers and route
  useEffect(() => {
    if (!mapRef.current || !location) return;

    const map = mapRef.current;

    // Courier Marker
    if (!courierMarkerRef.current) {
      courierMarkerRef.current = L.marker([location.lat, location.lng], {
        icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995472.png",
          iconSize: [35, 35],
          iconAnchor: [17, 35],
        }),
      }).addTo(map).bindPopup("You (Courier)");
    } else {
      courierMarkerRef.current.setLatLng([location.lat, location.lng]);
    }

    // Restaurant & Customer markers + route
    if (incomingOrder) {
      const { restaurant, customer } = incomingOrder;

      // Restaurant Marker
      if (!restaurantMarkerRef.current) {
        restaurantMarkerRef.current = L.marker([restaurant.lat, restaurant.lng], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
            iconSize: [35, 35],
            iconAnchor: [17, 35],
          }),
        }).addTo(map).bindPopup("Restaurant");
      } else {
        restaurantMarkerRef.current.setLatLng([restaurant.lat, restaurant.lng]);
      }

      // Customer Marker
      if (!customerMarkerRef.current) {
        customerMarkerRef.current = L.marker([customer.lat, customer.lng], {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png",
            iconSize: [35, 35],
            iconAnchor: [17, 35],
          }),
        }).addTo(map).bindPopup("Customer");
      } else {
        customerMarkerRef.current.setLatLng([customer.lat, customer.lng]);
      }

      // Route line
      const points = [
        [location.lat, location.lng],
        [restaurant.lat, restaurant.lng],
        [customer.lat, customer.lng],
      ];

      if (!routeLineRef.current) {
        routeLineRef.current = L.polyline(points, { color: "blue", weight: 4 }).addTo(map);
      } else {
        routeLineRef.current.setLatLngs(points);
      }

      // Fit map bounds to show all points
      const group = new L.featureGroup([
        courierMarkerRef.current,
        restaurantMarkerRef.current,
        customerMarkerRef.current,
      ]);
      map.fitBounds(group.getBounds().pad(0.3));
    }

    // Remove restaurant/customer markers & route if no order
    if (!incomingOrder) {
      if (restaurantMarkerRef.current) {
        map.removeLayer(restaurantMarkerRef.current);
        restaurantMarkerRef.current = null;
      }
      if (customerMarkerRef.current) {
        map.removeLayer(customerMarkerRef.current);
        customerMarkerRef.current = null;
      }
      if (routeLineRef.current) {
        map.removeLayer(routeLineRef.current);
        routeLineRef.current = null;
      }
    }
  }, [location, incomingOrder]);

  // Render map container
  return (
    <div
      id="courierMap"
      style={{
        height: "400px",
        width: "100%",
        marginTop: 20,
        borderRadius: 12,
        overflow: "hidden",
      }}
    />
  );
}
