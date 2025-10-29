"use client";

import { useEffect, useState, useMemo } from "react";
import HeroSiswa from "../../components/HeroSiswa";
import Image from "next/image";
import { useSiswa } from "@/app/context/SiswaContext";
import NavbarSiswa from "@/app/components/NavbarSiswa";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Course = {
    id: number;
    category: string;
    title: string;
    description: string;
    rating: number;
    location: string;
    image: string;
};

export default function HeroKursus() {
    const { searchTerm } = useSiswa();
    const [courses, setCourses] = useState<Course[]>([]);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState<Record<string, number>>({});
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Gagal memuat data:", err));
    }, []);

    // Responsif jumlah item per halaman + deteksi mobile
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsPerPage(1);
                setIsMobile(true);
            } else if (window.innerWidth < 1024) {
                setItemsPerPage(2);
                setIsMobile(false);
            } else {
                setItemsPerPage(3);
                setIsMobile(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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

    const groupedCourses = useMemo(() => {
        const groups: Record<string, Course[]> = {};
        filtered.forEach((course) => {
            if (!groups[course.location]) {
                groups[course.location] = [];
            }
            groups[course.location].push(course);
        });
        return groups;
    }, [filtered]);

    const RatingStars = ({ rating }: { rating: number }) => (
        <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                    key={i}
                    className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
                />
            ))}
        </div>
    );

    const handlePageChange = (location: string, page: number) => {
        setCurrentPage((prev) => ({ ...prev, [location]: page }));
    };

    return (
        <>
            <NavbarSiswa />

            <main
                className="relative min-h-screen bg-fixed bg-cover bg-center"
                style={{ backgroundImage: "url('/illustrasi/bg-siswa.png')" }}
            >
                <div className="absolute inset-0 bg-[#F0F9FF]/70 backdrop-blur-[1px]" />

                <div className="relative z-10">
                    <HeroSiswa />

                    <section className="py-16 px-6">
                        {filtered.length === 0 ? (
                            <p className="text-center text-gray-600 text-lg">
                                Data kursus tidak ditemukan.
                            </p>
                        ) : (
                            Object.entries(groupedCourses).map(([location, courses]) => {
                                const totalPages = Math.ceil(courses.length / itemsPerPage);
                                const current = currentPage[location] || 1;
                                const start = (current - 1) * itemsPerPage;
                                const visibleCourses = courses.slice(start, start + itemsPerPage);

                                return (
                                    <div key={location} className="mb-20 max-w-6xl mx-auto">
                                        {/* Header lokasi */}
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
                                            <h3 className="text-2xl font-bold text-siswa-primary-100 border-l-4 border-siswa-primary-100 pl-3">
                                                Daerah {location}
                                            </h3>

                                            {/* Pagination Desktop (angka) */}
                                            {!isMobile && totalPages > 1 && (
                                                <div className="flex gap-2 justify-end">
                                                    {Array.from({ length: totalPages }, (_, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handlePageChange(location, i + 1)}
                                                            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${current === i + 1
                                                                    ? "bg-siswa-primary-100 text-white scale-105"
                                                                    : "bg-white border border-siswa-primary-100 text-siswa-primary-100 hover:bg-siswa-primary-100 hover:text-white"
                                                                }`}
                                                        >
                                                            {i + 1}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Grid kursus */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                            {visibleCourses.map((course) => (
                                                <div
                                                    key={course.id}
                                                    className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                                                >
                                                    <div className="relative w-full h-52 overflow-hidden">
                                                        <Image
                                                            src={course.image}
                                                            alt={course.title}
                                                            width={400}
                                                            height={250}
                                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                                            <button className="bg-white border-2 border-siswa-primary-100 text-siswa-primary-100 px-5 py-2 rounded-full font-semibold text-sm hover:bg-siswa-primary-100 hover:text-white transition-all duration-300 shadow-md">
                                                                Lihat Detail
                                                            </button>
                                                        </div>
                                                    </div>

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

                                        {/* Pagination Mobile (ikon panah di bawah grid) */}
                                        {isMobile && totalPages > 1 && (
                                            <div className="flex justify-center items-center gap-6 mt-8">
                                                <button
                                                    onClick={() =>
                                                        handlePageChange(location, Math.max(1, current - 1))
                                                    }
                                                    disabled={current === 1}
                                                    className={`p-3 rounded-full shadow-md transition-all duration-300 ${current === 1
                                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                            : "bg-siswa-primary-100 text-white hover:bg-siswa-primary-200"
                                                        }`}
                                                >
                                                    <FaChevronLeft size={16} />
                                                </button>

                                                <span className="text-sm font-semibold text-gray-700">
                                                    Halaman {current} / {totalPages}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        handlePageChange(location, Math.min(totalPages, current + 1))
                                                    }
                                                    disabled={current === totalPages}
                                                    className={`p-3 rounded-full shadow-md transition-all duration-300 ${current === totalPages
                                                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                            : "bg-siswa-primary-100 text-white hover:bg-siswa-primary-200"
                                                        }`}
                                                >
                                                    <FaChevronRight size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}
