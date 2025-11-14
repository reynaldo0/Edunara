"use client";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Feature() {
    const layananList = [
        {
            title: "Konten Otomatis",
            desc: "Buat caption dan script video untuk feeds, reels, atau postingan kursus dengan cepat dan efektif.",
            icon: "/icon/chatbot.svg",
            link: "/pemilik/konten",
        },
        {
            title: "Moderasi Komunitas",
            desc: "Kelola komunitas kursus dengan AI yang menyaring konten tidak pantas dan menjaga interaksi tetap positif.",
            icon: "/icon/komunitas.svg",
            link: "/pemilik/komunitas",
        },
        {
            title: "Generate Gambar",
            desc: "Ciptakan materi visual dan poster promosi secara instan untuk mendukung strategi pemasaran kursusmu.",
            icon: "/icon/konsultasi.svg",
            link: "/pemilik/konten",
        },
    ];

    return (
        <section className="bg-linear-to-b from-[#79C1FF] to-[#2E6DA4]/70 flex justify-center items-center min-h-screen px-6 py-20">
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
                            className="relative bg-white/90 backdrop-blur-sm border border-sky-100 rounded-3xl shadow-lg p-8 text-left 
              hover:-translate-y-2 hover:shadow-2xl hover:border-sky-300 transition-all duration-300 ease-out 
              w-full max-w-sm group"
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

                            {/* Action Button */}
                            <div className="flex justify-between items-center mt-auto">
                                <Link
                                    href={layanan.link}
                                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-siswa-primary-100 text-white text-sm font-medium 
                  hover:bg-siswa-primary-100/80 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Kunjungi
                                    <FiArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
                                </Link>
                            </div>

                            {/* Subtle gradient highlight */}
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-sky-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
