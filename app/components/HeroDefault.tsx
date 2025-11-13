"use client";

import { usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSiswa } from "../context/SiswaContext"; // pastikan path sesuai

export default function HeroDefault() {
    const pathname = usePathname();
    const router = useRouter();
    const { setSearchTerm } = useSiswa();
    const [input, setInput] = useState(""); // state untuk input search
    const [isVisible, setIsVisible] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    const getBackgroundColor = () => {
        if (pathname.startsWith("/pemilik")) return "bg-pemilik-primary-100";
        if (pathname.startsWith("/siswa")) return "bg-siswa-primary-100";
        return "bg-gray-100";
    };

    const getBackgroundImage = () => {
        if (pathname === "/siswa") return "/illustrasi/siswa/beranda/hero.png";
        if (pathname === "/pemilik") return "/illustrasi/pemilik/hero/beranda.webp";
        if (pathname === "/siswa/kursus") return "/illustrasi/siswa/beranda/kursus.png";
        if (pathname.startsWith("/siswa/search")) return "/illustrasi/siswa/beranda/hero.png";
        return "/illustrasi/default/hero.png";
    };

    const getTitle = () => {
        if (pathname === "/pemilik") return "Bangun Kursusmu, sukseskan kelak nantinya";
        if (pathname === "/siswa") return "Temukan Kursus Terbaik untuk Perkembanganmu!";
        if (pathname.startsWith("/siswa/search")) return "Hasil Pencarian Kursus";
        return "Selamat Datang di Edunara";
    };

    // Intersection Observer untuk lazy load
    useEffect(() => {
        if (!heroRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(heroRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault(); // supaya form tidak reload halaman
        if (input.trim()) {
            setSearchTerm(input); // simpan ke context
            router.push(`/siswa/search?query=${encodeURIComponent(input)}`);
        }
    };

    return (
        <main>
            <div
                ref={heroRef}
                className={`${getBackgroundColor()} relative flex flex-col items-center overflow-hidden rounded-b-[450px] w-full min-h-[60vh] md:min-h-[80vh]`}
            >
                {isVisible && (
                    <Image
                        src={getBackgroundImage()}
                        alt="Hero Background"
                        fill
                        className="object-cover object-center"
                        loading="lazy"
                    />
                )}

                {/* Kolom pencarian */}
                {isVisible && pathname.startsWith("/siswa") && (
                    <form
                        onSubmit={handleSearch}
                        className="absolute bottom-[36%] md:bottom-[30%] flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 sm:px-7 sm:py-4 md:px-8 md:py-5 w-[90%] sm:w-[85%] max-w-[680px] md:max-w-[1080px] group"
                    >
                        <input
                            type="text"
                            placeholder="Cari sesuatu..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base md:text-lg transition-all duration-300 group-hover:text-gray-900"
                        />
                        <button
                            type="submit"
                            className="bg-siswa-primary-100 hover:bg-siswa-primary-100/80 transition-all duration-300 text-white rounded-full p-2 sm:p-3 flex items-center justify-center shadow-md hover:scale-105 active:scale-95"
                        >
                            <MagnifyingGlassIcon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                        </button>
                    </form>
                )}
            </div>

            {/* Judul */}
            <h1 className="mt-16 md:mt-20 text-center text-lg sm:text-2xl md:text-5xl font-bold text-[#003653] leading-snug px-6">
                {getTitle()}
            </h1>
        </main>
    );
}
