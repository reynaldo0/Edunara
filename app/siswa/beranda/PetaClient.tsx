"use client";

import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    GeoJSON,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState, useMemo } from "react";
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

// Hilangkan warning default icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface Props {
    selected: string; // contoh: "Jakarta Timur"
}

export default function PetaClient({ selected }: Props) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [geoJsonMap, setGeoJsonMap] = useState<Record<string, any>>({}); // preload semua geojson

    const daerahList = [
        "Jakarta Pusat",
        "Jakarta Selatan",
        "Jakarta Timur",
        "Jakarta Barat",
        "Jakarta Utara",
    ];

    // Load semua GeoJSON di awal
    useEffect(() => {
        daerahList.forEach((daerah) => {
            const path = `/data/${daerah.toLowerCase().replace(/\s/g, "_")}.json`;
            fetch(path)
                .then((res) => res.json())
                .then((data) =>
                    setGeoJsonMap((prev) => ({ ...prev, [daerah]: data }))
                )
                .catch((err) => console.error(err));
        });
    });

    // Load courses
    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data: Course[]) => setCourses(data))
            .catch((err) => console.error(err));
    }, []);

    // Filter courses
    const filteredCourses = courses.filter(
        (course) => course.location.toLowerCase() === selected.toLowerCase()
    );

    const currentGeo = geoJsonMap[selected];

    // FlyToBounds ketika GeoJSON berubah
    const FitBounds = ({ geo }: { geo: any }) => {
        const map = useMap();
        const bounds = useMemo(() => {
            if (!geo) return null;
            const layer = L.geoJSON(geo);
            return layer.getBounds();
        }, [geo]);

        useEffect(() => {
            if (bounds) map.flyToBounds(bounds, { duration: 1.2 });
        }, [bounds, map]);

        return null;
    };

    return (
        <MapContainer
            center={[-6.2088, 106.8456]}
            zoom={13}
            scrollWheelZoom
            className="[&_.leaflet-control-container]:hidden"
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* GeoJSON area */}
            {currentGeo && (
                <>
                    <GeoJSON
                        key={selected}
                        data={currentGeo}
                        style={{
                            color: "#2563EB",
                            fillColor: "#60A5FA",
                            fillOpacity: 0.25,
                            weight: 2,
                        }}
                    />
                    <FitBounds geo={currentGeo} />
                </>
            )}

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
