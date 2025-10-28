"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { useSiswa } from "../../context/SiswaContext";

const categories = [
    { name: "Matematika"},
    { name: "Bahasa Inggris"},
    { name: "Bahasa Jepang"},
    { name: "Bahasa Korea"},
    { name: "Pemrograman"},
] as const;

type CategoryName = typeof categories[number]["name"];

export default function Kategori() {
    const { siswa } = useSiswa();
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryName>("Bahasa Inggris");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    useEffect(() => {
        fetch("/data/courses.json")
            .then((res) => res.json())
            .then((data) => setCourses(data))
            .catch((err) => console.error("Gagal memuat data:", err));
    }, []);

    useEffect(() => {
        if (siswa.kategori && categories.some((c) => c.name === siswa.kategori)) {
            queueMicrotask(() => {
                setSelectedCategory(siswa.kategori as CategoryName);
            });
        }
    }, [siswa.kategori]);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerSlide(1);
            else if (window.innerWidth < 1024) setItemsPerSlide(2);
            else setItemsPerSlide(3);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredCourses = courses.filter(
        (course) =>
            course.category === selectedCategory &&
            (!siswa.lokasi ||
                course.lokasi.toLowerCase() === siswa.lokasi.toLowerCase())
    );

    const maxIndex = Math.max(0, filteredCourses.length - itemsPerSlide);
    const nextSlide = () =>
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
    const prevSlide = () =>
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));

    // 🔹 Komponen kecil untuk menampilkan bintang rating dinamis
    const RatingStars = ({ rating }: { rating: number }) => {
        const stars = Array.from({ length: 5 }, (_, i) => (
            <StarIcon
                key={i}
                className={`w-5 h-5 ${i < Math.round(rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
            />
        ));
        return <div className="flex items-center">{stars}</div>;
    };

    return (
        <section className="min-h-screen flex flex-col items-center py-12 px-6 sm:px-10 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
                Kategori Kursus
            </h2>

            {/* Tombol kategori */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => {
                            setSelectedCategory(cat.name);
                            setCurrentIndex(0);
                        }}
                        className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium shadow-md transition-all duration-300 ${selectedCategory === cat.name
                                ? `bg-siswa-primary-200 text-black scale-105`
                                : "bg-white border-2 border-siswa-primary-200 text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Jika belum ada data */}
            {filteredCourses.length === 0 ? (
                <p className="text-gray-600 text-lg font-medium">
                    Tidak ada kursus untuk kategori{" "}
                    <span className="font-semibold">{selectedCategory}</span>
                    {siswa.lokasi && ` di ${siswa.lokasi}`}.
                </p>
            ) : (
                <div className="relative w-full max-w-6xl flex items-center justify-center">
                    {/* Tombol kiri */}
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`absolute -left-3 sm:-left-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all z-10 ${currentIndex === 0
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800" />
                    </button>

                    {/* Card kursus */}
                    <div className="overflow-hidden w-full">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / itemsPerSlide
                                    }%)`,
                            }}
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-3"
                                >
                                    <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group h-full flex flex-col">
                                        {/* Gambar */}
                                        <div className="overflow-hidden rounded-2xl">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 sm:h-52 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Konten */}
                                        <p className="text-sm font-semibold text-siswa-primary-100 mt-3 mb-1">
                                            {course.lokasi}
                                        </p>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed flex-1">
                                            {course.description}
                                        </p>

                                        {/* Bintang rating */}
                                        <div className="flex items-center mt-3">
                                            <RatingStars rating={course.rating} />
                                            <span className="ml-2 text-sm text-gray-500">
                                                {course.rating}/5
                                            </span>
                                        </div>

                                        <button className="mt-5 bg-siswa-primary-100 text-white px-5 py-2 rounded-full text-sm hover:bg-sky-600 active:scale-95 transition">
                                            Jelajahi
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tombol kanan */}
                    <button
                        onClick={nextSlide}
                        disabled={currentIndex >= maxIndex}
                        className={`absolute -right-3 sm:-right-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all z-10 ${currentIndex >= maxIndex
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                    >
                        <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800" />
                    </button>
                </div>
            )}
        </section>
    );
}
