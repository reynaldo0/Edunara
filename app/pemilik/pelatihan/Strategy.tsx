"use client";
import React from "react";

interface StrategyItem {
    id: number;
    title: string;
    description: string;
    color: string;
}

const StrategySection: React.FC = () => {
    const strategies: StrategyItem[] = [
        {
            id: 1,
            title: "Promosi di media sosial",
            description:
                "Promosi ke media sosial seperti tiktok, instagram, facebook dan lainnya adalah langkah yang baik dalam mengenalkan kursus.",
            color: "bg-[#FFEFD1]",
        },
        {
            id: 2,
            title: "Daftarkan kursus ke maps",
            description:
                "Kebanyakan tempat kursus dikenal melalui maps, segera daftarkan kursusmu di maps ini dan google maps!",
            color: "bg-[#FFCA63]",
        },
        {
            id: 3,
            title: "Fasilitas yang nyaman",
            description:
                "Fasilitas yang nyaman, membuat siswa fokus untuk belajar dan produktif dalam pembelajaran, pastikan siswa tidak bosan!",
            color: "bg-[#FFCA63]",
        },
        {
            id: 4,
            title: "Pengajar yang baik",
            description:
                "Terkadang bukan hanya promosi dan fasilitas saja yang perlu ditingkatkan. Pengajar yang baik adalah kunci utama meningkatnya kursus kamu!",
            color: "bg-[#FFEFD1]",
        },
    ];

    return (
        <section className="py-20 px-6 bg-[#EAF7FF] flex flex-col items-center relative">
            {/* Judul */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#003B5C] mb-14 text-center">
                Strategi Kursus untukmu
            </h2>

            {/* Grid Container */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl">
                {strategies.map((item) => (
                    <div
                        key={item.id}
                        className={`${item.color} relative rounded-3xl p-8 shadow-md hover:shadow-xl transition-all hover:scale-105 overflow-hidden`}
                    >
                        {/* Angka besar sebagai background */}
                        <span
                            className="absolute text-[8rem] md:text-[10rem] font-extrabold text-[#003B5C]/10 leading-none select-none"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {item.id}
                        </span>

                        {/* Konten di atas angka */}
                        <div className="relative z-10">
                            <h3 className="text-[#003B5C] font-extrabold text-xl mb-3 leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-[#003B5C] text-base font-medium leading-relaxed">
                                {item.description}
                            </p>

                            <button className="mt-6 bg-[#003B5C] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#002C47] transition-all">
                                Jelajahi
                            </button>
                        </div>
                    </div>
                ))}

                {/* Lingkaran Tengah */}
                <div className="hidden sm:block absolute top-1/2 left-1/2 w-20 h-20 -translate-x-1/2 -translate-y-1/2 bg-[#F0F9FF] rounded-full border-8 border-pemilik-primary-100 shadow-lg z-20"></div>
            </div>
        </section>
    );
};

export default StrategySection;
