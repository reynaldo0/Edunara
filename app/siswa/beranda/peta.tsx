"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSiswa } from "../../context/SiswaContext";

const MapSection = dynamic(() => import("./PetaClient"), { ssr: false });

// definisikan tipe literal untuk daerah
const daerahList = ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi"] as const;
type Daerah = typeof daerahList[number];

export default function Peta() {
    const { siswa } = useSiswa();
    const [selected, setSelected] = useState<Daerah>("Jakarta");

    // set default lokasi berdasarkan context hanya sekali di mount
    useEffect(() => {
        const lokasiSiswa = siswa.lokasi as Daerah | undefined;
        if (lokasiSiswa && daerahList.includes(lokasiSiswa)) {
            // Gunakan microtask agar tidak sinkron dalam render cycle
            queueMicrotask(() => setSelected(lokasiSiswa));
        }
    }, [siswa.lokasi]);

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1A202C] mb-6">
                Kursus di Sekitar Kamu
            </h2>

            {/* Tombol lokasi */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {daerahList.map((daerah) => (
                    <button
                        key={daerah}
                        onClick={() => setSelected(daerah)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${selected === daerah
                                ? "bg-siswa-primary-100 text-white shadow-lg scale-105"
                                : "bg-white text-[#1A202C] border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {daerah}
                    </button>
                ))}
            </div>

            {/* Peta */}
            <div className="w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#CBD5E0]">
                <MapSection selected={selected} />
            </div>
        </section>
    );
}
