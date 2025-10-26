"use client";

import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useEffect } from "react";

// Perbaiki ikon default Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Data wilayah Jabodetabek
const daerahOptions = {
    Jakarta: { lat: -6.2088, lng: 106.8456, radius: 12000 },
    Bogor: { lat: -6.595, lng: 106.816, radius: 15000 },
    Depok: { lat: -6.4025, lng: 106.7942, radius: 10000 },
    Tangerang: { lat: -6.1783, lng: 106.6319, radius: 15000 },
    Bekasi: { lat: -6.2349, lng: 106.9896, radius: 12000 },
};

// Komponen untuk memindahkan peta
function ChangeView({
    center,
    zoom,
}: {
    center: [number, number];
    zoom: number;
}) {
    const map = useMap();

    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.5 });
    }, [center, zoom, map]);

    return null;
}

export default function Lokasi() {
    const [selected, setSelected] = useState<keyof typeof daerahOptions>("Jakarta");
    const lokasi = daerahOptions[selected];

    // Titik kursus contoh di sekitar area
    const titikTempat = [
        { name: "Kursus A", lat: lokasi.lat + 0.02, lng: lokasi.lng + 0.02 },
        { name: "Kursus B", lat: lokasi.lat - 0.015, lng: lokasi.lng - 0.01 },
        { name: "Kursus C", lat: lokasi.lat + 0.01, lng: lokasi.lng - 0.02 },
    ];

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center bg-[#EBF8FF] px-4 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-6">
                Kursus di Sekitar Kamu
            </h2>

            {/* Pilihan Daerah */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {Object.keys(daerahOptions).map((daerah) => (
                    <button
                        key={daerah}
                        onClick={() => setSelected(daerah as keyof typeof daerahOptions)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${selected === daerah
                                ? "bg-[#3182CE] text-white shadow-lg scale-105"
                                : "bg-white text-[#1A202C] border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {daerah}
                    </button>
                ))}
            </div>

            {/* Peta */}
            <div className="w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#CBD5E0]">
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

                    {/* Lingkaran Area */}
                    <Circle
                        center={[lokasi.lat, lokasi.lng]}
                        radius={lokasi.radius}
                        pathOptions={{
                            color: "#F6AD55",
                            fillColor: "#F6AD55",
                            fillOpacity: 0.3,
                        }}
                    />

                    {/* Titik Tempat */}
                    {titikTempat.map((titik, index) => (
                        <Marker key={index} position={[titik.lat, titik.lng]}>
                            <Popup>
                                <strong>{titik.name}</strong>
                                <br />
                                {selected}
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
        </section>
    );
}
