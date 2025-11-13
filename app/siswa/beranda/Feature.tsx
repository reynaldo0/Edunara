"use client";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi"; // ← import arrow icon

export default function Feature() {
    const layananList = [
        {
            title: "Chat Bot",
            desc: "Dapatkan bantuan instan untuk menemukan kursus yang cocok hanya dengan beberapa klik.",
            icon: "/icons/chatbot.png",
        },
        {
            title: "Konsultasi Keahlian",
            desc: "Bicara langsung dengan ahli dan dapatkan saran profesional tentang jalur pembelajaranmu.",
            icon: "/icons/konsultasi.png",
        },
        {
            title: "Komunitas",
            desc: "Gabung dengan komunitas pembelajar aktif di Jakarta untuk berbagi dan berkembang bersama.",
            icon: "/icons/komunitas.png",
        },
    ];

    return (
        <section className="bg-gradient-to-b from-siswa-primary-200 to-[#1DA1F2]/70 flex justify-center items-center min-h-screen px-6">
            <div className="max-w-6xl mx-auto text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Layanan Kami
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto mb-12 text-base md:text-lg">
                    Temukan berbagai layanan digital yang membantu kamu dalam perjalanan
                    belajar di kursus Jakarta — dari konsultasi, komunitas, hingga asisten
                    pintar yang siap membantu kapan saja.
                </p>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8 place-items-center">
                    {layananList.map((layanan, index) => (
                        <div
                            key={index}
                            className="relative bg-white/90 backdrop-blur-sm border border-sky-100 rounded-3xl shadow-lg p-8 text-left hover:-translate-y-2 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 ease-out w-full max-w-sm group"
                        >
                            {/* Icon & Title */}
                            <div className="flex items-center mb-5">
                                <div className="w-12 h-12 mr-4 flex justify-center items-center bg-sky-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Image
                                        src={layanan.icon}
                                        alt={layanan.title}
                                        width={36}
                                        height={36}
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-lg">
                                    {layanan.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                                {layanan.desc}
                            </p>

                            {/* Arrow */}
                            <div className="flex justify-end">
                                <FiArrowRight className="text-sky-500 text-2xl transform transition-transform duration-300 group-hover:translate-x-2" />
                            </div>

                            {/* Subtle gradient highlight */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
