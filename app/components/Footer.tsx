"use client";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bg-[#A2DAF9] text-gray-900 overflow-hidden pt-10 pb-6">
            <div className="relative max-w-6xl mx-auto px-6">
                {/* Top Row: Description & Search Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <p className="font-medium text-center md:text-left mb-3 md:mb-0 leading-relaxed">
                        <div className="flex-shrink-0">
                            <Image
                                src="/illustrasi/logow.webp"
                                alt="Edunara Logo"
                                width={200}
                                height={45}
                                className="object-contain"
                            />
                        </div>
                    </p>
                    <div className="flex items-center bg-white rounded-full overflow-hidden w-full md:w-80 shadow-md">
                        <input
                            type="text"
                            placeholder="Cari informasi lain..."
                            className="px-4 py-2 text-sm text-gray-700 w-full focus:outline-none"
                        />
                        <button className="px-3 text-sky-600 hover:text-sky-800">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                <hr className="border-gray-300 mb-6" />

                {/* Main Footer Content */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-sm">
                    {/* Logo and Address */}
                    <div className="flex items-start gap-3">
                        <div>
                            <p className="font-semibold mb-2 text-gray-900/90">
                                Kunjungi Kami : <br />
                                Jl. R. Mangun Muka Raya No.11, Rawamangun,
                                Jakarta Timur, DKI Jakarta 13220
                            </p>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-900/90">Kontak :</h3>
                        <p className="text-xs">📞 +62 812 2490 932</p>
                        <p className="text-xs mt-1">✉️ Edunara.study@gmail.com</p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-900/90">Navigasi :</h3>
                        <ul className="space-y-1 text-xs">
                            <li>Beranda</li>
                            <li>Tentang</li>
                            <li>Layanan</li>
                            <li>Kontak</li>
                        </ul>
                    </div>

                    {/* Sumber Data */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-900/90">Sumber Data :</h3>
                        <ul className="space-y-1 text-xs">
                            <li>Kemdikbud.go.id</li>
                            <li>BPS.go.id</li>
                            <li>Open Data Jakarta</li>
                            <li>Wikipedia</li>
                        </ul>
                    </div>

                    {/* Sumber Data */}
                    <div>
                        <h3 className="font-semibold mb-2 text-gray-900/90">Tim Kami</h3>
                        <ul className="space-y-1 text-xs">
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

                {/* Bottom Separator */}
                <hr className="border-gray-800 mt-6 mb-4" />

                {/* Footer Credit */}
                <div className="text-center text-xs text-gray-900/80">
                    <p>
                        © {new Date().getFullYear()} <span className="font-semibold">EduNara</span>. Semua hak cipta dilindungi.
                    </p>
                </div>
            </div>
        </footer>
    );
}
