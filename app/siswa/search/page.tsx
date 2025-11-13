"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useSiswa } from "@/app/context/SiswaContext";
import NavbarSiswa from "@/app/components/NavbarSiswa";
import { FaStar } from "react-icons/fa";
import HeroDefault from "@/app/components/HeroDefault";

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    image: string;
};

export default function SearchPage() {
    const { searchTerm } = useSiswa();
    const [courses, setCourses] = useState<Course[]>([]);

    // Ambil data
    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Gagal memuat data:", err));
    }, []);

    const filtered = useMemo(() => {
        if (!searchTerm.trim()) return courses;

        const term = searchTerm.toLowerCase();
        return courses.filter(
            (c) =>
                c.title.toLowerCase().includes(term) ||
                c.category.toLowerCase().includes(term) ||
                c.location.toLowerCase().includes(term)
        );
    }, [searchTerm, courses]);

    const RatingStars = ({ rating }: { rating: number }) => {
        const stars = Array.from({ length: 5 }, (_, i) => (
            <FaStar
                key={i}
                className={`${i < Math.round(rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                    }`}
            />
        ));
        return <div className="flex items-center space-x-1">{stars}</div>;
    };

    return (
        <>
            <NavbarSiswa />

            <main
                className="relative min-h-screen bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage: "url('/illustrasi/bg-siswa.png')",
                }}
            >
                <div className="absolute inset-0 bg-[#F0F9FF]/70 backdrop-blur-[1px]" />

                {/* Konten */}
                <div className="relative z-10">
                    <HeroDefault />
                    <section className="py-16 px-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-[#003653]">
                            Hasil pencarian untuk:{" "}
                            <span className="text-siswa-primary-100 italic">
                                {searchTerm || "Semua Kursus"}
                            </span>
                        </h2>

                        {filtered.length === 0 ? (
                            <p className="text-center text-gray-600 text-lg">
                                Tidak ada hasil ditemukan. Coba kata kunci lain ya!
                            </p>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {filtered.map((course) => (
                                    <div
                                        key={course.id}
                                        className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                    >
                                        {/* Gambar */}
                                        <div className="relative w-full h-52 overflow-hidden">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                width={400}
                                                height={250}
                                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Overlay hover */}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                <button className="bg-white border-2 border-siswa-primary-100 text-siswa-primary-100 px-5 py-2 rounded-full font-semibold text-sm hover:bg-siswa-primary-100 hover:text-white transition-all duration-300 shadow-md">
                                                    Lihat Detail
                                                </button>
                                            </div>
                                        </div>

                                        {/* Konten */}
                                        <div className="p-6 flex flex-col space-y-3">
                                            <div className="flex justify-between items-center">
                                                <p className="text-sm font-semibold text-siswa-primary-100">
                                                    {course.category}
                                                </p>
                                                <span className="text-xs text-white bg-siswa-primary-100 px-2 py-1 rounded-full">
                                                    {course.location}
                                                </span>
                                            </div>

                                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-siswa-primary-100 transition-colors duration-300">
                                                {course.title}
                                            </h3>

                                            <p className="text-sm text-gray-700 leading-relaxed line-clamp-3 md:line-clamp-none">
                                                {course.description}
                                            </p>

                                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 mt-2">
                                                <div className="flex items-center space-x-2">
                                                    <RatingStars rating={course.rating} />
                                                    <span className="text-sm text-gray-500">
                                                        {course.rating}/5
                                                    </span>
                                                </div>
                                                <button className="bg-siswa-primary-100 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-siswa-primary-200 hover:text-black transition-all duration-300 hover:scale-105">
                                                    Daftar Sekarang
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}
