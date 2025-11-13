"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Feature() {
    const ownerFeatures = [
        {
            title: "AI Konten Otomatis",
            desc: "Buat caption dan script video untuk feeds, reels, atau postingan kursus dengan cepat dan efektif.",
            icon: "/icon/ai-konten.svg",
            link: "/pemilik/ai-konten",
        },
        {
            title: "AI Moderasi Komunitas",
            desc: "Kelola komunitas kursus dengan AI yang menyaring konten tidak pantas dan menjaga interaksi tetap positif.",
            icon: "/icon/ai-komunitas.svg",
            link: "/pemilik/ai-komunitas",
        },
        {
            title: "AI Generate Gambar",
            desc: "Ciptakan materi visual dan poster promosi secara instan untuk mendukung strategi pemasaran kursusmu.",
            icon: "/icon/ai-gambar.svg",
            link: "/pemilik/ai-gambar",
        },
    ];

    return (
        <section className="bg-linear-to-b from-[#79C1FF] to-[#2E6DA4]/80 flex justify-center items-center py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-pemilik-primary-100 mb-4">
                    Fitur Eksklusif untuk Pemilik Kursus
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-base md:text-lg">
                    Maksimalkan efektivitas kursusmu dengan bantuan AI profesional. Buat konten, kelola komunitas, dan promosikan kursus dengan mudah.
                </p>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-10 place-items-center">
                    {ownerFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="relative bg-white rounded-3xl shadow-lg p-8 text-left 
                            hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 w-full max-w-sm group"
                        >
                            {/* Icon & Title */}
                            <div className="flex items-center mb-5">
                                <div className="w-14 h-14 mr-4 flex justify-center items-center bg-pemilik-primary-100/20 rounded-2xl group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={feature.icon}
                                        alt={feature.title}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg md:text-xl">
                                    {feature.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm md:text-base mb-8 leading-relaxed">
                                {feature.desc}
                            </p>

                            {/* Action Button */}
                            <Link
                                href={feature.link}
                                className="flex items-center gap-2 px-5 py-2 rounded-full bg-pemilik-primary-100 text-white text-sm md:text-base font-medium 
                                hover:bg-pemilik-primary-100/85 transition-all duration-300 shadow-sm hover:shadow-md"
                            >
                                Pelajari
                                <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                            </Link>

                            {/* Subtle gradient highlight */}
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-pemilik-primary-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
