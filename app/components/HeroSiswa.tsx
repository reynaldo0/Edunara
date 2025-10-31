"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import { useSiswa } from "../context/SiswaContext";
import { useState } from "react";

export default function HeroSiswa() {
    const pathname = usePathname();
    const router = useRouter();
    const { setSearchTerm } = useSiswa();
    const [input, setInput] = useState("");

    const getBackgroundImage = () => {
        if (pathname === "/siswa") return "/illustrasi/siswa/beranda/hero.png";
        if (pathname === "/siswa/komunitas") return "/illustrasi/siswa/komunitas/hero.png";
        if (pathname === "/siswa/tentang") return "/illustrasi/siswa/tentang/hero.png";
        if (pathname === "/siswa/kursus") return "/illustrasi/siswa/beranda/kursus.png";
        if (pathname.startsWith("/siswa/search")) return "/illustrasi/siswa/beranda/hero.png";
        return "/illustrasi/default/hero.png";
    };

    const getTitle = () => {
        if (pathname === "/siswa") return "Cari Kursus lebih mudah dengan UMKMAcademy";
        if (pathname === "/siswa/komunitas") return "Bergabunglah bersama komunitas, cari teman seperjuanganmu!!";
        if (pathname === "/siswa/tentang") return "Latar Belakang Pembuatan Website UMKMAcademy";
        if (pathname === "/siswa/kursus") return "Jelajahi kursus menarik untuk Berkembang";
        if (pathname.startsWith("/siswa/search")) return "Hasil Pencarian Kursus";
        return "Selamat Datang di UMKMAcademy";
    };

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault(); // supaya form tidak reload halaman
        if (input.trim()) {
            setSearchTerm(input);
            router.push("/siswa/search");
        }
    };

    return (
        <main>
            {/* Bagian Hero */}
            <div className="bg-siswa-primary-200 rounded-b-[450px] relative flex flex-col items-center overflow-hidden">
                <div
                    className="relative flex flex-col items-center justify-center w-full 
                    min-h-[60vh] md:min-h-[80vh] sm:bg-contain md:bg-cover 
                    bg-bottom md:bg-center bg-no-repeat 
                    transition-all duration-500"
                    style={{ backgroundImage: `url('${getBackgroundImage()}')` }}
                >
                    {/* Kolom pencarian */}
                    <form
                        onSubmit={handleSearch}
                        className="absolute bottom-[36%] md:bottom-[30%] flex items-center 
                        bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
                        hover:shadow-xl transition-all duration-300 
                        px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-5 
                        w-[90%] sm:w-[85%] max-w-[680px] md:max-w-[1080px] group"
                    >
                        <input
                            type="text"
                            placeholder="Cari sesuatu..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-gray-700 
                            placeholder-gray-400 text-sm sm:text-base md:text-lg 
                            transition-all duration-300 group-hover:text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-siswa-primary-100 hover:bg-siswa-primary-100/80 transition-all duration-300 
                            text-white rounded-full p-2 sm:p-3 flex items-center justify-center 
                            shadow-md hover:scale-105 active:scale-95"
                        >
                            <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Judul dinamis */}
            <h1 className="mt-16 md:mt-20 text-center text-lg sm:text-2xl md:text-6xl font-bold text-pemilik-primary-200 leading-snug px-6">
                {getTitle()}
            </h1>
        </main>
    );
}
