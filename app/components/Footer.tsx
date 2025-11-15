"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (!query.trim()) return;
        router.push(`/siswa/search?query=${encodeURIComponent(query)}`);
    };

    return (
        <footer className="relative bg-linear-to-b from-[#79C1FF] to-[#2E6DA4] text-gray-900 overflow-hidden pt-10 pb-6">
            <div className="relative max-w-6xl mx-auto px-6">

                {/* Top Row: Logo + Search */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex-shrink-0 mb-3 md:mb-0">
                        <Image
                            src="/illustrasi/logow.webp"
                            alt="Edunara Logo"
                            width={200}
                            height={45}
                            className="object-contain"
                        />
                    </div>

                    {/* Search Box */}
                    <div className="flex items-center bg-white rounded-full overflow-hidden w-full md:w-80 shadow-md">
                        <input
                            type="text"
                            placeholder="Cari informasi lain..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="px-4 py-2 text-sm text-gray-700 w-full focus:outline-none"
                        />

                        <button
                            onClick={handleSearch}
                            className="px-3 text-sky-600 hover:text-sky-800 flex items-center justify-center"
                        >
                            <FaSearch className="text-lg" />
                        </button>
                    </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">

                    {/* Alamat */}
                    <div>
                        <h3 className="font-semibold mb-2 text-white">Tujuan Kami :</h3>
                        <p className="text-gray-200 text-xs leading-relaxed">
                            Mengatasi sulitnya siswa menemukan tempat kursus yang tepat, dan sulitnya pemilik kursus menjangkau siswa baru.
                        </p>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h3 className="font-semibold mb-2 text-white">Kontak :</h3>

                        {/* Telepon */}
                        <p className="text-gray-200 text-xs flex items-center gap-2">
                            <FiPhone className="text-gray-200 w-4 h-4" />
                            +62 812 2490 932
                        </p>

                        {/* Email */}
                        <p className="text-gray-200 text-xs flex items-center gap-2 mt-2">
                            <FiMail className="text-gray-200 w-4 h-4" />
                            Edunara.study@gmail.com
                        </p>
                    </div>


                    {/* Navigasi */}
                    <div>
                        <h3 className="font-semibold mb-2 text-white">Navigasi :</h3>
                        <ul className="space-y-1 text-xs">
                            <li className="text-gray-200 hover:text-gray-300 cursor-pointer">Beranda</li>
                            <li className="text-gray-200 hover:text-gray-300 cursor-pointer">Tentang</li>
                            <li className="text-gray-200 hover:text-gray-300 cursor-pointer">Layanan</li>
                            <li className="text-gray-200 hover:text-gray-300 cursor-pointer">Kontak</li>
                        </ul>
                    </div>

                    {/* Sumber Data */}
                    <div>
                        <h3 className="font-semibold mb-2 text-white">Sumber Data :</h3>
                        <ul className="space-y-1 text-xs text-gray-200">
                            <li>Kemdikbud.go.id</li>
                            <li>BPS.go.id</li>
                            <li>Open Data Jakarta</li>
                            <li>Wikipedia</li>
                        </ul>
                    </div>

                    {/* Tim Kami */}
                    <div>
                        <h3 className="font-semibold mb-2 text-white">Tim Kami</h3>
                        <ul className="space-y-1 text-xs text-gray-200">
                            <li>Bekhyun Aditya</li>
                            <li>Reynaldo Yusellino</li>
                            <li>Afkar Sukmawan</li>
                        </ul>
                    </div>
                </div>

                {/* Button Row */}
                <div className="flex justify-end mt-6">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-full transition-transform duration-300 hover:scale-105">
                        Kembali
                    </button>
                </div>

                <hr className="border-gray-100 mt-6 mb-4" />

                {/* Copyright */}
                <div className="text-center text-xs text-white">
                    © {new Date().getFullYear()} <span className="font-semibold">EduNara</span>. Semua hak cipta dilindungi.
                </div>

            </div>
        </footer>
    );
}
