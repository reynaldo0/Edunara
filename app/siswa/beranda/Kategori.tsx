"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    StarIcon,
} from "@heroicons/react/24/solid";

const categories = [
    { name: "Matematika", color: "bg-yellow-200 text-green-800" },
    { name: "Bahasa Inggris", color: "bg-red-200 text-red-800" },
    { name: "Bahasa Jepang", color: "bg-indigo-300 text-indigo-900" },
    { name: "Bahasa Korea", color: "bg-sky-300 text-sky-900" },
    { name: "Pemrograman", color: "bg-amber-300 text-amber-900" },
];

const courses = [
    {
        id: 1,
        category: "Bahasa Inggris",
        title: "Intermadia Kursus Bahasa Inggris",
        description:
            "Bukti kursus efektif bahasa Inggris. Bisa diakses dengan semua perangkat online-mu.",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1600195077909-46a765cbb3c9?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 2,
        category: "Bahasa Inggris",
        title: "Kelas Dasar Grammar",
        description: "Pelajari grammar dengan metode menyenangkan dan interaktif.",
        rating: 4,
        image:
            "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 3,
        category: "Bahasa Inggris",
        title: "Speaking Confidence Class",
        description: "Bangun kepercayaan diri berbicara dengan native speaker.",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 4,
        category: "Bahasa Inggris",
        title: "IELTS Preparation",
        description: "Persiapkan diri untuk ujian IELTS dengan mentor berpengalaman.",
        rating: 5,
        image:
            "https://images.unsplash.com/photo-1584697964191-84b34f5b1b7b?auto=format&fit=crop&w=600&q=80",
    },
    {
        id: 5,
        category: "Bahasa Inggris",
        title: "Kursus Vocabulary",
        description: "Perbanyak kosakata bahasa Inggris dengan latihan interaktif.",
        rating: 4,
        image:
            "https://images.unsplash.com/photo-1581092160562-40aa08e788e1?auto=format&fit=crop&w=600&q=80",
    },
];

export default function Kategori() {
    const [selectedCategory, setSelectedCategory] = useState("Bahasa Inggris");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    // 🧠 Deteksi ukuran layar agar jumlah card sesuai device
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setItemsPerSlide(1); // Mobile
            else if (window.innerWidth < 1024) setItemsPerSlide(2); // Tablet
            else setItemsPerSlide(3); // Desktop
        };

        handleResize(); // initial check
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const filteredCourses = courses.filter(
        (course) => course.category === selectedCategory
    );

    const maxIndex = Math.max(0, filteredCourses.length - itemsPerSlide);

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev < maxIndex ? prev + 1 : maxIndex
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    };

    return (
        <section className="bg-[#E9F6FF] min-h-screen flex flex-col items-center py-12 px-6 sm:px-10 relative overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-gray-800">
                Kategori
            </h2>

            {/* Category Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat.name}
                        onClick={() => {
                            setSelectedCategory(cat.name);
                            setCurrentIndex(0);
                        }}
                        className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-medium shadow-md transition-all duration-300 ${selectedCategory === cat.name
                                ? `${cat.color} scale-105`
                                : "bg-white text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Data kosong */}
            {filteredCourses.length === 0 ? (
                <p className="text-gray-600 text-lg font-medium">
                    Belum ada data untuk kategori{" "}
                    <span className="font-semibold">{selectedCategory}</span>.
                </p>
            ) : (
                <div className="relative w-full max-w-6xl flex items-center justify-center">
                    {/* Tombol kiri */}
                    <button
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className={`absolute -left-3 sm:-left-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all z-10 ${currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <ChevronLeftIcon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800" />
                    </button>

                    {/* Slides */}
                    <div className="overflow-hidden w-full">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / itemsPerSlide}%)`,
                            }}
                        >
                            {filteredCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-3"
                                >
                                    <div className="bg-white rounded-3xl shadow-lg p-5 sm:p-6 hover:scale-[1.03] transition-transform duration-300 cursor-pointer group h-full flex flex-col">
                                        <div className="overflow-hidden rounded-2xl">
                                            <Image
                                                src={course.image}
                                                alt={course.title}
                                                width={400}
                                                height={300}
                                                className="w-full h-48 sm:h-52 object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <p className="text-sm font-semibold text-sky-500 mt-3 mb-1">
                                            Kursus
                                        </p>
                                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1 leading-relaxed flex-1">
                                            {course.description}
                                        </p>
                                        <div className="flex items-center mt-3">
                                            {[...Array(course.rating)].map((_, i) => (
                                                <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                                            ))}
                                        </div>
                                        <button className="mt-5 bg-sky-500 text-white px-5 py-2 rounded-full text-sm hover:bg-sky-600 active:scale-95 transition">
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
                        className={`absolute -right-3 sm:-right-8 p-2 sm:p-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition-all z-10 ${currentIndex >= maxIndex ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        <ChevronRightIcon className="w-6 h-6 sm:w-7 sm:h-7 text-slate-800" />
                    </button>
                </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > 0 && (
                <div className="flex justify-center mt-6 space-x-2">
                    {Array.from(
                        { length: Math.ceil(filteredCourses.length / itemsPerSlide) },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i * itemsPerSlide)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentIndex / itemsPerSlide) === i
                                        ? "bg-sky-500 scale-110"
                                        : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                            ></button>
                        )
                    )}
                </div>
            )}
        </section>
    );
}
