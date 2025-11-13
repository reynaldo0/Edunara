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
import { FaMapMarkerAlt } from "react-icons/fa";

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

const daerahList = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Barat",
    "Jakarta Utara",
] as const;

// Hapus default warning Leaflet
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
    }, []);

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

    // Hitung rata-rata koordinat marker untuk ditampilkan
    const avgLat =
        filteredCourses.reduce((sum, c) => sum + c.lat, 0) / filteredCourses.length ||
        -6.2088;
    const avgLng =
        filteredCourses.reduce((sum, c) => sum + c.lng, 0) / filteredCourses.length ||
        106.8456;

    // Pilih file ilustrasi sesuai lokasi
    const ilustrasiFile = `/illustrasi/peta/${selected
        .toLowerCase()
        .replace(/\s/g, "-")}.webp`;

    return (
        <div className="relative w-full h-[600px] rounded-xl overflow-hidden shadow-lg">
            {/* 🧭 Info Card di kiri atas */}
            <div className="absolute top-4 left-4 z-1000 bg-white/90 backdrop-blur-md shadow-lg rounded-xl p-4 w-64 border border-gray-200">
                <div className="flex flex-row items-center space-x-4">
                    {/* Gambar */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0">
                        <Image
                            src={ilustrasiFile}
                            alt={selected}
                            fill
                            sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 200px"
                            className="object-contain"
                        />
                    </div>

                    {/* Teks */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center mb-1">
                            <FaMapMarkerAlt className="text-[#ECCC9D] text-xl mr-2" />
                            <span className="font-semibold text-gray-800 text-sm">
                                Lokasi Kamu
                            </span>
                        </div>
                        <h3 className="text-sm font-bold text-sky-700">
                            {selected}
                        </h3>
                        <h3 className="text-xs text-sky-700">
                            {avgLat.toFixed(5)}, {avgLng.toFixed(5)}
                        </h3>
                    </div>
                </div>
            </div>

            {/* 🗺️ Map Section */}
            <MapContainer
                center={[-6.2088, 106.8456]}
                zoom={12}
                scrollWheelZoom
                className="[&_.leaflet-control-container]:hidden"
                style={{ height: "100%", width: "100%" }}
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
                                color: "#1EA1F2",
                                fillColor: "#FFBF55",
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
                                    sizes="200px"
                                    className="w-full h-24 object-cover rounded-md mb-2"
                                />
                                <strong className="text-sm text-sky-700 block mb-1">
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
        </div>
    );
}
