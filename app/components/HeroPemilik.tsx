"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";

export default function HeroPemilik() {
    const pathname = usePathname();

    // Tentukan background image berdasarkan path
    // Tentukan background image berdasarkan path
    const getBackgroundImage = () => {
        if (pathname === "/pemilik") return "/illustrasi/pemilik/beranda/hero.png";
        if (pathname === "/pemilik/komunitas") return "/illustrasi/pemilik/komunitas/hero.png";
        if (pathname === "/pemilik/tentang") return "/illustrasi/pemilik/tentang/hero.png";
        if (pathname === "/pemilik/mentor") return "/illustrasi/pemilik/mentor/hero.png";
        return "/illustrasi/default/hero.png";
    };

    // Tentukan judul berdasarkan path
    const getTitle = () => {
        if (pathname === "/pemilik") return "Bangun Kursusmu, sukseskan kelak nantinya";
        if (pathname === "/pemilik/komunitas") return "Bergabunglah bersama komunitas, cari teman seperjuanganmu!";
        if (pathname === "/pemilik/tentang") return "Latar Belakang Pembuatan Website UMKMAcademy";
        if (pathname === "/pemilik/mentor") return "TIngkatkan kualitas Kursus kamu dengan Mentor Profesional";
        return "Selamat Datang di UMKMAcademy";
    };

    return (
        <main>
            {/* Bagian Hero */}
            <div className="bg-pemilik-primary-100 rounded-b-[450px] relative flex flex-col items-center overflow-hidden">
                {/* Background Hero */}
                <div
                    className="relative flex flex-col items-center justify-center w-full 
                 min-h-[60vh] md:min-h-[80vh] sm:bg-contain md:bg-cover 
                 bg-bottom md:bg-center bg-no-repeat 
                 transition-all duration-500"
                    style={{
                        backgroundImage: `url('${getBackgroundImage()}')`,
                    }}
                >
                    {/* Kolom pencarian */}
                    <div
                        className="absolute bottom-[36%] md:bottom-[30%] flex items-center 
                   bg-white/90 backdrop-blur-sm rounded-full shadow-lg 
                   hover:shadow-xl transition-all duration-300 
                   px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-5 
                   w-[90%] sm:w-[85%] max-w-[680px] md:max-w-[1080px] group"
                    >
                        <input
                            type="text"
                            placeholder="Cari sesuatu..."
                            className="flex-1 bg-transparent outline-none text-gray-700 
                     placeholder-gray-400 text-sm sm:text-base md:text-lg 
                     transition-all duration-300 group-hover:text-gray-900"
                        />
                        <button
                            type="button"
                            className="bg-pemilik-primary-200 hover:bg-pemilik-primary-200 transition-all duration-300 
                     text-white rounded-full p-2 sm:p-3 flex items-center justify-center 
                     shadow-md hover:scale-105 active:scale-95"
                        >
                            <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Judul dinamis */}
            <h1 className="mt-16 md:mt-20 text-center text-lg sm:text-2xl md:text-5xl font-bold text-[#003653] leading-snug px-6">
                {getTitle()}
            </h1>
        </main>
    );

}
