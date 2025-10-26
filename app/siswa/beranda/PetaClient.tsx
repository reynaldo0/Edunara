"use client";

import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Perbaikan ikon default Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Data lokasi
const daerahData = {
    Jakarta: {
        lat: -6.2088,
        lng: 106.8456,
        radius: 12000,
        kursus: [
            { name: "Kursus Bahasa Inggris Jakarta", lat: -6.1905, lng: 106.8227 },
            { name: "Kursus Coding Central", lat: -6.2146, lng: 106.8451 },
            { name: "Kursus Desain Grafis Kemang", lat: -6.2607, lng: 106.8129 },
        ],
    },
    Bogor: {
        lat: -6.595,
        lng: 106.816,
        radius: 15000,
        kursus: [
            { name: "Kursus Musik Bogor", lat: -6.588, lng: 106.820 },
            { name: "Kursus Matematika Cibinong", lat: -6.49, lng: 106.84 },
            { name: "Kursus Komputer Dramaga", lat: -6.56, lng: 106.73 },
        ],
    },
    Depok: {
        lat: -6.4025,
        lng: 106.7942,
        radius: 10000,
        kursus: [
            { name: "Kursus Bahasa Depok", lat: -6.38, lng: 106.78 },
            { name: "Kursus IT Margonda", lat: -6.41, lng: 106.82 },
            { name: "Kursus Public Speaking", lat: -6.39, lng: 106.77 },
        ],
    },
    Tangerang: {
        lat: -6.1783,
        lng: 106.6319,
        radius: 15000,
        kursus: [
            { name: "Kursus Otomotif Tangerang", lat: -6.19, lng: 106.63 },
            { name: "Kursus Menjahit Serpong", lat: -6.27, lng: 106.67 },
            { name: "Kursus Digital Marketing", lat: -6.22, lng: 106.58 },
        ],
    },
    Bekasi: {
        lat: -6.2349,
        lng: 106.9896,
        radius: 12000,
        kursus: [
            { name: "Kursus Komputer Bekasi", lat: -6.23, lng: 106.98 },
            { name: "Kursus Akuntansi Harapan Indah", lat: -6.20, lng: 107.00 },
            { name: "Kursus Desain Pondok Ungu", lat: -6.25, lng: 107.01 },
        ],
    },
};

// Animasi pindah peta
function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);
    return null;
}

interface Props {
    selected: keyof typeof daerahData;
}

export default function PetaClient({ selected }: Props) {
    const lokasi = daerahData[selected];

    return (
        <MapContainer
            center={[lokasi.lat, lokasi.lng]}
            zoom={12}
            scrollWheelZoom
            style={{ height: "100%", width: "100%" }}
        >
            <ChangeView center={[lokasi.lat, lokasi.lng]} zoom={12} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
                center={[lokasi.lat, lokasi.lng]}
                radius={lokasi.radius}
                pathOptions={{
                    color: "#F6AD55",
                    fillColor: "#F6AD55",
                    fillOpacity: 0.3,
                }}
            />
            {lokasi.kursus.map((kursus, i) => (
                <Marker key={i} position={[kursus.lat, kursus.lng]}>
                    <Popup>
                        <strong>{kursus.name}</strong>
                        <br />
                        {selected}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
