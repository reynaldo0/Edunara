"use client";

import { useState, useRef } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMap,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression, LatLngBoundsExpression } from "leaflet";
import Image from "next/image";
import { FaSearch, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

// ✅ Perbaikan ikon default Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

interface LocationMarkerProps {
    setPosition: (pos: { lat: number; lng: number }) => void;
}

function LocationMarker({ setPosition }: LocationMarkerProps) {
    useMapEvents({
        click(e) {
            setPosition(e.latlng);
        },
    });
    return null;
}

function FlyToLocation({ position }: { position: { lat: number; lng: number } | null }) {
    const map = useMap();
    if (position) map.flyTo([position.lat, position.lng], 15, { duration: 1.2 });
    return null;
}

export default function MapForm() {
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [nama, setNama] = useState("");
    const [kursus, setKursus] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // 📍 Fokus ke Jakarta
    const defaultCenter: LatLngExpression = [-6.2, 106.816666];
    const jakartaBounds: LatLngBoundsExpression = [
        [-6.35, 106.70],
        [-6.05, 107.00],
    ];

    const handleInputChange = async (value: string) => {
        setSearch(value);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
            if (value.trim().length < 3) {
                setSuggestions([]);
                return;
            }
            setLoading(true);
            try {
                // Hilangkan bounded dan viewbox agar seluruh Jakarta dicakup
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                        value + ", Jakarta, Indonesia"
                    )}&addressdetails=1&limit=6`
                );
                const data = await res.json();

                // Filter hasil agar tetap di area Jakarta (opsional)
                const filtered = data.filter((item: any) =>
                    item.display_name.toLowerCase().includes("jakarta")
                );

                setSuggestions(filtered);
            } catch (error) {
                console.error("❌ Gagal memuat lokasi:", error);
            } finally {
                setLoading(false);
            }
        }, 400);
    };


    const handleSelectSuggestion = (item: any) => {
        setPosition({
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
        });
        setSearch(item.display_name);
        setSuggestions([]);
    };

    const handleGetLocation = () => {
        if (!navigator.geolocation) {
            alert("Browser tidak mendukung geolokasi.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                if (
                    latitude < -6.35 ||
                    latitude > -6.05 ||
                    longitude < 106.70 ||
                    longitude > 107.00
                ) {
                    alert("Lokasi di luar area DKI Jakarta.");
                    return;
                }
                setPosition({ lat: latitude, lng: longitude });
            },
            () => alert("Gagal mendapatkan lokasi.")
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!nama || !kursus || !position) {
            alert("Lengkapi semua data terlebih dahulu!");
            return;
        }
        console.log("📍 Data tersimpan:", {
            nama,
            kursus,
            deskripsi,
            position,
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 🌄 Background */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/illustrasi/bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] -z-10" />

            {/* 🧭 Card utama */}
            <div className="md:bg-[#D9F1FF]/95 rounded-4xl p-8 md:m-12 w-full max-w-5xl flex flex-col items-center gap-8 text-center border border-[#CBE8FF]/60 shadow-2xl relative z-10">
                {/* Judul */}
                <div className="flex flex-col items-center gap-3 animate-fade-in">
                    <div className="bg-[#AEE3FF] rounded-full p-3 shadow-md hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 relative">
                            <Image
                                src="/illustrasi/pemilik.png"
                                alt="Lokasi UMKM"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <h2 className="font-extrabold text-2xl text-[#003B5C]">
                        Pilih Lokasi UMKM Anda (Jakarta)
                    </h2>
                    <p className="text-[#003B5C]/70 text-sm max-w-md">
                        Isi data Anda dan pilih lokasi di area DKI Jakarta (Pusat, Timur, Barat, Utara, Selatan).
                    </p>
                </div>

                {/* 🧾 Input Nama & Kursus */}
                <div className="max-w-3xl w-full gap-5 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="border border-[#AEE3FF] bg-white/60 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#3853A4] shadow-sm text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Nama Kursus / Program"
                            value={kursus}
                            onChange={(e) => setKursus(e.target.value)}
                            className="border border-[#AEE3FF] bg-white/60 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-[#3853A4] shadow-sm text-sm"
                        />
                    </div>
                    <textarea
                        placeholder="Deskripsi singkat tentang UMKM..."
                        value={deskripsi}
                        onChange={(e) => setDeskripsi(e.target.value)}
                        className="p-3 border border-[#AEE3FF] bg-white/60 rounded-lg w-full h-24 focus:outline-none focus:ring-2 focus:ring-[#3853A4]"
                    />
                </div>

                {/* 🔍 Form Pencarian */}
                <div className="flex flex-col md:flex-row items-center gap-3 w-full max-w-3xl relative">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (search.trim()) handleInputChange(search);
                        }}
                        className="relative w-full flex items-center"
                    >
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Cari alamat di Jakarta..."
                                value={search}
                                onChange={(e) => handleInputChange(e.target.value)}
                                className="border border-[#AEE3FF] bg-white/60 rounded-full p-3 w-full pl-10 pr-12 focus:outline-none focus:ring-2 focus:ring-[#3853A4] shadow-sm text-sm"
                            />
                            <FaSearch
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3853A4]"
                                size={16}
                            />

                            {/* Dropdown rekomendasi */}
                            {search.length >= 3 && (
                                <ul className="absolute left-0 top-full w-full mt-2 bg-white border border-[#AEE3FF] rounded-xl shadow-2xl overflow-hidden z-3000 text-left animate-fade-in max-h-64 overflow-y-auto">
                                    {loading ? (
                                        <li className="p-3 text-sm text-gray-500 italic flex items-center gap-2">
                                            <FaSearch className="animate-spin text-[#3853A4]" />
                                            Memuat lokasi...
                                        </li>
                                    ) : suggestions.length > 0 ? (
                                        suggestions.map((item, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelectSuggestion(item)}
                                                className="flex items-start gap-2 p-3 hover:bg-[#E8F6FF] cursor-pointer text-sm text-[#003B5C] transition-all duration-150 border-b border-gray-100 last:border-0"
                                            >
                                                <FaMapMarkerAlt className="text-[#3853A4] mt-1" />
                                                <div>
                                                    <span className="block font-medium">
                                                        {item.display_name.split(",")[0]}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {item.display_name.split(",").slice(1).join(",")}
                                                    </span>
                                                </div>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-3 text-sm text-gray-400 italic">
                                            Tidak ada lokasi ditemukan.
                                        </li>
                                    )}
                                </ul>
                            )}

                        </div>

                        {/* Tombol Kirim */}
                        <button
                            type="submit"
                            className="ml-2 bg-[#3853A4] hover:bg-[#2E448C] text-white px-4 py-3 rounded-full shadow-md transition-all duration-200 flex items-center justify-center hover:scale-105"
                            aria-label="Kirim"
                        >
                            <FaPaperPlane size={16} />
                        </button>
                    </form>

                    <button
                        type="button"
                        onClick={handleGetLocation}
                        className="bg-[#3853A4] hover:bg-[#2C418F] text-white px-5 py-3 rounded-xl font-medium transition-all duration-200 w-full md:w-auto hover:scale-105"
                    >
                        Lokasi Saya
                    </button>
                </div>

                {/* 🗺️ Peta */}
                <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-[#CBE8FF] shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                    <MapContainer
                        center={position || defaultCenter}
                        zoom={12}
                        style={{ width: "100%", height: "100%" }}
                        maxBounds={jakartaBounds}
                        maxBoundsViscosity={1.0}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution=""
                        />
                        <FlyToLocation position={position} />
                        <LocationMarker setPosition={setPosition} />
                        {position && <Marker position={position}></Marker>}
                    </MapContainer>
                </div>

                {/* 📍 Koordinat & Tombol Simpan */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4 w-full max-w-sm mt-4"
                >
                    <div className="flex gap-3 w-full">
                        <input
                            type="text"
                            value={position ? position.lat.toFixed(6) : ""}
                            placeholder="Latitude"
                            readOnly
                            className="border border-[#BFD4FF] p-2 rounded-lg bg-gray-100 w-1/2 text-center text-sm"
                        />
                        <input
                            type="text"
                            value={position ? position.lng.toFixed(6) : ""}
                            placeholder="Longitude"
                            readOnly
                            className="border border-[#BFD4FF] p-2 rounded-lg bg-gray-100 w-1/2 text-center text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#3853A4] hover:bg-[#2C418F] text-white py-3 px-8 rounded-xl font-semibold mt-3 transition-all duration-200 shadow-md hover:shadow-lg w-full hover:scale-105"
                    >
                        Simpan Data
                    </button>
                </form>
            </div>
        </div>
    );
}
