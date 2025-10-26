"use client";

import Image from "next/image";

export default function Lokasi() {
    return (
        <section className="py-16 px-6 flex flex-col items-center text-center">
            {/* Judul */}
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-10">
                Lokasi Kamu
            </h2>

            {/* Kontainer utama */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-6xl">
                {/* Kartu kiri */}
                <div
                    className="bg-[#F8AF3C] text-left rounded-[30px] p-6 md:p-8 w-full sm:w-[80%] md:w-[350px] 
                     shadow-md flex flex-col justify-between min-h-[200px] 
                     md:translate-x-20 z-10 relative"
                >
                    {/* Avatar + teks */}
                    <div className="flex items-start gap-4">
                        <div className="bg-white rounded-[20px] w-14 h-14 md:w-16 md:h-16 shrink-0" />
                        <div>
                            <h3 className="text-[#1A202C] font-bold text-lg sm:text-xl">
                                Hai Andi
                            </h3>
                            <p className="text-[#1A202C] text-sm sm:text-base leading-snug">
                                Kami bisa membantumu mencarikan khursus terdekat.
                            </p>
                        </div>
                    </div>

                    {/* Tagline */}
                    <p className="mt-6 text-xs sm:text-sm font-semibold text-[#1A202C]">
                        <span className="text-[#1A202C]/80">
                            #Tingkatkan kemampuanmu melalui khursus terbaik
                        </span>
                    </p>
                </div>

                {/* Peta kanan */}
                <div
                    className="bg-siswa-primary-200 rounded-[30px] p-8 w-full sm:w-[90%] md:w-[650px] 
                     text-[#1A202C] shadow-md flex flex-col items-center justify-center space-y-4 
                     md:-ml-6 md:pl-12"
                >
                    <Image
                        src="/illustrasi/siswa/beranda/peta.svg"
                        alt="Peta Lokasi"
                        width={320}
                        height={220}
                        className="object-contain w-[80%] md:w-[60%]"
                    />

                    <p className="text-sm sm:text-base">
                        Kamu berada di <span className="font-semibold">Tangerang Utara</span>
                    </p>

                    <p className="text-sm text-gray-700">
                        Jelajahi Daerah Lainnya{" "}
                        <button className="ml-1 px-3 py-1 rounded-full bg-white border border-gray-300 text-siswa-primary-100 hover:bg-blue-50 text-sm font-medium transition">
                            disini
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
}
