"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSiswa } from "../../context/SiswaContext";

const MapSection = dynamic(() => import("./PetaClient"), { ssr: false });

const daerahList = [
    "Jakarta Pusat",
    "Jakarta Selatan",
    "Jakarta Timur",
    "Jakarta Barat",
    "Jakarta Utara",
] as const;

type Daerah = typeof daerahList[number];

export default function Peta() {
    const { siswa, setSiswa } = useSiswa();
    const [selected, setSelected] = useState<Daerah>("Jakarta Pusat");

    useEffect(() => {
        const lokasiSiswa = siswa.lokasi as Daerah | undefined;
        if (lokasiSiswa && daerahList.includes(lokasiSiswa)) {
            queueMicrotask(() => setSelected(lokasiSiswa));
        }
    }, [siswa.lokasi]);

    const handleSelectDaerah = (daerah: Daerah) => {
        setSelected(daerah);

        setSiswa((prev) => ({
            ...prev,
            lokasi: daerah,
        }));
    };

    return (
        <section className="w-full min-h-screen flex flex-col items-center justify-center px-4">
            <h2 className="text-2xl md:text-5xl font-bold text-center text-[#003653] mb-10">
                Kursus di Sekitar Kamu
            </h2>

            <div className="flex flex-wrap justify-center gap-3 mb-6">
                {daerahList.map((daerah) => (
                    <button
                        key={daerah}
                        onClick={() => handleSelectDaerah(daerah)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selected === daerah
                            ? "bg-siswa-primary-100 text-white shadow-lg scale-105"
                            : "bg-white text-[#1A202C] border border-gray-300 hover:bg-gray-100"
                            }`}
                    >
                        {daerah}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-5xl h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#CBD5E0]">
                <MapSection selected={selected} />
            </div>
        </section>
    );
}
