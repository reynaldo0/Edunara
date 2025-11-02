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
import type { FeatureCollection } from "geojson";

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

// ✅ Pindahkan ke luar komponen agar tidak masuk dependency
const daerahList = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Barat",
    "Jakarta Utara",
] as const;

// Hilangkan warning default icon leaflet
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
    selected: string;
}

function FitBounds({ geo }: { geo: FeatureCollection | undefined }) {
    const map = useMap();

    useEffect(() => {
        if (!geo) return;
        const layer = L.geoJSON(geo);
        const bounds = layer.getBounds();
        if (bounds.isValid()) {
            map.flyToBounds(bounds, { duration: 1.2, easeLinearity: 0.25 });
        }
    }, [geo, map]);

    return null;
}

export default function PetaClient({ selected }: Props) {
    const [courses, setCourses] = useState<Course[]>([]);
    const [geoJsonMap, setGeoJsonMap] = useState<
        Record<string, FeatureCollection>
    >({});

    // ✅ Load semua GeoJSON sekali saja
    useEffect(() => {
        const loadAllGeo = async () => {
            const dataMap: Record<string, FeatureCollection> = {};
            await Promise.all(
                daerahList.map(async (daerah) => {
                    const path = `/data/${daerah.toLowerCase().replace(/\s/g, "_")}.json`;
                    try {
                        const res = await fetch(path);
                        const json: FeatureCollection = await res.json();
                        dataMap[daerah] = json;
                    } catch (err) {
                        console.error(err);
                    }
                })
            );
            setGeoJsonMap(dataMap);
        };
        loadAllGeo();
    }, []); // ✅ daerahList tidak perlu lagi

    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data: Course[]) => setCourses(data))
            .catch((err) => console.error(err));
    }, []);

    const filteredCourses = useMemo(
        () =>
            courses.filter(
                (course) => course.location.toLowerCase() === selected.toLowerCase()
            ),
        [courses, selected]
    );

    const currentGeo = geoJsonMap[selected];

    return (
        <MapContainer
            center={[-6.2088, 106.8456]}
            zoom={12}
            scrollWheelZoom
            className="[&_.leaflet-control-container]:hidden"
            style={{ height: "100%", width: "100%", borderRadius: "16px" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

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
