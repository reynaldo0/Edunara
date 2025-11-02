"use client";

import { useSiswa } from "@/app/context/SiswaContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaWhatsapp, FaGlobe } from "react-icons/fa";

type Mentor = {
    name: string;
    position: string;
    photo: string;
};

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    image: string;
    logo?: string;
    mentor?: Mentor;
    details?: string[];
    whatsapp?: string;
    website?: string; // ✅ tambahkan properti website
};

export default function HeroDetailKursus() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const router = useRouter();
    const { setSearchTerm } = useSiswa();

    const [course, setCourse] = useState<Course | null>(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (!id) return;

        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data: Course[]) => {
                const found = data.find((item) => item.id === Number(id));
                setCourse(found || null);
            })
            .catch((err) => console.error("Gagal memuat detail hero:", err));
    }, [id]);

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (input.trim()) {
            setSearchTerm(input);
            router.push("/siswa/search");
        }
    };

    if (!course) return null;

    // ✅ Format link WhatsApp
    const whatsappLink = course.whatsapp
        ? `https://wa.me/${course.whatsapp.replace(/[^0-9]/g, "")}`
        : null;

    return (
        <main>
            {/* ✅ Hero Section */}
            <div className="bg-siswa-primary-200 rounded-b-[450px] relative flex flex-col items-center overflow-hidden">
                <div
                    className="relative flex flex-col items-center justify-center w-full 
                    min-h-[60vh] md:min-h-[80vh] sm:bg-contain md:bg-cover 
                    bg-bottom md:bg-center bg-no-repeat 
                    transition-all duration-500"
                    style={{ backgroundImage: `url('/illustrasi/siswa/kursus/detail.png')` }}
                >
                    {/* ✅ Kolom pencarian */}
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
                            placeholder="Cari kursus lain..."
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

            {/* ✅ Detail Kursus */}
            <div className="mt-16 md:mt-20 text-center px-6">
                {course.logo && (
                    <div className="flex justify-center mb-6">
                        <Image
                            src={course.logo}
                            alt="Logo kursus"
                            width={96}
                            height={96}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-full border-2 border-siswa-primary-100 shadow-lg"
                        />
                    </div>
                )}

                <h1 className="text-lg sm:text-2xl md:text-6xl font-bold text-pemilik-primary-200 leading-snug">
                    {course.title}
                </h1>

                <p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                    {course.description}
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm sm:text-base text-pemilik-primary-200/80">
                    <span className="bg-siswa-primary-200/70 px-5 py-2 rounded-full">
                        {course.category}
                    </span>
                    <span className="bg-siswa-primary-200/70 px-5 py-2 rounded-full">
                        {course.location}
                    </span>
                    <span className="bg-siswa-primary-200/70 px-5 py-2 rounded-full">
                        ⭐ {course.rating}/5
                    </span>
                </div>

                {/* ✅ Tombol Kontak */}
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    {/* Tombol WhatsApp */}
                    {whatsappLink && (
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white 
                            font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 
                            hover:scale-105 active:scale-95"
                        >
                            <FaWhatsapp className="text-xl" />
                            Hubungi via WhatsApp
                        </a>
                    )}

                    {/* Tombol Website Resmi */}
                    {course.website && (
                        <a
                            href={course.website.startsWith("http") ? course.website : `https://${course.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white 
                            font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 
                            hover:scale-105 active:scale-95"
                        >
                            <FaGlobe className="text-xl" />
                            Kunjungi Website Resmi
                        </a>
                    )}
                </div>
            </div>
        </main>
    );
}
