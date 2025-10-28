"use client";

import {
    MapContainer,
    TileLayer,
    Circle,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import Image from "next/image";

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    lat: number;
    lng: number;
    image: string;
};

// Perbaiki ikon bawaan Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Komponen bantu untuk animasi view
function ChangeView({
    center,
    zoom,
}: {
    center: [number, number];
    zoom: number;
}) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, { duration: 1.2 });
    }, [center, zoom, map]);
    return null;
}

interface Props {
    selected: string;
}

export default function PetaClient({ selected }: Props) {
    const [courses, setCourses] = useState<Course[]>([]);

    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Gagal memuat data kursus:", err));
    }, []);

    const filteredCourses = courses.filter(
        (course) => course.location.toLowerCase() === selected.toLowerCase()
    );

    const mainLocation =
        filteredCourses.length > 0
            ? [filteredCourses[0].lat, filteredCourses[0].lng]
            : [-6.2088, 106.8456]; // default Jakarta

    // 🔹 Radius & zoom tiap kota (disesuaikan agar tampak profesional)
    const cityConfig: Record<
        string,
        { radius: number; zoom: number }
    > = {
        jakarta: { radius: 8000, zoom: 13 },
        depok: { radius: 6000, zoom: 13 },
        bogor: { radius: 9000, zoom: 12 },
        tangerang: { radius: 10000, zoom: 12 },
        bekasi: { radius: 9000, zoom: 12 },
    };

    const config =
        cityConfig[selected.toLowerCase()] || { radius: 8000, zoom: 13 };

    return (
        <MapContainer
            center={mainLocation as [number, number]}
            zoom={config.zoom}
            scrollWheelZoom
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
        >
            <ChangeView
                center={mainLocation as [number, number]}
                zoom={config.zoom}
            />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Lingkaran area utama */}
            <Circle
                center={mainLocation as [number, number]}
                radius={config.radius}
                pathOptions={{
                    color: "#2563EB",
                    fillColor: "#60A5FA",
                    fillOpacity: 0.25,
                }}
            />

            {/* Marker tiap kursus */}
            {filteredCourses.map((course) => (
                <Marker key={course.id} position={[course.lat, course.lng]}>
                    <Popup>
                        <div className="max-w-[200px]">

                            <Image
                                src={course.image}
                                alt={course.title}
                                width={400}
                                height={200}
                                className="w-full h-24 object-cover rounded-md mb-2"
                            />
                            <strong className="text-sm text-siswa-primary-100 block mb-1">
                                {course.title}
                            </strong>
                            <p className="text-xs text-gray-600">{course.description}</p>
                            <p className="text-xs text-yellow-500 mt-1">
                                ⭐ {course.rating}/5
                            </p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
