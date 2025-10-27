"use client";

import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const mentors = [
    {
        name: "Ibu Aninda Sari, SE. ME",
        title: "Tutor UMKM Kursus Digital",
        image: "/illustrasi/mentor/mentor.jpg",
        products: [
            "/illustrasi/mentor/produk1.jpg",
            "/illustrasi/mentor/produk2.jpg",
            "/illustrasi/mentor/produk3.jpg",
        ],
    },
    {
        name: "Bapak Budi Santoso, M.M.",
        title: "Mentor Marketing Digital",
        image: "/illustrasi/mentor/mentor2.jpg",
        products: [
            "/illustrasi/mentor/produk4.jpg",
            "/illustrasi/mentor/produk5.jpg",
            "/illustrasi/mentor/produk6.jpg",
        ],
    },
    {
        name: "Ibu Citra Dewi, SE",
        title: "Mentor Manajemen Bisnis",
        image: "/illustrasi/mentor/mentor3.jpg",
        products: [
            "/illustrasi/mentor/produk7.jpg",
            "/illustrasi/mentor/produk8.jpg",
            "/illustrasi/mentor/produk9.jpg",
        ],
    },
];

export default function Profesional() {
    const [mentorIndex, setMentorIndex] = useState(0);

    const nextMentor = () =>
        setMentorIndex((prev) => (prev + 1) % mentors.length);
    const prevMentor = () =>
        setMentorIndex((prev) =>
            prev === 0 ? mentors.length - 1 : prev - 1
        );

    return (
        <section className="bg-[#E9F6FF] py-12 flex flex-col items-center px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-10 text-center">
                Diajarkan oleh mentor profesional
            </h2>

            <div className="relative flex items-center w-full max-w-6xl justify-center">
                {/* Tombol kiri */}
                <button
                    onClick={prevMentor}
                    className="absolute -left-3 md:-left-6 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
                >
                    <FaChevronLeft className="w-5 h-5 text-[#0D1B2A]" />
                </button>

                {/* Kontainer slider */}
                <div className="w-full overflow-hidden">
                    <div
                        className="flex transition-transform duration-500"
                        style={{ transform: `translateX(-${mentorIndex * 100}%)` }}
                    >
                        {mentors.map((mentor, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 w-full flex flex-col-reverse md:flex-row bg-white rounded-3xl shadow-lg overflow-hidden"
                            >
                                {/* Grid produk */}
                                <div className="md:w-1/2 grid grid-cols-2 gap-2 p-4 md:p-6 bg-white">
                                    {mentor.products.map((src, j) => (
                                        <div
                                            key={j}
                                            className={`relative overflow-hidden rounded-xl border-2 transition-transform duration-300 hover:scale-105 ${j === 0 ? "col-span-2 aspect-video" : "aspect-square"
                                                }`}
                                        >
                                            <Image
                                                src={src}
                                                alt={`Produk ${j + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>

                                {/* Info mentor */}
                                <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-8 bg-[#F8FBFF]">
                                    <div className="w-40 h-40 relative mb-4 rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform duration-300">
                                        <Image
                                            src={mentor.image}
                                            alt={mentor.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <h3 className="text-lg md:text-xl font-semibold text-[#0D1B2A]">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-[#4A5568] text-sm md:text-base mt-1">
                                        {mentor.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol kanan */}
                <button
                    onClick={nextMentor}
                    className="absolute -right-3 md:-right-6 bg-white shadow-md rounded-full p-2 hover:bg-gray-100 transition z-10"
                >
                    <FaChevronRight className="w-5 h-5 text-[#0D1B2A]" />
                </button>
            </div>

            {/* Dot indikator */}
            <div className="flex mt-6 gap-2">
                {mentors.map((_, i) => (
                    <span
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${i === mentorIndex ? "bg-pemilik-primary-100 w-6" : "bg-gray-300"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
